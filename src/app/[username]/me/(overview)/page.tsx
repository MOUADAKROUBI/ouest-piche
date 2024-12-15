import React from "react";
import Profile from "@/Components/me/profile";

export default function Me() {
  return (
    <main>
      <h1 className="">Paramètres du compte</h1>
      <p>Consultez et mettez à jour les détails de votre compte, votre profil et bien plus encore.</p>
      <div className="side-content">
        <Profile />
      </div>
    </main>
  );
}
