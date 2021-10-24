import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(){
    return(
        <nav className="navbar p-2 flex">
            <div className="nav-brand-section w-3/4 flex justify-center">
                <div className="nav-brand">
                    <p className="nav-brand-title text-xl italic font-semibold text-white">Flipkart</p>
                    <p className="nav-brand-sub-title text-white text-xs italic">Explore <span className="flipkart-plus-logo font-semibold">Plus</span></p>
                    
                </div>
                <input className="search-box w-1/2 mt-1 mb-1 ml-1 p-2" placeholder="Search for products, brands and more"></input><button className="bg-white mr-1 mb-1 mt-1 w-10"><i class="search-icon fas fa-search"></i></button>
            </div>
            <div className="nav-button-section w-1/4 flex">
            <Link to="/"><p className="text-xl pt-2 uppercase font-semibold text-white mr-16">Products</p></Link>
                <Link to="/cart"><p className="text-xl pt-2 uppercase font-semibold text-white">Cart</p></Link>
                
            </div>
        </nav>
    );
}