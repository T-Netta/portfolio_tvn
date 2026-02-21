"use client"
import Astronaut from "@/components/Astronaut"
import { useState, useEffect, useRef } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function MistralChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // ✅ Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMessage],
      }),
    })

    const data = await response.json()
    const botReply: Message = data.choices[0].message

    setMessages((prev) => [...prev, botReply])
    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      >
        <Astronaut
          className="pointer-events-none animate-float"
          size={30}
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="
          fixed
          left-4 right-4 bottom-4
          sm:left-auto sm:right-6 sm:bottom-24 sm:w-96
          bg-gray-900 text-white
          rounded-xl shadow-2xl
          z-50 flex flex-col
          max-h-[85dvh]
        ">

          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="font-semibold">Quasar</h2>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user"
                    ? "text-blue-400"
                    : "text-green-400"
                }
              >
                <strong>
                  {msg.role === "user" ? "You: " : "Quasar: "}
                </strong>
                {msg.content}
              </div>
            ))}
            {loading && <p className="text-gray-400">Thinking...</p>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700 flex gap-2 sticky bottom-0 bg-gray-900">
            <input
              className="flex-1 p-2 rounded bg-gray-800 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 px-4 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}