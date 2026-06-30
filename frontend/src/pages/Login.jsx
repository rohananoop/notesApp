import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p>Don't have an account? <Link to="/register">Sign up free</Link></p>
        <SignIn routing="hash" afterSignInUrl="/" appearance={{ variables: { colorPrimary: "#6c63ff", colorBackground: "#1a1d27", colorInputBackground: "#0f1117", colorInputText: "#e8eaf6", colorText: "#e8eaf6", borderRadius: "8px" } }} />
      </div>
    </div>
  );
}