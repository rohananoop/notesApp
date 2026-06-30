import { Link } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-dot" />
        Noted
      </Link>
      <div className="navbar-actions">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/login" />
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Sign in</Link>
            <Link to="/register" className="btn btn-primary">Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
}