import React from "react";
import { Form } from "../components";
import Navbar from "../components/navbar/navbar";
import { useData } from "../context/datacontext";

export default function AccountPage() {
  const { profile, loading } = useData();

  return loading ? (
    <main>
      <Navbar />
      <div className="mx-auto mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
    </main>
  ) : !profile ? (
    <main className="bg-gray-800">
      <Navbar />
      <Form />
    </main>
  ) : (
    <AccountData />
  );
}

function AccountData() {
  const { profile, logout, results } = useData();

  return (
    <>
      <Navbar />
      <main className="mx-auto pt-4 px-4 sm:px-80 bg-gray-800 min-h-screen text-gray-100">
        <section className="w-full sm:w-1/2 mx-auto flex justify-between">
          <div>Hi, {profile?.displayName && profile.displayName}</div>
          <button
            onClick={() => logout()}
            className="bg-gray-400 hover:bg-blue-dark text-white font-bold px-1 rounded"
          >
            Logout
          </button>
        </section>

        <section className="w-full sm:w-1/2 mx-auto mt-4 sm:mt-4 flex justify-between px-2 bg-gray-600">
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
        </section>
      </main>
    </>
  );
}
