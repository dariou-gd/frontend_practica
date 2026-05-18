import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { token, user, logout, loadingAuth } = useAuth();

  useEffect(() => {
    if (loadingAuth) return;

    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center flex-grow">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            Bienvenido{user ? `, ${user.email}` : ""}
          </h1>
          <p className="mt-4 text-gray-700">
            Explora las funcionalidades y disfruta de la experiencia.
          </p>
        </header>
        <main className="mt-8">
          <button
            onClick={handleLogout}
            className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Cerrar Sesión
          </button>
        </main>
      </div>
    </div>
  );
};

export default Home;
