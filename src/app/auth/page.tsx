"use client";

import React, { useState } from "react";
import SignInForm from "@/Components/auth/SignInForm";
import SignUpForm from "@/Components/auth/SignUpForm";

export default function Page() {
  const [type, setType] = useState<string>("signIn");

  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
    }
  };
  
  const containerClass =
    "login-container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="auth-wrapper">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bon Retour!</h1>
              <p>
                Pour rester connecté avec nous, veuillez vous connecter avec vos
                informations personnelles
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Se Connecter
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bonjour, Ami!</h1>
              <p>
                Entrez vos informations personnelles et commencez votre voyage
                avec nous
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
