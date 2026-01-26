import Link from "next/link"
import { LoginButton, LogoutButton } from '../auth-buttons'


export default function Navbar({ session }: { session: any }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">CodeHire</span>
        </Link>



        <div className="navbar-actions">

          {session ? (
            //User IS logged in - show email and loggout button
            <>
              <span className="navbar-user">User: {session.user?.email}</span>
              <LogoutButton className="navbar-logout-btn" />
              <span className="logo-icon">⬡</span>
            </>

          ) : (
            //User is NOT logged in - show sign up and log in links
            <>
              {/* <button className="btn-secondary">Sign up</button>
              <LoginButton /> */}

              {/* Sign Up Button */}
              {/* lassName="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800" */}
              <a href="/signup" style={{ color: "#ede769" }}>
                SIGN UP
              </a>

              {/* Login Button */}
              {/* <a href="/api/auth/signin" style={{ color: "#a2e52f" }}>
                LOGIN
              </a> */}
              <LoginButton className="navbar-login-btn" />
            </>
          )}

        </div>
      </div>
    </nav>
  )
}
