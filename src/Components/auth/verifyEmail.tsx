"use client";

import React, { useContext } from "react";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function VerifyEmailForm() {
  const WixClient = useContext<MyWixClient>(WixClientContext);
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string>("");

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setCode(value);
  };

  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await WixClient.auth.processVerification({
        verificationCode: code,
      });

      switch (response.loginState) {
        case LoginState.SUCCESS:
          const tokens = await WixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );

          WixClient.auth.setTokens(tokens);
          Cookies.set("WIX_REFRESH_TOKEN", JSON.stringify(tokens.refreshToken));
          Cookies.set("WIX_ACCESS_TOKEN", JSON.stringify(tokens.accessToken));
          router.push("/");
          break;
        case LoginState.FAILURE:
          setError(response.error);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container verifyEmail-container">
      <h1>vérifiez votre email</h1>
      <form onSubmit={handleVerifyEmail}>
        <input
          type="text"
          name="code"
          value={code}
          onChange={handleChange}
          placeholder="Entrez le code de vérification"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "vérifier l'email"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
