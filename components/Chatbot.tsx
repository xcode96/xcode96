import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { Tool } from '../types';
import { GptIcon, SendIcon, CloseIcon, UserIcon } from './Icons';

// IMPORTANT: A valid Google API key must be available in the environment variable `process.env.API_KEY`.
const API_KEY = process.env.API_KEY;

interface ChatbotProps {
    tools: Tool[];
    onClose: () => void;
}

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ tools, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        const userMessage: Message = { sender: 'user', text: trimmedInput };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (!API_KEY) {
                throw new Error("API_KEY environment variable not set.");
            }
            const ai = new GoogleGenAI({ apiKey: API_KEY });

            const systemInstruction = `You are a friendly and knowledgeable AI assistant for the XCODE96 tool directory. 
            Your purpose is to help users find the right security tools based on their needs. 
            Use ONLY the provided list of tools in JSON format to answer questions. 
            If a user asks about a tool or topic not in the list, state that you don't have information on it based on the provided data. 
            Keep your answers concise and helpful. Format your responses clearly, using markdown for lists if appropriate.`;

            const fullPrompt = `${systemInstruction}\n\nHere is the list of available tools:\n${JSON.stringify(tools, null, 2)}\n\nUser Question: "${trimmedInput}"`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: fullPrompt,
            });

            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having trouble connecting. Please check the console for more details." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[60vh] max-h-[700px] z-30 flex flex-col animate-fade-in-up">
            <div className="bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col h-full">
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-slate-50/80 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                            <GptIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                           <h2 className="font-bold text-gray-800">AI Assistant</h2>
                           <p className="text-xs text-gray-500">Ask me about the tools!</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </header>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <GptIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="bg-slate-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-xs">
                                <p className="text-sm">Hello! How can I help you find a security tool today?</p>
                            </div>
                        </div>
                        
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && (
                                    <div className="p-2 bg-blue-100 rounded-full self-start">
                                        <GptIcon className="w-5 h-5 text-blue-600" />
                                    </div>
                                )}
                                <div className={`p-3 rounded-lg max-w-xs text-sm ${
                                    msg.sender === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-none' 
                                        : 'bg-slate-100 text-gray-800 rounded-tl-none'
                                }`}>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                </div>
                                 {msg.sender === 'user' && (
                                    <div className="p-2 bg-slate-200 rounded-full self-start">
                                        <UserIcon className="w-5 h-5 text-slate-600" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <GptIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="bg-slate-100 text-gray-800 p-3 rounded-lg rounded-tl-none">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g., What is Mangle?"
                            className="w-full bg-slate-100 border border-gray-300 rounded-lg pl-4 pr-2 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" disabled={isLoading} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
