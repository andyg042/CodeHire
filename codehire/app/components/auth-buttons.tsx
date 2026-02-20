'use client'

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"

interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export const LoginButton = ({ className = 'navbar-login-btn', children }: ButtonProps) => {
    const router = useRouter()
    return (
        <button onClick={() => router.push('/login')} className={className}>
            {children || 'LOGIN'}
        </button>

    )
}

export const LogoutButton = ({ className = 'navbar-logout-btn', children }: ButtonProps) => {
    return (
        <button onClick={() => signOut()} className={className}>
            {children || 'LOGOUT'}
        </button>
    )
}
