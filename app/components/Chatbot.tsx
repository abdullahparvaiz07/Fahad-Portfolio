'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Trash2, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timeString: string;
}

// Decouple impure utility helpers outside of the component to ensure strict React component purity
let globalIdCounter = 0;

function createUniqueId(role: 'user' | 'model'): string {
  globalIdCounter += 1;
  return `msg-${role}-${globalIdCounter}-${Math.floor(Math.random() * 100000)}`;
}

function getFormattedTime(): string {
  const date = new Date();
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Chatbot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lazy initializer ensures the initial welcome message is generated cleanly once on mount
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome',
      role: 'model',
      content: "Hi! I am Fahad's Portfolio AI Agent. I can tell you about Fahad's technical expertise, his featured full-stack projects, or guide you on how to contact and collaborate with him. Ask me anything!",
      timeString: "Agent"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
    }, 10);
    return () => clearTimeout(t);
  }, []);

  // Handle open/close with proper unread state reset
  const handleToggleOpen = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setHasUnread(false);
      }
      return nextState;
    });
  };

  // Auto-scroll to bottom of chat thread when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    if (!textToSend) {
      setInputValue('');
    }
    setError(null);

    const userMessage: Message = {
      id: createUniqueId('user'),
      role: 'user',
      content: text,
      timeString: getFormattedTime()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare history payload for API (exclude the static welcome message)
      const apiHistory = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: apiHistory
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to get a response from the AI Agent.');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: createUniqueId('model'),
        role: 'model',
        content: data.text,
        timeString: getFormattedTime()
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Set unread if the chatbot window is closed when the response arrives (unlikely but possible if they close fast)
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    if (window.confirm('Are you sure you want to clear your chat history?')) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          content: "Chat history cleared. Hi! I'm Fahad's AI Agent. Ask me anything about his skills, projects, or professional background!",
          timeString: getFormattedTime()
        }
      ]);
      setError(null);
    }
  };

  const quickPrompts = [
    { text: "What are Fahad's core skills?", label: "Skills" },
    { text: "Tell me about Zenith Analytics", label: "Zenith Analytics" },
    { text: "Tell me about Nova Commerce Protocol", label: "Nova Commerce" },
    { text: "How can I contact Fahad?", label: "Contact Info" }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* FLOATING LAUNCHER BUBBLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={handleToggleOpen}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/20 text-white flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)] cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center border border-zinc-950 shadow-md">
                  <Sparkles className="w-2.5 h-2.5 text-zinc-950 animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread indicator badge */}
          {hasUnread && !isOpen && (
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-bold items-center justify-center">!</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] max-h-[80vh] flex flex-col bg-zinc-950/95 border border-zinc-800/90 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(59,130,246,0.2)] backdrop-blur-lg z-50 text-left text-zinc-100"
          >
            {/* Ambient Neon Top Accent Border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

            {/* Chat Header */}
            <div className="px-5 py-4 bg-zinc-900/60 border-b border-zinc-800/80 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    Fahad&apos;s AI Agent
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-[10px] font-sans text-zinc-400 tracking-wider">Online &bull; Ask anything</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {messages.length > 1 && (
                  <button
                    onClick={resetChat}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900/80 transition-colors duration-200 cursor-pointer"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900/80 transition-colors duration-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {messages.map((msg) => {
                const isAI = msg.role === 'model';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  >
                    {/* Avatar Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${
                      isAI 
                        ? 'bg-zinc-900 border-zinc-800 text-blue-400' 
                        : 'bg-blue-600/10 border-blue-500/20 text-blue-300'
                    }`}>
                      {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1">
                      {/* Message Bubble */}
                      <div className={`px-4 py-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                        isAI 
                          ? 'bg-zinc-900/70 border border-zinc-800/70 text-zinc-100 rounded-tl-none' 
                          : 'bg-blue-600 text-white rounded-tr-none'
                      }`}>
                        <p className="whitespace-pre-line font-sans font-medium">
                          {msg.content}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <span className={`block text-[9px] text-zinc-500 font-mono ${isAI ? 'text-left pl-1' : 'text-right pr-1'}`}>
                        {msg.timeString}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Loader Dot Pulse Animation */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[85%] mr-auto"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-zinc-900/70 border border-zinc-800/70 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 h-[38px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[bounce_1s_infinite_100ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[bounce_1s_infinite_200ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[bounce_1s_infinite_300ms]" />
                  </div>
                </motion.div>
              )}

              {/* Error Info State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-950/40 border border-red-900/30 rounded-xl text-red-400 text-xs text-center font-sans font-medium"
                >
                  {error}
                </motion.div>
              )}

              {/* Helper target to auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starters Grid */}
            {messages.length === 1 && !isLoading && (
              <div className="px-5 pb-4">
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2 pl-1">Suggested Inquiries</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handleSend(p.text)}
                      className="p-2.5 rounded-xl bg-zinc-900/50 hover:bg-blue-950/20 border border-zinc-800 hover:border-blue-500/30 text-left text-[11px] font-sans font-bold text-zinc-300 hover:text-white transition-all duration-200 group flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{p.label}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Footer Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="px-4 py-3.5 bg-zinc-900/40 border-t border-zinc-800/80 flex items-center gap-2 relative z-10"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700/80 focus:border-blue-500/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  inputValue.trim() && !isLoading
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/15'
                    : 'bg-zinc-900 border border-zinc-800/60 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-4.5 h-4.5 animate-spin text-blue-400" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Core branding metadata */}
            <div className="bg-zinc-950 border-t border-zinc-900 px-4 py-1.5 text-center flex items-center justify-center gap-1.5">
              <span className="text-[9px] font-mono text-zinc-600 tracking-wider uppercase">Fahad Ali Portfolio Agent &bull; Powered by Gemini AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
