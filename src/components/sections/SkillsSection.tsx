"use client"

import React from "react"

// Define a TypeScript interface for your skills
interface Skill {
  name: string
  level: number // 0-100
}

// Your skills data
const skills: Skill[] = [
  { name: "JavaScript", level: 45 },
  { name: "React", level: 30 },
  { name: "Next.js", level: 40 },
  { name: "Tailwind CSS", level: 35 },
  { name: "Python", level: 60 },
  { name: "C#", level: 50 },
  {name: "Java", level: 65}
]

// Function to map level to label
function getProficiencyLabel(level: number): string {
  if (level >= 90) return "Expert"
  if (level >= 70) return "Advanced"
  if (level >= 50) return "Intermediate"
  return "Beginner"
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-transparent text-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>

        <div className="space-y-6">
          {skills.map((skill: Skill) => (
            <div key={skill.name}>
              {/* Skill name and proficiency label */}
              <div className="flex justify-between mb-1">
                <span className="text-lg font-semibold">{skill.name}</span>
                <span className="text-sm text-gray-400">
                  {getProficiencyLabel(skill.level)}
                </span>
              </div>

              {/* Skill bar */}
              <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                <div
                  className="h-4 rounded-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}