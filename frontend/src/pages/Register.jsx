import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create an account</h2>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
        <SignUp routing="hash" afterSignUpUrl="/" appearance={{ variables: { colorPrimary: "#6c63ff", colorBackground: "#1a1d27", colorInputBackground: "#0f1117", colorInputText: "#e8eaf6", colorText: "#e8eaf6", borderRadius: "8px" } }} />
      </div>
    </div>
  );
}