'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React, { useActionState, Suspense } from 'react';
import { useFormStatus } from 'react-dom';
import login from '@/lib/actions/login';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            className="w-full bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-medium py-2 rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
            {pending ? (
                <div className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    <span>Please wait</span>
                </div>
            ) : (
                'Login'
            )}
        </Button>
    );
};

const initialState = {
    type: '',
    message: '',
};

const LoginForm = () => {
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('return-to');

    const [state, formAction] = useActionState(login, initialState);

    if (state.type === 'success') {
        window.location.href = returnTo ? returnTo : '/';
    }

    return (
        <div className="mx-auto w-full max-w-md px-4 py-8 bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-orange-900/50 shadow-2xl">
            <div className="grid gap-6">
                <div className="text-center mb-6">
                    
                    <h1 className="text-3xl font-bold text-white">Login</h1>
                    <p className="text-orange-200/80 mt-2">
                        Enter your credentials to access your account
                    </p>
                    
                    <p
                        aria-live="polite"
                        className={`mt-4 text-sm ${
                            state.type === 'error' ? 'text-red-400' : 'text-green-400'
                        }`}>
                        {state.message}
                    </p>
                </div>
                
                <form action={formAction}>
                    <div className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-orange-300 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                required
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-orange-200/50 focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password" className="text-orange-300 font-medium">Password</Label>
                            </div>
                            <Input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required 
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-orange-200/50 focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        
                        <div className="mt-2">
                            <SubmitButton />
                        </div>
                    </div>
                </form>
                
                <div className="mt-6 text-center text-sm text-orange-200/80">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-orange-400 hover:text-orange-300 font-medium underline transition-colors">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Login = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0">
                <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                        backgroundImage: 'url("/kohli_7.webp")',
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-950/90"></div>
            </div>
        
            <div className="relative z-10 w-full max-w-lg">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                            Cricstore
                        </h1>
                    </div>
                    <p className="text-orange-200/80 mt-3 max-w-md mx-auto">
                        Premium cricket equipment for champions
                    </p>
                </div>
                
                <Suspense fallback={
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
};

export default Login;