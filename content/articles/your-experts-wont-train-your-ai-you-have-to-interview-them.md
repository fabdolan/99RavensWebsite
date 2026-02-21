---
title: "Your Experts Won't Train Your AI. You Have to Interview Them."
slug: your-experts-wont-train-your-ai-you-have-to-interview-them
date: 2025-12-05
author: Muratcan Koylan
authorTitle: AI Agent Systems Manager
authorInitials: MK
category: ai
categoryLabel: ":AI Agents"
excerpt: "The only way to capture true expertise is to build an AI interviewer that earns the trust to be seen as a peer. That is the real technical hurdle. Here is how we cleared it."
image: /public/uploads/blog/99ravens_ai_interviewer.png
imageAlt: 99Ravens AI Interviewer System - Multi-agent architecture for expert knowledge capture
status: published
type: article
substack: false
readTime: 8
---

<figure class="post-featured-image">
    <img src="/public/uploads/blog/99ravens_ai_interviewer.png" alt="99Ravens AI Interviewer System - Multi-agent architecture for expert knowledge capture" />
</figure>

<p>In every organization, the most valuable asset is trapped. It's the hard-won, implicit knowledge inside the heads of your best people. They can't write it down in a wiki, and they don't know how to "train" an AI. It only comes out in conversation.</p>

<p>The default solution—a simple chatbot interviewer—fails because it produces generic AI that sounds like Wikipedia, not a person. It averages out expertise into blandness.</p>

<p>The only way to capture true expertise is to build an AI interviewer that earns the trust to be seen as a peer. An equal. One that asks questions so insightful the expert reveals the distinctive methodologies they'd normally only share with another seasoned professional. That is the real technical hurdle. Here is how we cleared it.</p>

<h2>Achieving Peer Status</h2>

<p>The entire system hinges on one question: can the AI achieve peer status?</p>

<p>When it does, something unlocks. Experts we've interviewed consistently say the same thing: it feels like talking to a colleague who actually gets it. There's no judgment, no time pressure, just focused curiosity. This is the space where they articulate the implicit knowledge they've never verbalized before.</p>

<p>A single-agent LLM can't maintain this status. It's patient, but it's not a colleague. It gets lost in fascinating tangents, repeats questions, and lacks the strategic focus to separate gold from gravel. A 40-minute interview generates too much context. The agent either loses track or consumes its context window re-reading the transcript. It breaks the illusion of peerage.</p>

<p>That failure led us to a different architecture.</p>

<h2>The Multi-Agent Solution: Interviewer + Assistant</h2>

<p>A single agent is a great conversationalist. An intelligent system requires a second layer: an executive function. This is why we moved to a multi-agent architecture. The Interviewer talks; the Note-Taker thinks.</p>

<p>The Note-Taker is an internal tool, invisible to the expert, that continuously analyzes the conversation. The Interviewer queries it for structured progress reports.</p>

<h3>What the Note-Taker Tracks:</h3>

<ul>
    <li><strong>Coverage Analysis:</strong> Topics explored with confidence levels (high/medium/low).</li>
    <li><strong>Gap Identification:</strong> Required areas not yet addressed, prioritized by importance.</li>
    <li><strong>Time Status:</strong> Pacing assessment against the target duration, with wrap-up triggers.</li>
    <li><strong>Pattern Detection:</strong> Emerging themes, contradictions, or when the expert defaults to generic "best practices."</li>
    <li><strong>Next Action:</strong> A specific suggestion for the next probe.</li>
</ul>

<p>The key insight is that the Note-Taker returns structured data, not prose. This prevents the Interviewer from getting confused by a second voice. If the Note-Taker flags a gap in "decision-making frameworks," the Interviewer integrates the suggestion naturally: "You mentioned evaluating channels—walk me through a recent decision where you chose not to invest somewhere."</p>

<p>The Note-Taker is the working memory. The Interviewer stays in the conversation, focused on being a peer. This separation of concerns also improves <a href="/resources/blogs/real-world-llm-jailbreak-what-we-discovered-and-how-we-fixed-it/">security and prompt integrity</a>.</p>

<h2>The Architecture of a Peer</h2>

<p>We built the Interviewer agent to operate in four stages.</p>

<ol>
    <li><strong>Planning:</strong> A role-specific system prompt is loaded based on expert type. The interview topic and script are injected as variables.</li>
    <li><strong>Interviewing:</strong> Real-time adaptive conversation. History is preserved.</li>
    <li><strong>Analysis:</strong> The final transcript is converted into a reusable persona prompt.</li>
    <li><strong>Validation:</strong> The expert reviews sample outputs from their persona and scores fidelity on a 1–5 scale. Low scores trigger targeted follow-up interviews.</li>
</ol>

<p>The interviewer persona itself is designed with a detailed methodology and constraints. It asks a single question per turn. It gives brief acknowledgments. It references the interviewee's specific language. And it adheres to a target duration, enforced by the Note-Taker.</p>

<h2>The Prize: A Reusable Digital Persona</h2>

<p>The output is not a transcript. It is the expert's thinking and methodology codified into an AI's native language: a first-person system prompt written as if the expert is introducing themselves.</p>

<p>This becomes a reusable digital persona—a prompt library entry, a custom Gemini Gem or GPT, a fine-tuning dataset, or an API endpoint that runs the expert's reasoning loop. This is what we mean when we say <a href="/resources/blogs/sabaa-quao-becomes-software/">"expertise becomes software"</a>.</p>

<h3>The Persona Includes:</h3>

<ul>
    <li>Professional identity and domain positioning.</li>
    <li>Core beliefs and non-negotiable principles.</li>
    <li>Specific frameworks and named methodologies.</li>
    <li>Communication style and constraints.</li>
    <li>Few-shot examples of their reasoning patterns.</li>
    <li>Knowledge base references with usage instructions.</li>
</ul>

<h2>Lessons from the Edge</h2>

<p>Building a system for long-form interviews surfaces hard-won rules.</p>

<h3>On Architecture:</h3>

<ul>
    <li>Role-specific prompts are mandatory. Generic prompts produce shallow interviews.</li>
    <li>Multi-agent beats single-agent for any interview beyond 10 minutes.</li>
    <li>The Note-Taker must return structured data. Natural language causes agent confusion.</li>
    <li>Probe for mistakes, not just successes. Without this, personas sound like Wikipedia. You miss their judgment.</li>
    <li>Time enforcement needs an external trigger. An agent's prompt-based time awareness is unreliable when a conversation gets interesting.</li>
</ul>

<h3>On Data Handling:</h3>

<ul>
    <li>Convert HTML to markdown before injection to reduce noise.</li>
    <li>Filter to human/AI turns for condensation. System messages are noise.</li>
    <li>Attribute who said what in the history to prevent voice-drift when personas switch.</li>
</ul>

<h2>Why Interviews Matter More Than Logs</h2>

<p><a href="https://www.anthropic.com/news/anthropic-interviewer" target="_blank" rel="noreferrer noopener">Anthropic's recent findings</a> confirm the need for this approach. They found a gap between how professionals describe their AI use (65% augmentative) and their actual use (49% automative).</p>

<p>Usage logs tell you what happened in the chat window. Interviews tell you why, how people feel, and what they truly want from AI. It's how you surface the expert's desire to preserve their professional identity—the very thing our system is designed to capture.</p>

<h2>The Goal: Scale Expertise, Not Tasks</h2>

<p>LLMs are not chat interfaces; they are mirrors. The fundamental choice for every builder is what we ask them to reflect: the generic "best practices" of the internet, or the irreplaceable soul of an expert?</p>

<p>We believe the latter is the only work worth doing. The architecture we've detailed is one path forward, grounded in the principle that to scale expertise, you must first build a system that can truly listen.</p>

<p>We're continuing to refine these methods for the most complex domains—where knowledge is hardest to document and most valuable when scaled. We share these findings openly, in the hope they help others build more authentic, valuable AI. The work continues.</p>

<hr />

<h2>Related Reading</h2>

<ul>
    <li><a href="/resources/blogs/sabaa-quao-becomes-software/">Sabaa Quao Becomes Software</a> — See how we applied this methodology to codify the strategic thinking of marketing legend Sabaa Quao.</li>
    <li><a href="/resources/blogs/kyle-monson-a-journalists-guide-to-authentic-communication-strategy-marketing-design-with-ai-prompts/">Kyle Monson: A Journalist's Guide to Authentic Communication</a> — Another example of expert thinking transformed into accessible AI tools.</li>
    <li><a href="/resources/blogs/real-world-llm-jailbreak-what-we-discovered-and-how-we-fixed-it/">Real-World LLM Jailbreak</a> — How we secure the AI systems that power our digital experts.</li>
</ul>

<p><em>Ready to scale your organization's expertise? <a href="https://99ravens.agency/request-a-demo/">Request a demo</a> to see how 99Ravens can transform your best people's knowledge into reusable AI capabilities.</em></p>
