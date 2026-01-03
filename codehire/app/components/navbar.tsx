import Link from "next/link"

export default function Navbar() {
  return (
    <div className="flex gap-4">
      {/* Login Button */}
      <Link
        href="/login"
        className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100"
      >
        Login
      </Link>

      {/* Sign Up Button */}
      <Link
        href="/signup"
        className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800"
      >
        Sign Up
      </Link>
    </div>
  )
}
