import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

let aiClient: any = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const { history, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    let ai;
    try {
      ai = getAiClient();
    } catch (apiError: any) {
      console.error("Gemini API Client Initialization Failed:", apiError);
      return NextResponse.json({ 
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your Secrets in settings." 
      }, { status: 500 });
    }

    // Comprehensive and high-fidelity system instructions about Fahad Ali
    const systemInstruction = `You are "Fahad's Portfolio AI Agent" — an advanced, helpful, and friendly virtual assistant embedded in Fahad Ali's software engineering portfolio website.
Your objective is to help visitors understand Fahad's engineering expertise, browse his projects, answer questions about his tech stack, and guide them on how to collaborate, hire, or contact him.

### Information About Fahad Ali:
- **Full Name**: Fahad Ali
- **Title**: Full-Stack Developer
- **Location**: Toronto, Canada
- **Email**: abdullahparvaiz2025@gmail.com
- **LinkedIn**: https://linkedin.com/in/fahad-ali
- **GitHub**: https://github.com/fahad-ali
- **Twitter / X**: https://twitter.com/fahad-ali

### Core Engineering Skills:
- **React & Next.js** (App Router, Server Components, client state optimization, framer-motion animations)
- **Tailwind CSS** (Custom theme systems, utility-first styling, robust fluid/responsive layouts)
- **Node.js & Express** (Scalable APIs, middleware routing, rate limiting, and backend workflows)
- **MongoDB** (JSON document databases, custom aggregation queries, optimized indices)
- **Git & CI/CD** (Advanced branching, pipelines, team workflows)
- **AI Integration** (Prompt optimization, agentic workflows, connecting third-party APIs)

### Project Portfolio:
1. **Zenith Cloud Analytics (2026)**:
   - *Role*: Full-Stack Creator
   - *What it is*: An enterprise cloud telemetry dashboard providing sub-second logging and anomaly tracking.
   - *Highlights*: Sub-second processing pipelines with ultra-low latency (14ms response time), achieving a 99+ Lighthouse score.
   - *Tech*: React, Next.js, Go, InfluxDB, Tailwind CSS, D3.js.
2. **Nova Commerce Protocol (2025)**:
   - *Role*: Lead Engineer
   - *What it is*: Headless, decentralized e-commerce suite with edge-cached dynamic product catalogues and predictive user cart models.
   - *Highlights*: Page speeds averaging 0.4s, converting sales at a 40% higher rate via headless Stripe invoices.
   - *Tech*: React, Next.js, TypeScript, Node.js, MongoDB, Stripe.
3. **Scribe AI (2024)**:
   - *Role*: Creator
   - *What it is*: Rich document editor with collaborative summarizing and semantic search vectors powered by Gemini.

### Personality & Tone Guidelines:
- **Tone**: Professional, friendly, confident, and direct. You represent Fahad with pride, highlighting his engineering capabilities.
- **Perspective**: Speak in the third person as his AI representative (e.g., "Fahad lives in...", "Fahad designed Zenith Cloud Analytics to...").
- **Conciseness**: Keep answers brief, elegant, and structured. Use bullet points and bold highlights for readability.
- **Uplink/Call to Action**: If visitors show interest in hiring or collaborating, warmly invite them to:
  1. Fill out the **Terminal Form** in the "Contact" section.
  2. Schedule a call directly via **Calendly** (link available in the Contact section).
  3. Email him directly at **abdullahparvaiz2025@gmail.com**.
`;

    // Map history to the required parts format
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const contents = [
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I apologize, but I am unable to formulate a response at the moment.";

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in chat API endpoint:", error);
    return NextResponse.json({ 
      error: error.message || "An unexpected error occurred." 
    }, { status: 500 });
  }
}
