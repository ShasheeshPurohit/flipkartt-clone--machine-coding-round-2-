import "./SavedForNowCard.css"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/products/productSlice";
import { Link } from "react-router-dom";
import { removeFromSaveForLater } from "../../../features/products/productSlice";

export default function ProductCard({product}){

    const dispatch = useDispatch();
    const {cart} = useSelector((state)=>state.productData)

    function getDiscountedPrice(price, discount){


        return price - (Math.ceil(((discount/price)*100)))
    }

    return(
        <div className="product-card-layout flex flex-col items-start p-1">
            <div className="product-card-image-container">
                <img className="product-card-image" src={product.image}/>
            </div>
            <p>{product.brand}</p>
            <p>{product.name.length>15?product.name.substring(0,26):product.name}</p>
            <p>Rs.{product.price} {getDiscountedPrice(product.price, product.discountPercent)}</p>
            <div className="product-sizes flex">
                <p>Sizes:</p>
                {product.sizes.map((size)=>{
                    return (
                        <p className="w-6">{size}</p>
                    );
                })}
            </div>
            <div className="button-section flex justify-between w-full">
                {cart.includes(product)?<Link to="/cart" className="cart-add-btn">Go to cart</Link>:<button
                className="cart-add-btn" onClick={()=>{
                    
                    dispatch(addToCart(product))
                    
                    }}>Move to Cart</button>}
                <button onClick={()=>dispatch(removeFromSaveForLater(product))} className="wish-add-btn">Remove</button>
            </div>
        </div>
    );
}