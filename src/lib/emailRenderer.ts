import { render } from "@react-email/components";
import { ThanksEmail } from "../../emails/thanks";

export function renderThanksEmail(data: any) {
  return render(
    ThanksEmail({
      baseUrl: data.baseUrl,
      reviewLink: data.reviewLink,
      petName: data.petName,
      content: data.content,
    })
  );
}
