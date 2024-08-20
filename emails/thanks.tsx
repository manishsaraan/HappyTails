import * as React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import Footer from "./footer";
import Footnote from "./footnote";

export const ThanksEmail = ({
  reviewLink = "",
  petName = "",
  content = "",
  baseUrl,
}: {
  reviewLink: string;
  petName: string;
  content: string;
  baseUrl: string;
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Thanks for using HappyTails</Preview>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[22px]">
              <Img
                src={`${baseUrl}/images/logo.png`}
                width="50"
                height="50"
                alt="Logo"
                className="block m-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 mb-[24px] mt-[12px] mx-0">
              HappyTails
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">Hi,</Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thanks for leting HappyTails take care of {petName}.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              {content}
            </Text>
            <Link
              className="bg-[#000000] p-2 px-2.5 mt-1 w-[100px] block rounded-md text-white text-[13px] font-normal no-underline text-center"
              href={reviewLink}
            >
              Leave a Review
            </Link>

            <Footnote hideNote={true} />
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ThanksEmail;
