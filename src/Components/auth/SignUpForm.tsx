'use client';

import React, { useContext } from "react";
import { MyWixClient, WixClientContext } from "@/Contexts/wixContext";
import { SignUp } from "@/lib/difinations";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { UseUser } from "@/hooks/useUser";

function SignUpForm() {
  const WixClient = useContext<MyWixClient>(WixClientContext);
  const { getUser } = UseUser();
  const router = useRouter();
  const [state, setState] = React.useState<SignUp>({
    name: "",
    email: "",
    password: ""
  });
  
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { name, email, password } = state;

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }

    setLoading(true);
    try {
      const response = await WixClient.auth.register({
        email,
        password,
        profile: { nickname: name }
      });
      
      switch (response.loginState) {
        case LoginState.SUCCESS:
          const tokens = await WixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken,
          );
    
          WixClient.auth.setTokens(tokens);
          Cookies.set("WIX_REFRESH_TOKEN", JSON.stringify(tokens.refreshToken));
          Cookies.set("WIX_ACCESS_TOKEN", JSON.stringify(tokens.accessToken));
          router.back();
          await getUser(WixClient);
          break;
        case LoginState.FAILURE:
          setError(response.error);
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          router.push('/verify-email');
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
    }
    catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
    finally {
      setLoading(false);
    }

  };

  return (
    <div className="form-container sign-up-container">
      <h1>Créer un compte</h1>
      <div className="social-container">
      <button className="social">
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
      <span>ou utilisez votre email pour vous inscrire</span>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "S'inscrire"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SignUpForm;
