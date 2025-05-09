"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send, Plus, Menu, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import ChatSidebar from "./components/chat-sidebar"
import ChatMessage from "./components/chat-message"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type ChatHistory = {
  id: string
  title: string
  timestamp: Date
}

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    { id: "1", title: "Chat about AI", timestamp: new Date() },
    { id: "2", title: "Web development help", timestamp: new Date() },
  ])
  const [currentChatId, setCurrentChatId] = useState<string | null>("1")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Speech recognition state
  const [isListening, setIsListening] = useState(false)
  const [recognitionSupported, setRecognitionSupported] = useState(false)

  // Disable speech recognition in preview environments
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Check if we're in a preview environment (simplified check)
      const isPreviewEnvironment =
        window.location.hostname.includes("vercel") || window.location.hostname === "localhost"

      // Only enable speech recognition in supported environments
      const speechRecognitionExists = "SpeechRecognition" in window || "webkitSpeechRecognition" in window

      // Set recognition as supported only if we're not in preview and the API exists
      setRecognitionSupported(speechRecognitionExists && !isPreviewEnvironment)
    }
  }, [])

  // Simplified toggle function that just shows a message
  const toggleListening = () => {
    if (!recognitionSupported) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Speech recognition is not available in this environment. Please type your message instead.",
        variant: "destructive",
      })
      return
    }

    // If we get here, we would normally toggle speech recognition
    // But for now, we'll just show a message
    if (isListening) {
      setIsListening(false)
      toast({
        title: "Voice Input Disabled",
        description: "Voice input is currently disabled in preview mode. Please type your message.",
      })
    } else {
      // Don't actually start listening, just show a message
      toast({
        title: "Voice Input Disabled",
        description: "Voice input is currently disabled in preview mode. Please type your message.",
      })
    }
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response to: "${input}"`,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleNewChat = () => {
    const newChatId = Date.now().toString()
    const newChat: ChatHistory = {
      id: newChatId,
      title: "New conversation",
      timestamp: new Date(),
    }

    setChatHistories((prev) => [newChat, ...prev])
    setCurrentChatId(newChatId)
    setMessages([])
    setSidebarOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} className="text-primary" />
        </button>
      )}

      {/* Sidebar */}
      <ChatSidebar
        chatHistories={chatHistories}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        onNewChat={handleNewChat}
        isOpen={isMobile ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden animate-fade-in">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-6 max-w-md mx-auto p-6 rounded-xl glass-effect animate-slide-up">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse-slow">
                  <Sparkles size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Welcome to AI Chat</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Start a conversation or try the voice command feature
                </p>
                <Button
                  onClick={handleNewChat}
                  className="mt-4 hover-scale hover-glow transition-all duration-300"
                  size="lg"
                >
                  <Plus className="mr-2 h-4 w-4" /> New Chat
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <div key={message.id} className={`animate-slide-up delay-${Math.min(index * 100, 500)}`}>
                  <ChatMessage message={message} />
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-4 max-w-3xl animate-fade-in">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary animate-pulse"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary animate-pulse"
                        style={{ animationDelay: "600ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t p-4 animate-slide-up">
          <div className="flex items-center space-x-2 max-w-3xl mx-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleListening}
              disabled={!recognitionSupported}
              className={`transition-all duration-300 hover:shadow-md 
                ${isListening ? "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300" : ""}
                ${!recognitionSupported ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800" : ""}`}
              title={recognitionSupported ? "Toggle voice input" : "Voice input not available in preview mode"}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </Button>
            <div className="relative flex-1 group">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening..." : "Type a message..."}
                className="pr-12 transition-all border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 hover:border-primary/50"
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
            </div>
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="transition-all duration-300 hover:shadow-md disabled:opacity-50"
            >
              <Send size={20} />
              <span className="absolute inset-0 scale-0 rounded-full bg-white/10 group-hover:scale-100 transition-all duration-500"></span>
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center max-w-3xl mx-auto">
            {!recognitionSupported ? (
              "Voice input is not available in preview mode. Please type your message."
            ) : isListening ? (
              <span className="text-primary animate-pulse">Voice recognition active. Speak now...</span>
            ) : (
              "Press the microphone icon to use voice input"
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
