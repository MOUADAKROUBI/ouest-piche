import React from "react";
import VerifyEmailForm from "@/Components/auth/verifyEmail";

export default function Page() {
  return (
    <div className="auth-wrapper">
      <h2>Formulaire de vérification de l&apos;email</h2>
      <div className="login-container" id="container">
        <VerifyEmailForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel verifyEmail">
              <h1>veuillez vérifier votre email s&apos;il vous plaît</h1>
              <p>
                nous vous avons envoyé un email avec un code pour vérifier votre
                email
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
