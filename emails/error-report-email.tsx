import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ErrorReportEmailProps {
  userEmail: string;
  timestamp: string;
  errorMessage: string;
  errorTrace: string;
  errorSourceUrl: string;
  browser: string;
  device: string;
  siteUrl: string;
}

export const ErrorReportEmail = ({
  userEmail = "Unknown",
//   timestamp = "2021-09-01 12:00:00",
  timestamp = "Unknown",
  errorMessage = "Unknown",
  errorTrace = "Unknown",
//   errorSource = "Unknown",
//   stackTrace = "Error stack trace",
//   severity = "low",
//   environment = "Unknown",
//   domain = "Unknown",
  errorSourceUrl = "Unknown",
  browser = "Unknown",
  device = "Unknown",
  siteUrl = "Unknown",
}: ErrorReportEmailProps) => {
  const severityColor = {
    low: "text-yellow-600",
    medium: "text-orange-600",
    high: "text-red-600",
    critical: "text-red-700 font-bold",
  };

  return (
    <Html>
      <Head />
      <Preview>Error Report: {errorMessage}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-6 my-6 rounded-lg shadow-lg">
            <Heading className="text-2xl font-bold text-gray-800 mb-4">
              Error Report - Skilld AI
            </Heading>
            <Section>
              <Text className="text-gray-700">
                <strong>Error occurred by:</strong> {userEmail}
              </Text>
              <Text className="text-gray-700">
                <strong>Timestamp:</strong> {timestamp}
              </Text>
              {/* <Text className={`${severityColor[severity]} font-semibold`}>
                <strong>Severity:</strong> {severity.toUpperCase()}
              </Text> */}
            </Section>
            <Hr className="border-gray-300 my-4" />
            <Section>
              <Heading className="text-xl font-semibold text-gray-800 mb-2">
                Error Details
              </Heading>
              <Text className="text-red-600 font-medium">
                <strong>Error Message:</strong> {errorMessage}
              </Text>
              <Text className="text-gray-700">
                <strong>Trace:</strong> {errorTrace}
              </Text>
            </Section>
            <Hr className="border-gray-300 my-4" />
            {/* <Section>
              <Heading className="text-xl font-semibold text-gray-800 mb-2">
                Stack Trace
              </Heading>
              <Text className="text-gray-600">
                {stackTrace}
              </Text>
            </Section> */}
            {/* <Hr className="border-gray-300 my-4" /> */}
            <Section>
              <Heading className="text-xl font-semibold text-gray-800 mb-2">
                Additional Information
              </Heading>
              {/* <Text className="text-gray-700">
                <strong>Environment: </strong> {environment}
              </Text> */}
              {/* <Text className="text-gray-700">
                <strong>Domain: </strong> {environment}
              </Text> */}
              <Text className="text-gray-700">
                <strong>Site URL: </strong> {siteUrl}
              </Text>
              <Text className="text-gray-700">
                <strong>Slug: </strong> {errorSourceUrl}
              </Text>
              <Text className="text-gray-700">
                <strong>Browser: </strong> {browser}
              </Text>
              <Text className="text-gray-700">
                <strong>Device: </strong> {device}
              </Text>
            </Section>
            <Hr className="border-gray-300 my-4" />
            <Section>
              <Text className="text-sm text-gray-500">
                This is an automated error report. Please do not reply to this
                email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ErrorReportEmail;
