import "./SignUpPage.css";
import SignUpForm from "../SignUpForm/SignUpForm.jsx";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Navigate } from "react-router";

export default function SignUpPage() {
  const { user } = useContext(UserContext);
  if (user) return <Navigate to="/" />;

  return (
    <main>
      <section className="form-section">
        <SignUpForm />
      </section>
    </main>
  );
}
