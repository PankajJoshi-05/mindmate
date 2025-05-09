"use client"
import { cn } from "@/lib/utils"
import { Sparkles, User } from "lucide-react"
import { useState } from "react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "flex items-start gap-4 max-w-3xl transition-all duration-300",
        isUser ? "ml-auto" : "mr-auto",
        isHovered ? "scale-[1.01]" : "scale-100",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles size={20} className="text-primary" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-[80%] transition-all duration-300 shadow-sm",
          isUser ? "bg-gradient-blue text-white rounded-tr-none" : "bg-gray-100 dark:bg-gray-800 rounded-tl-none",
          isHovered ? "shadow-md" : "",
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className="mt-1 text-xs opacity-70 flex justify-end">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={20} className="text-primary" />
          </div>
        </div>
      )}
    </div>
  )
}
