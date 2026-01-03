import { prisma } from '@/lib/prisma'
import Navbar from "./components/navbar"
import Link from 'next/link'

export default async function HomePage() {
  const user = await prisma.user.findFirst({
  where: {
    email: 'test@test.com'
  }
 })
 return (<div>
      <Navbar />
      <h1>Welcome to CodeHire</h1>
      {user ? <p>Logged in as {user.email}</p> : <p>Please log in.</p>}
      <h1> Welcome to the home HomePage  </h1>
      <p> This is the HomePage</p>
    </div>
  )
}
