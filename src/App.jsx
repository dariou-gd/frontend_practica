import { BrowserRouter as Router } from "react-router";
import AnimatedRoutes from "./components/AnimatedRoutes";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Products from "./pages/Products";

import { AuthProvider } from "./contexts/AuthContext";

const appRoutes = [
  { path: "/", element: <Login /> },

  {
    element: <AdminLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/products", element: <Products /> },
    ],
  },
];

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <main className="w-full">
            <AnimatedRoutes routes={appRoutes} />
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
