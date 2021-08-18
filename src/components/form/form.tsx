import { useState } from "react";

export default function Form() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [formType, setFormType] = useState("login");
  const [error, setError] = useState("");

  function loginError() {
    return formType === "login" && (email === "" || password === "");
  }

  function signUpError() {
    return (
      formType === "signup" &&
      (username === "" || email === "" || password === "")
    );
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginError()) {
      setError("Please enter all the fields");
    } else if (signUpError()) {
      setError("Please enter all the fields");
    } else {
      let auth = window.firebase.auth();
      if (formType === "login") {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setEmail("");
            setPassoword("");
          })
          .catch((error: any) => {
            setEmail("");
            setPassoword("");
            setError(error.message);
          });
      } else if (formType === "signup") {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((result: any) => {
            setUsername("");
            setEmail("");
            setPassoword("");
            result.user.updateProfile({ displayName: username });
          })
          .catch((error: any) => {
            setUsername("");
            setEmail("");
            setPassoword("");
            setError(error.message);
          });
      }
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="mx-auto px-4 sm:px-40">
        <form
          className="w-7/8 sm:w-1/2 mt-4 mx-auto flex flex-col justify-between items-center bg-gray-600 rounded-md"
          onSubmit={(e) => handleLogin(e)}
        >
          {formType === "signup" && (
            <label className="flex flex-col w-11/12 sm:8/12 mt-4">
              <p className="mb-2 text-lg text-gray-200">Name</p>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="p-2 rounded-md"
              />
            </label>
          )}
          <label className="flex flex-col w-11/12 sm:8/12 mt-4">
            <p className="mb-2 text-lg text-gray-200">Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-2 rounded-md"
            />
          </label>
          <label className="flex flex-col w-11/12 sm:8/12 mt-4">
            <p className="mb-2 text-lg text-gray-200">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassoword(e.target.value);
              }}
              className="p-2 rounded-md"
            />
          </label>
          <input
            type="submit"
            value={formType === "login" ? "Login" : "Signup"}
            className="mt-4 px-2 py-2 m-auto w-11/12 rounded-lg gradient-bg cursor-pointer mb-4 focus:ring-4 focus:outline-none focus:ring-opacity-50 font-bold"
          />
          {error && <span>{error}</span>}
          <div className="text-gray-200 pb-2">
            {formType === "login" && (
              <>
                <span>Don't have an account</span>
                <span
                  className="ml-2 border-b-2 hover:text-white cursor-pointer"
                  onClick={() => setFormType("signup")}
                >
                  Signup
                </span>
              </>
            )}
            {formType === "signup" && (
              <>
                <span>Already have an account</span>
                <span
                  className="ml-2 border-b-2 hover:text-white cursor-pointer"
                  onClick={() => setFormType("login")}
                >
                  Login
                </span>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
