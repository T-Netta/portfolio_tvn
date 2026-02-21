import Astronaut from "@/components/Astronaut"

export default function AboutSection() {
  return (
    <section
      id="about"
        className="py-24 bg-transparent text-white px-6"
      >
      <div className="relative max-w-5xl mx-auto text-center">                <Astronaut className="absolute bottom-15 left-150 animate-float" size={40} />

        <h2 className="text-4xl font-bold mb-8">About Me</h2>

        <p className="text-gray-400 text-lg leading-relaxed">
         I'm a Computer Science student at Kean University who enjoys building modern
        web applications and experimenting with AI-driven ideas. I like working across
        the full stack, turning concepts into responsive and scalable projects using
        tools like React, Next.js, and Tailwind CSS. For me, development is equal parts
        problem-solving and creativity.
        </p>

      </div>
    
    </section>
  )
}
