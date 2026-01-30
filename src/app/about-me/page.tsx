'use client';

import { Heading, Paragraph, Link, Divider, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import Image from 'next/image';

export const routeMetadata: PostMeta = {
  title: 'About Me',
  slug: 'about-me',
  date: '2026-01-21T00:00:00Z',
  author: ['Jay Griffin'],
  description: '',
  tags: ['about'],
  path: '/about-me',
};

const shimmer = keyframes`
  to {
    background-position: -200% 0;
  }
`;

const HiringCard = styled.div`
  position: relative;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.xl};
  margin: ${props => props.theme.spacing.xl} 0;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const HiringText = styled.div`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const BigEmailLink = styled.a`
  display: inline-block;
  font-size: ${props => props.theme.fontSizes.xxxl};
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(
    90deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #4b0082,
    #9400d3,
    #ff0000
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 8px rgba(255, 100, 100, 0.3);
  animation: ${shimmer} 3s linear infinite;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 8px 16px rgba(255, 100, 255, 0.5));
  }
`;

const ProfileLinks = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: ${props => props.theme.radii.medium};
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    font-size: 1.25rem;
    transition: background-color 0.15s ease;
    line-height: 1;
    
    &:hover {
      background-color: ${props => props.theme.colors.border};
    }
  }
`;

export default function AboutMePage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <HiringCard>
          <ProfileLinks>
            <a href="https://github.com/jaygriffinjay" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <SiGithub />
            </a>
            <a href="https://linkedin.com/in/jaygriffinjay" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <SiLinkedin />
            </a>
          </ProfileLinks>
          <Image 
            src="/images/me.jpg" 
            alt="Jay Griffin" 
            width={250}
            height={250}
            priority
            style={{ 
              width: '100%',
              maxWidth: '250px',
              height: 'auto',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }} 
            css={{
              '@media (max-width: 768px)': {
                marginTop: '3rem'
              }
            }}
          />
          <HiringText>
            I'm currently seeking full-time roles building modern web and React-based applications! I'm especially interested in AI integrations and building AI-native apps.
          </HiringText>
       
             <BigEmailLink href="mailto:jay@jaygriff.com">
            Email me: jay@jaygriff.com
          </BigEmailLink>
        </HiringCard>


        <Heading level={2}>Hi, I'm Jay!</Heading>


      <Paragraph>
        Welcome to my website where I do my work and publish it too. 
        My work is primarily software development - I am developing thoughtful apps that make life easier or better in some way.
        
      </Paragraph>

      <Heading level={2}>What I Do</Heading>
      <Paragraph>
        I primarily work with TypeScript, React, and Next.js. 
        You can see my stack and tooling in <Link href="/my-tools">my tools</Link>.
      </Paragraph>
      <Paragraph>
        My main project is <Link href="https://github.com/jaygriffinjay/jaygriff" target="_blank" rel="noopener noreferrer">this site itself</Link> - a custom-built full-stack web app that serves as 
        both my workspace and my publishing platform. It is the container for a lot of my other apps because I can create them within this repo and then host and 
        demo them on this site.  While on the frontend this just looks like a website, on the backend this is a testbed 
        for my full-featured application framework I use to make all my apps. The site is just an excuse to improve the framework and 
        factor out my best work into a reusable system I endearingly call my <Link href="https://github.com/jaygriffinjay/bootstrap-fullstack-webapp" target="_blank" rel="noopener noreferrer">Bootstrap Repo</Link>, otherwise known as a "boilerplate". Learn more <Link href="/about-this-site">about this site</Link>, explore the <Link href="/features">completed features</Link>, or check out 
        the <Link href="/roadmap">future roadmap</Link>.
      </Paragraph>

      <Heading level={2}>What I Write About</Heading>
      <Paragraph>
        Software, AI, business, entrepreneurship, money, fitness and training 
        data, productivity, games, puzzles, and whatever else I'm interested in. This site is where I document my work, share my thoughts, and maybe post some personal stuff too!
      </Paragraph>

      <Heading level={2}>Background</Heading>
      <Paragraph>
        I worked in public tax accounting before transitioning to software development. 
        Read the full story in <Link href="/posts/accounting-to-dev">accounting → software development?</Link>
      </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
