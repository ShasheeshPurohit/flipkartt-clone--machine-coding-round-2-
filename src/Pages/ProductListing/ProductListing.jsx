import "./ProductListing.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadProducts } from "../../features/products/productSlice";
import ProductCard from "../../Components/Cards/ProductCard/ProductCard";

export default function ProductListing(){

    const dispatch = useDispatch();
    const {products, status} = useSelector((state)=>state.productData)

    useEffect(()=>{
        if(status==="idle"){
            dispatch(loadProducts())
            
        }
    },[dispatch])

    

    return(
        <div className="product-listing-layout w-full flex">
            <div className="sidebar-layout w-2/12 ">Filters</div>
            <div className="products-display w-10/12  flex flex-wrap p-8">
                {status === "loading" && <h1>Loading</h1>}
                {status === "success" && products.map((product)=>{
                    return (
                        <div className="m-4">
                            <ProductCard product={product}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}