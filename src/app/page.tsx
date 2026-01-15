'use client';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export default function Home() {
  return (
    <Container>
      <Title>Hello World</Title>
    </Container>
  );
}
