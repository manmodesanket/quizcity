import { useEffect, useState } from "react";
import { Form } from "../components";
import Navbar from "../components/navbar/navbar";

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [currentUser, setCurrentuser] = useState<any>();

  useEffect(() => {
    const listener = window.firebase.auth().onAuthStateChanged((user: any) => {
      if (user != null) {
        setCurrentuser(user);
        setIsLoading(false);
      } else {
        setCurrentuser(user);
        setIsLoading(false);
      }
    });
    return () => listener();
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let auth = window.firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassoword("");
      })
      .catch((error: any) => {
        setEmail("");
        setPassoword("");
      });
  };

  return isLoading ? (
    <div>
      <Navbar />
      <div className="mx-auto px-4 sm:px-40 bg-gray-800 min-h-screen text-gray-100">
        Laoding...
      </div>
    </div>
  ) : !currentUser ? (
    <div className="bg-gray-800 min-h-screen">
      <Navbar />
      <div className="mx-auto px-4 sm:px-40">
        <form
          className="w-7/8 sm:w-1/2 mt-4 mx-auto flex flex-col justify-between items-center bg-gray-600 rounded-md"
          onSubmit={(e) => handleLogin(e)}
        >
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
            value="Submit"
            className="mt-4 px-4 py-3 m-auto w-11/12 rounded-lg gradient-bg cursor-pointer mb-4 focus:ring-4 focus:outline-none focus:ring-opacity-50 font-bold"
          />
        </form>
      </div>
    </div>
  ) : (
    <Account data={{ currentUser }} />
  );
}

function Account(data: any) {
  return (
    <div>
      <Navbar />
      <div className="mx-auto px-4 sm:px-40 bg-gray-800 min-h-screen text-gray-100">
        <div>Welcome {data.data.currentUser.email}</div>
        <button onClick={() => window.firebase.auth().signOut()}>Logout</button>
      </div>
    </div>
  );
}
