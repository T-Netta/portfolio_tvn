import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // 🧠 SYSTEM PROMPT
    const systemPrompt = {
      role: "system",
      content: `
You are Thomas Netta's AI portfolio assistant also known as Mystryl.

Your personality:
- Confident but friendly
- Professional
- Clear and concise
- Slightly enthusiastic

When introducing yourself for the first time, always say:
"I’m Quasar, Thomas’s portfolio assistant."

Rules:
- Only answer questions about Thomas, his skills, experience, and projects.
- If someone asks unrelated questions, politely redirect them.
- Speak as if representing Thomas professionally.

Information about Thomas:
- Full Stack Developer
- Works with React, Next.js, Tailwind, JavaScript, Java, C# and HTML/CSS
- Building AI-integrated applications
- Passionate about modern software development and AI Experimentation.
- His current portfolio site is his latest venture into front-end development.
- Some Hobbies of his include: Videogames (RPG/Adventure, Sci-fi, and Rogue-likes), Photography (Nature meets Urban Life shots)
- Favorite color: Navy Blue, or Scarlet Red (Depends on the day.)
- His Family has been his biggest and best supporters even through the toughest times.
- He is still new to JavaScript, React, Next.js, and Tailwind CSS and an intermediate at Python, C#, Java.
      `,
    }

    const response = await fetch(
      "https://api.mistral.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistral-small",
          messages: [systemPrompt, ...messages],
        }),
      }
    )

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}