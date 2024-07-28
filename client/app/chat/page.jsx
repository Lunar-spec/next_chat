"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { getCookie, hasCookie } from 'cookies-next';
import Logout from '@/components/shared/Logout';
import Message from '@/components/shared/Message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

const STRAPI_URL = 'http://localhost:1337';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const socketRef = useRef();
    const messageContainerRef = useRef(null);

    const username = getCookie('username');

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${STRAPI_URL}/api/messages/recent`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleNewMessage = useCallback((message) => {
        console.log('Received message:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
    }, []);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socketRef.current = io(STRAPI_URL);

        socketRef.current.on('connect', () => {
            console.log('Connected to Socket.IO server');
            fetchMessages();
        });

        socketRef.current.on('message', handleNewMessage);

        socketRef.current.on('updateActiveUsers', (users) => {
            console.log('Updated active users:', users);
            setActiveUsers(users);
        });

        if (username) {
            socketRef.current.emit('join', { username });
        }

        setIsLoggedIn(hasCookie('jwt', { path: '/' }));

        return () => {
            if (socketRef.current) {
                socketRef.current.off('message', handleNewMessage);
                socketRef.current.disconnect();
            }
        };
    }, [handleNewMessage, username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputMessage && username) {
            try {
                socketRef.current.emit('sendMessage', { username, text: inputMessage });
                setInputMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <div className="mx-auto flex gap-6 flex-col container p-4">
                <span className="mb-4 flex gap-2">
                    <h2>Active Users:</h2>
                    <ul className='flex gap-2'>
                        {activeUsers.map((user, index) => (
                            <li key={index} className='bg-gradient-to-r capitalize px-2 py-1 rounded-full text-xs from-cyan-500 via-blue-600 to-blue-700 text-white'>{user}</li>
                        ))}
                    </ul>
                </span>
                <span
                    ref={messageContainerRef}
                    className="md:h-[35rem] h-[30rem] overflow-y-auto border px-4 py-2 rounded-md flex gap-4 flex-col bg-canvas bg-cover bg-center"
                >
                    {messages.map((message, index) => (
                        <Message username={username} message={message} key={index} />
                    ))}
                </span>
                <span>
                    <form onSubmit={handleSubmit} className="flex md:mx-32">
                        <Input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="rounded-none rounded-l-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border"
                        />
                        <Button type="submit" className='rounded-none rounded-r-sm text-base'>
                            <PaperPlaneIcon />
                        </Button>
                    </form>
                </span>
                <span>
                    {isLoggedIn && <Logout />}
                </span>
            </div>
        </div>
    );
}