import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const user = await prisma.user.findFirst({
  where: {
    email: 'test@test.com'
  }
 })
 return (<div>
      <h1>Welcome to CodeHire</h1>
      {user ? <p>Logged in as {user.email}</p> : <p>Please log in.</p>}
    </div>
  )
}
