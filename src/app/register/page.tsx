'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { LoaderCircle } from 'lucide-react';
import register from '@/lib/actions/register';

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
                'Register'
            )}
        </Button>
    );
};

const initialState = {
    type: '',
    message: '',
};

export default function SignUpPage() {
    const [state, formAction] = React.useActionState(register, initialState);

    if (state.type === 'success') {
        window.location.href = '/';
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4">
            {/* Virat Kohli Background with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                        backgroundImage: "url('/kohli.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-950/90"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 animate-float z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-orange-400 opacity-60">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            </div>
            
            <div className="absolute bottom-20 right-10 animate-float-delayed z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-orange-400 opacity-60">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
            </div>
            
            <div className="absolute top-1/4 right-1/4 animate-bounce-slow z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-orange-400 opacity-40">
                    <path d="m3 11 18-5v12L3 14v-3z"/>
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
                </svg>
            </div>
            
            <div className="relative z-10 w-full max-w-lg">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-orange-500">
                            <path d="M12 4v16m8-8H4"/>
                        </svg>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                            Elite Cricket
                        </h1>
                    </div>
                    <p className="text-orange-200/80 mt-3 max-w-md mx-auto">
                        Premium cricket equipment for champions
                    </p>
                </div>
                
                <div className="w-full px-4 py-8 bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-orange-900/50 shadow-2xl">
                    <div className="grid gap-6">
                        <div className="text-center mb-2">
                            <h1 className="text-3xl font-bold text-white">Create Account</h1>
                            <p className="text-orange-200/80 mt-2">
                                Enter your information to join our community
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name" className="text-orange-300 font-medium">First Name</Label>
                                        <Input
                                            id="first-name"
                                            name="firstName"
                                            placeholder="Virat"
                                            required
                                            className="bg-gray-800 border-gray-700 text-white placeholder:text-orange-200/50 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name" className="text-orange-300 font-medium">Last Name</Label>
                                        <Input
                                            id="last-name"
                                            name="lastName"
                                            placeholder="Kohli"
                                            required
                                            className="bg-gray-800 border-gray-700 text-white placeholder:text-orange-200/50 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-orange-300 font-medium">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="email@example.com"
                                        required
                                        className="bg-gray-800 border-gray-700 text-white placeholder:text-orange-200/50 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>
                                
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-orange-300 font-medium">Password</Label>
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
                        
                        <div className="mt-4 text-center text-sm text-orange-200/80">
                            Already have an account?{' '}
                            <Link href="/login" className="text-orange-400 hover:text-orange-300 font-medium underline transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}