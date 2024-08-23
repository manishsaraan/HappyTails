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

export const ResetPasswordEmail = ({
  otp,
  baseUrl,
}: {
  otp: number;
  baseUrl: string;
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Reset Your Password - HappyTails</Preview>
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
              Please reset your password by entering the below OTP.
            </Text>
            <Text
              className="text-black text-[20px] mt-[16px] mb-[10px] leading-[24px]"
              style={{ letterSpacing: "3px" }}
            >
              {otp}
            </Text>
            <Footnote hideNote={true} />
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
