import "./Cart.css"
import { useSelector } from "react-redux";
import CartCard from "../../Components/Cards/CartCard/CartCard";
import SavedForNowCard from "../../Components/Cards/SavedForNowCard/SavedForNowCard"
import ProductCard from "../../Components/Cards/ProductCard/ProductCard";
import { useDispatch } from "react-redux";
import { removeFromSaveForLater } from "../../features/products/productSlice";

export default function Cart(){

    const dispatch = useDispatch();

    const {cart, savedForLater} = useSelector((state)=>state.productData)

    console.log(cart)

    function getTotalPrice(products){
        let sum =0;
        products.map((product)=>{
            sum+=parseInt(product.price)*parseInt(product.quantity)
            console.log(sum)
        })
        return sum;
    }

    function getDiscountedPrice(price, discount){


        return price - Math.ceil((discount*price)/100)
    }

    function getDiscount(products){
        let discount = 0;

        products.map((product)=>{
            let discountPrice = getDiscountedPrice(product.price, product.discountPercent);
            discountPrice = discountPrice*product.quantity
            discount+= ((product.price*product.quantity) - discountPrice)
        })

        return discount;
    }

    return(
        <div className="cart-layout w-full h-screen flex flex-col">
            <div className="bg-gray-200 p-4 flex w-full justify-center">
            <div className="cart-items w-3/5 bg-white mr-4 flex flex-col">
                <div className="cart-items-heading flex p-2">
                    <p className="font-bold">My Cart</p>
                </div>
                <div className="cart-items-display">
                    {cart.length>0?cart.map((product)=>{
                        return(
                            <div className="cart-product w-full mt-2">
                                <CartCard product={product}/>
                            </div>
                        );
                    }):"No items in Cart"}
                </div>
            </div>
            <div className="price-details w-1/4 h-60 bg-white flex flex-col items-start">
                <div className="w-full border-b-2 border-gray flex flex-col items-start pt-4 pl-4 pb-2">
                <p className="uppercase text-gray-400 font-semibold">Price Details</p>
                </div>
                {cart.length>0 && <div className="invoice-details p-4 w-full flex flex-col items-start">
                   <div className="total-price w-full flex justify-between">
                   <p className="price-items">Price {`(${cart.length} items)`}</p>
                   <p className="price-total-price">Rs.{getTotalPrice(cart)}</p>
                   </div>
                   <div className="total-price w-full flex justify-between">
                   <p className="price-discount">Discount</p>
                   <p className="price-discount-price">Rs.{getDiscount(cart)}</p>
                   </div>
                   <div className="total-price w-full flex justify-between">
                   <p className="price-discount">Delivery Charges</p>
                   <p className="price-discount-price">FREE</p>
                   </div>
                   <div className="total-price w-full flex mt-4 border-t-2 border-b-2 boder-gray justify-between">
                   <p className="price-total-amount text-2xl">Total Amount</p>
                   <p className="price-total-amount">{getTotalPrice(cart) - getDiscount(cart)}</p>
                   </div>
                   <p className="price-discount-price">{`You will save Rs.${getDiscount(cart)} on this order!`}</p>
                </div>}
                
            </div>
            </div>
            <div className="save-for-later">
                <p>Saved for later</p>
                <div className="w-5/6 flex flex-wrap">
                    {savedForLater.map((item)=>{
                        return(
                            <div className="product-card">
                                <SavedForNowCard product={item}/>
                                
                            </div>
                        );
                    })}
                </div>
            </div> 
        </div>
    );
}