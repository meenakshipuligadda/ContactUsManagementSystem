import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import QueriesPage from "./pages/QueriesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact/edit/:id" element={<ContactPage />} />
        <Route path="/queries" element={<QueriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
