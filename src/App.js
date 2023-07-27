import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-night.min.css'
import SignUp from "./screens/SignUp";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./screens/Cart";
import MyOrder from "./screens/MyOrder";
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


// React creates single page application so on clicking on home or login present in navbar reloads the page since they use anchor tag and href
// To avoid reloading and making the page a single page application we use react-router-dom and avoid reloading the page by creating routes and using 
// Link insteadof anchor tag and to instead of href

function App() {
  return (   
    <CartProvider>

      <Router>                  
        <div>          
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/createuser" element={<SignUp/>}/>
            <Route exact path="/myOrder" element={<MyOrder/>}/>
          </Routes>
        </div>
      </Router>

    </CartProvider>           
  );
}

export default App;
