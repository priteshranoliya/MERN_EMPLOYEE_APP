import React from "react";
import EmployeeList from "../components/EmployeeList";
import Stats from "../components/Stats";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="py-6 text-center bg-white shadow">
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Management Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Built using MERN Stack + MySQL
        </p>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            📋 Employee Records
          </h2>
          <EmployeeList />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            📊 Insights & Statistics
          </h2>
          <Stats />
        </section>
      </main>

      <footer className="py-4 text-center bg-white border-t">
        <p className="text-sm text-gray-500">
          Built by{" "}
          <a
            href="https://github.com/priteshranoliya"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline"
          >
            Pritesh Ranoliya
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
