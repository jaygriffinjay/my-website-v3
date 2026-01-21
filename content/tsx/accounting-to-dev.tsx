import { Heading, Paragraph, List, ListItem, Divider, Link } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: "Accounting → Software Development?",
  slug: 'accounting-to-dev',
  date: '2026-01-20T00:00:00Z',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: 'Jay provided the story and context, Claude structured and wrote the post, Jay edited and refined',
  type: 'post',
  description: 'From debits and credits to TypeScript: how an accounting degree became the foundation for a career in software development',
  tags: ['career', 'accounting', 'self-taught', 'journey', 'excel'],
};

export default function AccountingToDevPost() {
  return (
    <>
      <Paragraph>
        "So you quit accounting to do programming?"
      </Paragraph>
      
      <Paragraph>
        Nah. I didn't quit. I leveled up.
      </Paragraph>

      <Heading level={2}>The Real Origin Story: I Refused to Use WordPress</Heading>

      <Paragraph>
        Here's what really started all of this: I've wanted a blog since I was 15. I was 
        reading personal finance and tax blogs obsessively. Loved the format, loved the 
        community, wanted my own space on the internet.
      </Paragraph>

      <Paragraph>
        But I really, <em>really</em> didn't want to use WordPress.
      </Paragraph>

      <Paragraph>
        I can trace so much of my motivation for becoming a web developer to that single 
        fact: I wanted a blog, but WordPress felt wrong. Too bloated, too constrained, too 
        much fighting the admin panel to do what I wanted.
      </Paragraph>

      <Paragraph>
        Plus, WordPress was expensive. Every single blog I followed had a "how to start a 
        blog" article that basically said: buy managed WordPress hosting from these providers 
        for $10-15/month. And I definitely wasn't considering Shopify at $25/month.
      </Paragraph>

      <Paragraph>
        (And those were the <em>introductory</em> rates. WordPress hosting costs have a 
        magical tendency to balloon over time.)
      </Paragraph>

      <Paragraph>
        I'm cheap. I wanted to do it for free. So instead of paying for managed WordPress, 
        I decided to learn to make a blog myself. Which somehow made sense at the time.
      </Paragraph>

      <Paragraph>
        The math? Spend thousands of hours learning to make a blog myself to avoid $15/month. This felt 
        entirely justified, even when it was definitely difficult in those early days. The 
        return on investment makes no sense, but here we are.
      </Paragraph>

      <Heading level={3}>I Actually Tried WordPress (And Hated It)</Heading>

      <Paragraph>
        Full disclosure: I did buy WordPress hosting for a year or two. Gave it a real shot. 
        Tried to make a blog the "normal" way.
      </Paragraph>

      <Paragraph>
        Mostly hated it.
      </Paragraph>

      <Paragraph>
        Here's what I realized: I didn't enjoy "posting just to post." What I actually wanted 
        was the ability to publish random stuff myself out into the world - and own my data 
        and opinions. Not be locked into a platform.
      </Paragraph>

      <Paragraph>
        Paying $15/month to "post content" made no sense when what I really wanted was to 
        just... have things available on the internet. On my terms. In my control.
      </Paragraph>

      <Paragraph>
        I was arriving at the principles of web development without knowing how to code at all. 
        I understood <em>why</em> owning your own platform mattered before I understood <em>how</em> to 
        build one.
      </Paragraph>

      <Paragraph>
        It was only after I actually learned to code that I could realize any of this. And 
        very badly at first.
      </Paragraph>

      <Paragraph>
        So instead of settling for WordPress, I spent years learning to code so I could 
        make my own publishing platform. Which is either admirably stubborn or completely 
        insane. Probably both.
      </Paragraph>

      <Paragraph>
        That stubborn refusal to use inadequate tools? That became my whole programming 
        journey.
      </Paragraph>

      <Divider />

      <Heading level={2}>The Setup: What I Actually Studied</Heading>
      
      <Paragraph>
        My accounting curriculum wasn't just debits and credits. It was:
      </Paragraph>

      <List>
        <ListItem>Data analysis and visualization</ListItem>
        <ListItem>Statistical analysis and auditing techniques on large financial datasets</ListItem>
        <ListItem>Database design and normalization</ListItem>
        <ListItem>ERP systems and data and corporate controls</ListItem>
        <ListItem>Financial data technology and IT </ListItem>

      </List>

      <Paragraph>
        That's not accounting. That's backend development with a CPA license.
      </Paragraph>

      <Heading level={2}>The Awakening: Excel is a Terrible Database</Heading>

      <Paragraph>
        By the time I graduated in accounting I was an Excel Grand Wizard. Pivot tables, XLOOKUP, array formulas, Power Query, Macros? I was learning features 
        that would make even senior accountants weep. I could make Excel do things it was never meant to do.
      </Paragraph>

      <Paragraph>
        We were doing proto-programming in school without calling it that: using CONCAT 
        for string manipulation (the first thing you learn in actual programming!), data validation 
        for dropdown menus, navigation elements across sheets. We were building programs in Excel.
      </Paragraph>

      <Paragraph>
        I'd seen VBA too - recorded macros, read the generated code, even loaded someone else's macros at work to create templates. I understood VBA could do things, but never 
        actually wrote it myself.
      </Paragraph>

      <Paragraph>
        But eventually I hit a wall where I was building complex systems in a tool designed for simple calculations. I used one too many utility cells or helper columns
        before realizing maybe Excel isn't actually good at everything. Combining functions and utility cells into God's unholiest formulae broke the camel's back. There had to be 
        a better way.
      </Paragraph>

      <Heading level={2}>How I Learned to Code? Tool Upgrades</Heading>

      <Paragraph>
        Once you realize you're fighting your tools, the path forward is obvious: get better tools.
      </Paragraph>

      <Heading level={3}>Level 1: AutoHotkey</Heading>

      <Paragraph>
        After graduating with my accounting degree, I was supposed to be studying for the CPA exam. 
        The CPA exam is particularly grueling - hundreds of hours of study across multiple sections. 
        My only brief respite from the grind was how satisfying it was to play with the computer 
        and work on automation. What started as a distraction became an obsession.
      </Paragraph>

      <Paragraph>
        I became obsessed with launching applications faster. Windows Key + typing the app name for 
        instant launching. Then I thought: what if I could do the same thing with my bookmarks? 
        And what about text expansion to automate how I typed things on the computer? It felt like typing things in fast and precisely in search boxes was the best way to "get what I wanted/needed" from the computer rather than clicking around. (Little did I know, that's exactly what commands are.)
      </Paragraph>

      <Paragraph>
        This exploration led me straight to AutoHotkey. And that's where everything started.
      </Paragraph>

      <Paragraph>
        I started with a simple goal: open frequent websites with a hotkey instead of typing URLs. 
        One hotkey, one website. Easy enough.
      </Paragraph>

      <Paragraph>
        Then I realized: if I can open one website... I can open five. Or ten. Or a HUNDRED 
        websites with a single hotkey press.
      </Paragraph>

      <Paragraph>
        <strong>That's when it clicked.</strong> That's what it means to execute a program. You 
        write instructions once, and the computer does them instantly, at scale, perfectly, 
        every time.
      </Paragraph>

      <Paragraph>
        Then I discovered AutoHotkey could create right-click context menus. Little UI elements 
        that pop up and do things. And I realized: making UI isn't as hard as I thought. You 
        don't need to understand how pixels render all the way down to binary instructions on 
        bare metal. You just... write some code that says "make a right-click menu." That's it.
      </Paragraph>

      <Paragraph>
        First taste of application programming logic. Mind = blown.
      </Paragraph>

      <Heading level={3}>Level 2: HTML & CSS</Heading>
      <Paragraph>
        After discovering that little tidbit of how things get rendered, I immediately made the connection to HTML and CSS. HTML is a language where I tell the screen what to do. It's a rendering 
        language. It's just instructions that tell the browser what to put on the screen. 
        CSS tells it how to make it look different.
      </Paragraph>

      <Paragraph>
        To a layman, this seems like an inefficient way to make ugly web pages. But I could 
        see: if you make it pretty, and scale it up and give it lots of instructions, it's more powerful than any Word doc 
        or PDF could ever be. You can build actual interfaces.
      </Paragraph>

      <Paragraph>
        I started playing around with HTML and CSS in earnest, making simple pages and learning how they worked.
      </Paragraph>

      <Heading level={3}>Level 3: Python</Heading>

      <Paragraph>
        Once I felt like I truly "got" it, I got very excited. I thought that maybe I really can do this after all. Even though I knew it was a long uphill battle of learning ahead. 
        But I really was loving it so I moved forward. I completed Harvard's <Link href="https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python" target="_blank" rel="noopener noreferrer">CS50P</Link> (Introduction to Programming with Python) and became literate in Python. Finally 
        felt like a "real" programmer.
      </Paragraph>

      <Heading level={3}>Level 4: The Python Web Problem</Heading>

      <Paragraph>
        I started working on Harvard's <Link href="https://www.edx.org/learn/web-development/harvard-university-cs50-s-web-programming-with-python-and-javascript" target="_blank" rel="noopener noreferrer">CS50W</Link> (Web Programming with Python and JavaScript). Didn't 
        finish it, but I did make some functional sites. I learned Django properly, picked up 
        some JavaScript fundamentals, and started to understand how the web actually worked.
      </Paragraph>

      <Paragraph>
        Here's where things got frustrating. I knew Python. I could build web backends with 
        Flask or Django. But for any interactivity on the frontend, I needed JavaScript.
      </Paragraph>

      <Paragraph>
        But it was frustrating. Two completely different languages. Two different ecosystems. Every feature meant 
        fighting to connect Python backend logic to JavaScript frontend behavior. It felt 
        like I was constantly translating between two languages that didn't want to talk 
        to each other.
      </Paragraph>

      <Paragraph>
        That's when I started looking at Node.js. Played around with it and realized: okay, 
        Node actually works pretty similar to Python. This could work. But then Express came 
        into the picture and Express was hard. So I hardly touched it.
      </Paragraph>

      <Paragraph>
        Back to Flask and Django for a while. At least I knew Python.
      </Paragraph>

      <Heading level={3}>Level 5: React + Vite (The Breakthrough)</Heading>
      <Paragraph>
        By this point, I was tired of hearing about React everywhere. "React gets you jobs." 
        "Everyone's using React." "You need to learn React." Fine. I'll learn React.
      </Paragraph>

      <Paragraph>
        I started a Scrimba course on React. Did not finish it. But I did learn the fundamentals 
        and was kinda liking it.
      </Paragraph>

      <Paragraph>
        Then I didn't code for several months. Not sure why. Life happened.
      </Paragraph>

      <Paragraph>
        When I came back to it, React clicked even more. And then I fell in love with it. 
        The component model finally made JavaScript make sense to me: build small pieces, 
        compose them together, data flows down, events flow up.
      </Paragraph>

      <Paragraph>
        Since then? I've written as much React as possible.
      </Paragraph>

      <Paragraph>
        And Vite made the development experience actually pleasant. Fast refresh, just write code and see it work.
      </Paragraph>

      <Paragraph>
        This was it. I could finally do full JavaScript without fighting Express. Just build 
        interactive frontends and worry about backends later when I really needed them. 
      </Paragraph>

      <Heading level={3}>The SSG Detour: Hugo, Jekyll, Eleventy</Heading>
      <Paragraph>
        I also tried the static site generator route: Hugo, Jekyll, Eleventy. Hugo especially 
        - I actually put it through its paces, used the conventions, understood the structure.
      </Paragraph>

      <Paragraph>
        But then I hit Hugo's templating language. And I realized: I don't want to code 
        anything real in such a brittle and stunted language. The skeleton and conventions were great. 
        The actual programming experience? Terrible.
      </Paragraph>

      <Paragraph>
        So I took the good parts - the project structure from Hugo, the patterns from Django - 
        and brought them into Vite and Next.js. Real JavaScript, real components, same clean 
        conventions.
      </Paragraph>

      <Heading level={3}>Level 6: Next.js (Full Stack Realized)</Heading>
      <Paragraph>
        Next.js was the final piece. Server-side rendering, API routes, file-based routing, 
        React Server Components. Now I could be a full-stack developer entirely in JavaScript 
        (well, TypeScript).
      </Paragraph>

      <Paragraph>
        No more Python backend + JavaScript frontend split. No more fighting Express. Just 
        Next.js handling everything: server logic, client interactivity, routing, rendering.
      </Paragraph>

      <Paragraph>
        Now I'm building full-stack applications with type safety, server-side rendering, 
        and proper architecture. The Excel wizard became a software developer.
      </Paragraph>

      <Paragraph>
        And I feel genuinely productive. Not fighting tools, not context-switching languages. 
        Just building.
      </Paragraph>

      <Divider />

      <Heading level={2}>The Truth: I Never Left Accounting</Heading>

      <Paragraph>
        Here's what people miss: I didn't abandon accounting knowledge. I integrated it.
      </Paragraph>

      <Paragraph>
        Some developers won't understand:
      </Paragraph>

      <List>
        <ListItem>How to take a creation and turn it into a real business</ListItem>
        <ListItem>Organizational controls and data controls</ListItem>
        <ListItem>Financial compliance, Audit compliance, data compliance</ListItem>
        <ListItem>Financial statements and business performance metrics</ListItem>
      </List>

      <Paragraph>
        That business degree? It's my differentiator. I can build software that could spin off into a business because I understand the business side.
      </Paragraph>

      <Heading level={2}>The Pattern: Solving Tool Limitations</Heading>

      <Paragraph>
        This is the real lesson: I wasn't learning programming for programming's sake. 
        I was solving problems at each level:
      </Paragraph>

      <List>
        <ListItem>Excel was too limited → learned Python</ListItem>
        <ListItem>Python scripts were too isolated → learned web development</ListItem>
        <ListItem>Static pages were too rigid → learned React</ListItem>
        <ListItem>JavaScript was too loose → learned TypeScript</ListItem>
        <ListItem>Client-only apps were too constrained → learned Next.js</ListItem>
      </List>

      <Paragraph>
        Each step was a tool upgrade. Each upgrade unlocked new capabilities.
      </Paragraph>

      <Divider />

      <Heading level={2}>Five Years Later</Heading>

      <Paragraph>
        It's been under 5 years since I wrote my first line of code. I'm self-taught. I have 
        no CS degree. Just an accounting degree and a healthy dose of computer nerdiness.
      </Paragraph>

      <Paragraph>
        And honestly? Software development feels like the highest use of my skills. I'm 
        not doing glorified software-assisted paperwork anymore. I'm building systems, 
        solving problems, creating tools that actually matter. This is what I was meant to do.
      </Paragraph>

      <Paragraph>
        <strong>That's not quitting. That's leveling up.</strong>
      </Paragraph>
    </>
  );
}