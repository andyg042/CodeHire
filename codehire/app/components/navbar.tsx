import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">CodeHire</span>
        </Link>



        <div className="navbar-actions">

          {/* Sign Up Button */}
          {/* lassName="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800" */}
          <a href="/signun" style={{ color: "#ede769" }}>
            SIGN UP
          </a>

          {/* Login Button */}
          <a href="/login" style={{ color: "#a2e52f" }}>
            LOGIN
          </a>

          <span className="logo-icon">⬡</span>

        </div>
      </div>
    </nav>
  )
}
