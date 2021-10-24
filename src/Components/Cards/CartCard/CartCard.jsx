import { useDispatch } from "react-redux";
import { removeFromCart, saveForLater, incrementQuantity, decrementQuantity } from "../../../features/products/productSlice";
import "./CartCard.css"

export default function CartCard({product}){
    const dispatch = useDispatch();

    function getDiscountedPrice(price, discount){


        return price - Math.ceil((discount*price)/100)
    }

    return(
        <div className="cart-card-layout flex flex-col pt-2">
            <div className="w-full flex justify-around">
            <div className="cart-product-image-section w-1/5">
              <img className="cart-product-image pt-2" src={product.image}/>
              
            </div>
            <div className="cart-product-details w-2/3 flex flex-col items-start">
                <p>{product.name}</p>
                <p>{product.brand}</p>
                <p><span className="line-through">Rs.{product.price}</span><span className="discount-text ml-2">{product.discountPercent}%</span> Off! </p>
            <p>Rs.{getDiscountedPrice(product.price, product.discountPercent)} </p>
             
            </div>
        </div>
        <div className="w-full">
        <div className="button-section mb-2 flex justify-start">
                 <div className="flex w-1/3 ml-16">
                  <button onClick={()=>{
                      if(product.quantity===1){
                          dispatch(removeFromCart(product))
                      }else{
                      dispatch(decrementQuantity(product))
                  }}}><i class="fas fa-minus-circle mr-2 ml-2"></i></button>
                    <p className="bg-white w-8 h-6 border-gray border-2">{product.quantity}</p>
                  <button onClick={()=>dispatch(incrementQuantity(product))}><i class="fas fa-plus-circle mr-2 ml-2"></i></button>
                  </div>
                  <button className="ml-2 mr-2" onClick={()=>dispatch(saveForLater(product))}>Save for later</button>
                  <button className="ml-2 mr-2" onClick={()=>dispatch(removeFromCart(product))}>Remove</button>
              </div>
        </div>
        </div>
    );
}


 