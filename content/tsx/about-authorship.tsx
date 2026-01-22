import { Heading, Paragraph } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'About Authorship',
  slug: 'about-authorship',
  date: '2026-01-21T00:00:00Z',
  author: ['Claude Sonnet 4.5', 'Jay Griffin'],
  type: 'doc',
  projectId: 'jaygriff',
  description: 'How content is authored on this site and why AI is listed as an author.',
  tags: ['meta', 'about', 'ai', 'authorship'],
  authorshipNote: 'Claude wrote this based on Jay\'s direction. Appropriately meta.',
};

const AboutAuthorship = () => {
  return (
    <>
      <Heading level={2}>Authorship on this site</Heading>
      <Paragraph>
        If you browse this site, you'll notice many pages list AI LLMs as authors. 
        This isn't a gimmick - it's an honest accounting of how the content was created.
      </Paragraph>

      <Paragraph>
        When AI generates substantial content that I review, edit, and ultimately decide to publish, 
        I list it as an author. The authorship note field explains the specifics: who wrote what, 
        who directed what, who edited what.
      </Paragraph>

      <Heading level={2}>Why this works</Heading>
      <Paragraph>
        Authorship means accountability, regardless of process. If I publish it, I own it - whether 
        I wrote every character myself or used AI for 90% and curated the result.
      </Paragraph>

      <Paragraph>
        If 50% of what I made, I didn't even write or read, then if someone is upset by my work 
        I'm liable, and if everyone found out about how the sausage is made and they are upset 
        then I'm still liable.
      </Paragraph>

      <Paragraph>
        That liability serves as a pretty good motivator to make sure I set expectations and remain transparent.
        It's not a big deal if I post something dumb that AI made if I say "AI made this dumb thing." 
      </Paragraph>

      <Heading level={2}>What makes it legitimate</Heading>
      <Paragraph>
        Using AI responsibly requires judgment to know what's wrong, what's right, and what's missing. 
        That judgment comes from domain knowledge you can't shortcut.
      </Paragraph>

      <Paragraph>
        It should be assumed that the work I am presenting is something I used AI on. However it should also be assumed
        that I used critical thinking and discerned that 
        some of the choices AI made were wrong, some were right, and I took care to only keep the right 
        ones to complete the work to the best of my ability, including consideration of options other 
        than what AI presented me first.
      </Paragraph>

      <Heading level={2}>Transparency over hiding</Heading>
      <Paragraph>
        Some refuse to use AI assistance for important work. Others use it extensively but 
        don't credit it. I think that's dishonest. In the past this would have been unnecessary. No need to credit spellcheck. 
        But since 100% AI generated work can and has been passed off as original work, I think credit makes sense now.
      </Paragraph>

      <Paragraph>
        If AI wrote the first draft of something, it should be credited. If I rewrote half 
        of it and approved all of it, I should also be credited. The authorship note explains the 
        collaboration. Simple. Not my fault that AI can have legitimately good ideas sometimes and so some of it's work gets kept in the final version.       </Paragraph>

      <Heading level={2}>Where we disagree</Heading>
      <Paragraph>
        I've seen respected creators say they will never have AI author content on their sites. 
        I understand the concern about quality and authenticity, but I think that position is overly rigid.
      </Paragraph>

      <Paragraph>
        The question isn't "did AI touch this?" The question is "is this work good and does it 
        accurately represent the author's knowledge and judgment?" If the answer is yes, the process 
        shouldn't matter.
      </Paragraph>

      <Paragraph>
        AI is a tool. A very powerful one that can amplify both competence and incompetence. If you 
        have judgment, it makes you faster. If you don't, AI may be hurting you in the long run. But banning the 
        tool doesn't solve the judgment problem.
      </Paragraph>

      <Heading level={2}>This page itself</Heading>
      <Paragraph>
        Claude Sonnet 4.5 wrote the first draft of this page based on my direction and the AI tangent I shared 
        with it. I edited it, restructured parts, and approved it for publication. If you are curious about the % of AI involvement, I will say that all the headings (and therefore main structure of the entire page) were written by Claude and kept by me. I like it! 
      </Paragraph>
    </>
  );
};

export default AboutAuthorship;
