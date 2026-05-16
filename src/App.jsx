import { BrowserRouter as Router, Routes, Route } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
