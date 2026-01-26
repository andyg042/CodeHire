'use client'

import { signIn, signOut } from "next-auth/react";

interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export const LoginButton = ({ className = 'navbar-login-btn', children }: ButtonProps) => {
    return (
        <button onClick={() => signIn()} className={className}>
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
