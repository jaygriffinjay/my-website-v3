import { Container, Heading, Paragraph } from "@/components/Primitives";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container size="sm">
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <Heading level={1}>404</Heading>
        <Paragraph>Page not found</Paragraph>
        <Link href="/" style={{ color: 'hsl(210, 100%, 60%)' }}>← Back home</Link>
      </div>
    </Container>
  );
}
