"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, X, LogOut, MessageSquare } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ChatHistory = {
  id: string
  title: string
  timestamp: Date
}

interface ChatSidebarProps {
  chatHistories: ChatHistory[]
  currentChatId: string | null
  setCurrentChatId: (id: string) => void
  onNewChat: () => void
  isOpen: boolean
  onClose: () => void
}

export default function ChatSidebar({
  chatHistories,
  currentChatId,
  setCurrentChatId,
  onNewChat,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  const isMobile = useMobile()
  const router = useRouter()
  const [hoveredChat, setHoveredChat] = useState<string | null>(null)

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
  }

  if (isMobile && !isOpen) {
    return null
  }

  return (
    <div
      className={`
        ${
          isMobile
            ? "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in"
            : "w-64 border-r animate-slide-in-left"
        }
      `}
    >
      <div
        className={`
        ${
          isMobile
            ? "fixed inset-y-0 left-0 w-64 bg-background shadow-lg animate-slide-in-left"
            : "h-full flex flex-col bg-gray-50 dark:bg-gray-900"
        }
        glass-effect
      `}
      >
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        )}

        <div className="p-4 animate-slide-up">
          <Button
            onClick={onNewChat}
            className="w-full justify-start hover-scale transition-all duration-300 bg-gradient-blue text-white hover:shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 custom-scrollbar">
          <div className="space-y-1 p-2">
            {chatHistories.map((chat, index) => (
              <button
                key={chat.id}
                onClick={() => {
                  setCurrentChatId(chat.id)
                  if (isMobile) onClose()
                }}
                onMouseEnter={() => setHoveredChat(chat.id)}
                onMouseLeave={() => setHoveredChat(null)}
                className={`
                  w-full text-left px-3 py-3 rounded-md text-sm transition-all duration-300
                  animate-slide-in-left
                  ${index < 5 ? `delay-${index * 100}` : ""}
                  ${
                    currentChatId === chat.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  }
                  relative overflow-hidden group
                `}
              >
                <div className="flex items-center">
                  <MessageSquare
                    size={16}
                    className={`mr-2 ${currentChatId === chat.id ? "text-primary" : "text-gray-500"}`}
                  />
                  <span className="truncate">{chat.title}</span>
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    hoveredChat === chat.id || currentChatId === chat.id ? "w-full" : "w-0"
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t animate-slide-up delay-500">
          <Button
            variant="outline"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-300 hover:shadow-md"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
