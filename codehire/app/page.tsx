import { prisma } from '@/lib/prisma'
import Navbar from "./components/navbar"
import Link from 'next/link'
import { auth } from '@/app/api/auth/[...nextauth]/route'
import { User } from './user'
import { LogoutButton, LoginButton } from './auth'

export default async function HomePage() {
  const session = await auth()
  // Test for session
  console.log("Session:", session)
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })
  return (<div>
    <LoginButton />
    <LogoutButton />

    <h1>Welcome to CodeHire</h1>
    {user ? <p>Logged in as {user.email}</p> : <p>Please log in.</p>}
    <h1> Welcome to the home HomePage  </h1>

    <h2>Server Session</h2>
    <pre>{JSON.stringify(session)}</pre>
    <h2>Client Call</h2>
    <User />
    <p> This is the HomePage</p>
  </div>
  )
}
