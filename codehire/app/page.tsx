import { prisma } from '@/lib/prisma'
import Navbar from "./components/navbar"
import Link from 'next/link'
import { auth } from '@/app/api/auth/[...nextauth]/route'
import { User } from './user'
import { LogoutButton, LoginButton } from './auth-buttons'
import Hero from './components/hero'
import HowItWorks from './components/howItWorks'


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

    <div style={{ padding: "100px 20px" }}>
      <h1 className="text-4xl font-bold">Welcome to CodeHire</h1>
      {session ? <p>Logged in as {session.user?.email}</p> : <p>Please log in.</p>}

      {/* {user ? <p>Logged in as {user.email}</p> : <p>Please log in.</p>} */}
      <h1 className="text-4xl font-bold"> Welcome to the home HomePage  </h1>

      <h2 className="text-3xl font-bold">Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2 className="text-3xl font-bold">Client Call</h2>
      <User />
      <p> This is the HomePage</p>
    </div>


    <Navbar session={session} />
    <Hero />
    <HowItWorks />


  </div>
  )
}
