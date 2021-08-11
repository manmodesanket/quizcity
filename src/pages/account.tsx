import { useEffect, useState } from "react";
import { Form } from "../components";
import Navbar from "../components/navbar/navbar";

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(true);
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

  return isLoading ? (
    <div>
      <Navbar />
      <div className="mx-auto px-4 sm:px-40 bg-gray-800 min-h-screen text-gray-100">
        Laoding...
      </div>
    </div>
  ) : !currentUser ? (
    <div className="bg-gray-800">
      <Navbar />
      <Form />
    </div>
  ) : (
    <AccountData data={{ currentUser }} />
  );
}

function AccountData(data: any) {
  return (
    <div>
      <Navbar />
      <div className="mx-auto pt-4 px-4 sm:px-40 bg-gray-800 min-h-screen text-gray-100">
        <div className="bg-gray-600 rounded">
          <div className="flex justify-between px-2">
            <div>Welcome {data.data.currentUser.displayName}</div>
            <button onClick={() => window.firebase.auth().signOut()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
