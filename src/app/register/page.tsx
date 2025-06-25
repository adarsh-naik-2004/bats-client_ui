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
            <div className="absolute inset-0 z-0">
                <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                        backgroundImage: "url('/kohli_5.webp')",
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