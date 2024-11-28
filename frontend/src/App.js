import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddCategory from "./components/AddCategory";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="min-h-screen bg-zinc-200 w-full ">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Register />}></Route>
          <Route path="/addCatagory" element={<AddCategory />}></Route>
          <Route path="/addProduct" element={<AddProduct />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
