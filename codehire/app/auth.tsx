'use client'

/*
In your specific case, you created an auth.tsx (with the .tsx extension) 
because it contains React Client Components.

Purpose: To house buttons or hooks that need the 'use client' directive.
Why? You cannot put 'use client' in your main auth.ts because that file 
exports server-only functions like auth(). Using a separate .tsx file allows 
you to create interactive buttons while keeping the server logic secure. 
*/
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
    return <button onClick={() => signIn()}>Login</button>
}

export const LogoutButton = () => {
    return <button onClick={() => signOut()}>Sign out</button>
}

export const SignUpButton = () => {
    return (
        <Link href="/signup">
            <button>Sign up</button>
        </Link>
    )
}