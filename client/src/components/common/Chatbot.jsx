import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import { BASE_API_URL } from '../../config';


function getOrCreateSessionId() {
    let sessionId = localStorage.getItem('chatbotSessionId');
    if (!sessionId) {
        sessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('chatbotSessionId', sessionId);
    }
    return sessionId;
}

const cleanUrl = (url) => {
    const trailingPunctuationRegex = /[.,?!);]+$/;
    return url.replace(trailingPunctuationRegex, '');
};


const renderMessageContent = (text) => {
    const parts = [];
    let lastIndex = 0;

    
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;

    let match;

    while ((match = markdownLinkRegex.exec(text)) !== null) {
        
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        const linkText = match[1]; 
        const url = cleanUrl(match[2]); 

        parts.push(
            <a key={`markdown-${match.index}`} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {linkText}
            </a>
        );
        lastIndex = markdownLinkRegex.lastIndex; 
    }
 const remainingText = text.substring(lastIndex);
    if (remainingText) {
        
        const bareUrlRegex = /(https?:\/\/[^\s]+)/g;
        let bareUrlMatch;
        let bareUrlLastIndex = 0; 

        while ((bareUrlMatch = bareUrlRegex.exec(remainingText)) !== null) {
            
            if (bareUrlMatch.index > bareUrlLastIndex) {
                parts.push(remainingText.substring(bareUrlLastIndex, bareUrlMatch.index));
            }

            const url = cleanUrl(bareUrlMatch[0]); 

            parts.push(
                <a key={`bareurl-${lastIndex + bareUrlMatch.index}`} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {url}
                </a>
            );
            bareUrlLastIndex = bareUrlRegex.lastIndex; 
        }

         if (bareUrlLastIndex < remainingText.length) {
            parts.push(remainingText.substring(bareUrlLastIndex));
        }
    }

     if (parts.length === 0 && text.length > 0) {
        return text;
    }

  
    return parts;
};



const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]); 
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null); 

    const sessionId = getOrCreateSessionId(); 

    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            
            setMessages([{ sender: 'ai', text: "Hello! How can I help you find products on PickNPay today?" }]);
        }
    }, [isOpen]);

    const sendMessage = async (messageToSend = inputMessage) => {
        if (!messageToSend.trim() && messageToSend !== '') return;

        const newMessage = { sender: 'user', text: messageToSend };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputMessage('');

        setIsLoading(true);

        try {
            const response = await axios.post(`${BASE_API_URL}/api/chatbot/message`, {
                userId: sessionId,
                message: messageToSend,
            });

            if (response.data.success) {
                setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: response.data.aiMessage }]);
            } else {
                setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: 'Oops! Something went wrong on my end. Please try again.' }]);
                console.error("Backend error:", response.data.message);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: 'I am having trouble connecting. Please check your internet connection or try again later.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { 
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50"
                >
                    <MessageSquare size={24} />
                </Button>
            )}

           
            {isOpen && (
                <Card className="fixed bottom-4 right-4 w-[350px] h-[500px] flex flex-col shadow-lg rounded-lg z-50">
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                        <CardTitle className="text-lg font-semibold">PickNPay Assistant</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] p-2 rounded-lg text-sm break-words ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                    }`}
                                >
                                    
                                    {msg.sender === 'ai' ? (
                                        renderMessageContent(msg.text.trim()) 
                                    ) : (
                                        
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[75%] p-2 rounded-lg bg-gray-200 text-gray-800 text-sm">
                                    <Loader2 className="h-4 w-4 animate-spin inline-block mr-2" />
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>
                    <CardFooter className="flex p-4 border-t">
                        <Input
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 mr-2"
                            disabled={isLoading}
                        />
                        <Button onClick={() => sendMessage()} disabled={isLoading || !inputMessage.trim()}>
                            <Send size={20} />
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </>
    );
};

export default Chatbot;