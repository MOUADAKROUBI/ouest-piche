"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UseUser } from "@/hooks/useUser";

function SignInForm() {
  const WixClient = useContext<MyWixClient>(WixClientContext);

  const { getUser, foreignPassowrd } = UseUser();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const authWithGoogle = async () => {
    return;
  }

  const resetPassword = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (!state.email) {
      setError("veuillez entrer votre email");
      return;
    }

    await foreignPassowrd(WixClient, state.email, "http://localhost:3000/auth");
    alert("veillez consulter votre boite email pour réinitialiser votre mot de passe");
  }

  const handleOnSubmit = async (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { email, password } = state;

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }

    setLoading(true);
    try {
      const response = await WixClient.auth.login({
        email,
        password,
      });

      switch (response.loginState) {
        case LoginState.SUCCESS:
          const tokens = await WixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );

          WixClient.auth.setTokens(tokens);
          Cookies.set("WIX_REFRESH_TOKEN", JSON.stringify(tokens.refreshToken));
          Cookies.set("WIX_ACCESS_TOKEN", JSON.stringify(tokens.accessToken));
          router.back();
          await getUser(WixClient);
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          router.push('/verify-email');
          break;
        case LoginState.FAILURE:
          setError(response.error);
          break;
        case LoginState.USER_CAPTCHA_REQUIRED:
          setError("User Captcha Required");
          break;
        case LoginState.SILENT_CAPTCHA_REQUIRED:
          setError("Silent Captcha Required");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <h1>Se connecter</h1>
      <div className="social-container">
        <button 
          className="social"
          onClick={authWithGoogle}
        >
          <svg
            viewBox="-0.5 0 48 48"
            version="1.1"
            width={24}
            height={24}
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
              <defs> </defs>{" "}
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g
                  id="Color-"
                  transform="translate(-401.000000, -860.000000)"
                >
                  {" "}
                  <g
                    id="Google"
                    transform="translate(401.000000, 860.000000)"
                  >
                    {" "}
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      id="Fill-1"
                      fill="#FBBC05"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      id="Fill-2"
                      fill="#EB4335"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      id="Fill-3"
                      fill="#34A853"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      id="Fill-4"
                      fill="#4285F4"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
          <span>connecter avec google</span>
        </button>
      </div>
      <span>au bien utiliser votre compte</span>
      <form onSubmit={handleOnSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          required
          onChange={handleChange}
        />
        <Link href="#" onClick={resetPassword}>Mot de passe oublié ?</Link>
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default SignInForm;
