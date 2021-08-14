import React from "react";
import { Form } from "../components";
import Navbar from "../components/navbar/navbar";
import { useData } from "../context/datacontext";

export default function AccountPage() {
  const { profile, loading } = useData();

  return loading ? (
    <div>
      <Navbar />
      <div className="mx-auto mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
    </div>
  ) : !profile ? (
    <div className="bg-gray-800">
      <Navbar />
      <Form />
    </div>
  ) : (
    <AccountData />
  );
}

function AccountData() {
  const { profile, logout, results } = useData();

  return (
    <div>
      <Navbar />
      <div className="mx-auto pt-4 px-4 sm:px-40 bg-gray-800 min-h-screen text-gray-100">
        <div className="flex flex-wrap rounded">
          <div className="w-full sm:w-5/12 bg-gray-600 rounded">
            <div>Welcome {profile?.displayName && profile.displayName}</div>
            <button
              onClick={() => logout()}
              className="bg-blue-200 hover:bg-blue-dark text-white font-bold py-1 px-2 rounded"
            >
              Logout
            </button>
          </div>
          <div className="w-full mt-4 sm:mt-0 sm:ml-4 sm:w-5/12 flex justify-between px-2 bg-gray-600 rounded">
            {results && (
              <div className="w-full flex flex-col px-4">
                <h2 className="text-xl font-bold">Quiz History</h2>
                {results.map((item: Array<string | Number>, i: React.Key) => (
                  <div key={i} className="flex justify-between">
                    <div className="font-bold">{item[0]}</div>
                    <div>{item[1]}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
