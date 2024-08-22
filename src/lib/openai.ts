import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function dummyCreateContent() {
  return "Hello, world!";
}

type ExtractJsonType = {
  subject: string;
  content: string;
};
function extractJson(response: string): ExtractJsonType | null {
  try {
    // Extract the content between the ```json\n and the closing ```
    const jsonString = response.match(/```json\n([\s\S]*?)```/)?.[1];

    if (!jsonString) {
      throw new Error("No JSON string found in the response.");
    }

    // Parse the JSON string into an object
    const jsonObject = JSON.parse(jsonString);

    return jsonObject;
  } catch (error) {
    console.error("Error extracting JSON:", error);
    return null;
  }
}

export async function createEmailContent(
  notes: string,
  suggestions: string,
  petName: string,
  petOwnerName: string
) {
  const prompt = `
    Context:-

    Pretend you are a email copywriter. You have worked in the email marketing industry for 5 years.
    You are an expert in creating emails that are friendly and personalized. 
    You have experience in the pet care industry. You are tasked to create an email for a pet owner.

    Task:-
    These are Notes and Suggestions are provided by the pet daycare owner.
    He wants to send personalized email to the pet owner for better engagement.
    Write a email from Notes and Suggestions provided by the pet daycare owner.
    The email should be friendly and personalized.
    It should be max 200 words. Use proper formatting and paragraphs.
    Dont add best regads, I have it already in the email.
    Add a simple request to leave a review by clicking a link below.
    I have it already in the email. So dont include it again.

    Expected Output:-
    Write an email content and subject line in json format.
    """{
        "subject": "string",
        "content": "string"
    }"""

    Notes: ${notes} \n
    Suggestions: ${suggestions} \n
    Pet Name: ${petName} \n
    Pet Owner Name: ${petOwnerName} \n
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Use a model suitable for prompt completion
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 500,
  });

  console.log(response.choices[0].message);

  if (
    response.choices &&
    response.choices.length > 0 &&
    response.choices[0].message
  ) {
    const content = extractJson(response.choices[0].message.content ?? "");
    if (content) {
      return content;
    }
    throw new Error("Failed to parse the completion content as JSON.");
  } else {
    throw new Error("No completion choices returned from OpenAI API.");
  }
}
