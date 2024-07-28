"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setCookie } from 'cookies-next';

const STRAPI_URL = 'http://localhost:1337';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${STRAPI_URL}/api/auth/local`, {
                identifier: email,
                password: password
            });

            const { jwt, user } = res.data;

            if (user && jwt) {
                toast.success('Login successful!', {
                    icon: '🔥',
                });

                setCookie('jwt', jwt, { path: '/' });
                setCookie('username', user.username, { path: '/' });

                router.push('/chat');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Login failed');
            toast.error('Login failed', {
                icon: '🚫',
            })
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border w-1/2 px-4 py-2 rounded-sm">
                <h1 className="text-3xl font-bold my-2">Login</h1>

                <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="rounded" />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="rounded" />
                    <Button variant="default" type="submit" className="px-4 py-2 rounded-sm">Login</Button>
                </form>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            </div>
        </div>
    )
}

export default Login