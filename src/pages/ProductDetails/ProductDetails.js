import React, { useEffect, useState } from "react"
import StarIcon from '@mui/icons-material/Star';
import "./ProductDetails.css"
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Services/ProductService";

const ProductDetails = (props) => {
    let { id } = useParams();
    const [product, setProduct] = useState(null);


    useEffect(() => {
        getProductById(id);
    }, [id])

    


    const getProductById = async (id) => {
        try {
            const result = await getProduct(id)
            setProduct(result.data.data)
        } catch (e) {
            console.log(e);
        }
    }

    const addToCartList = async () => {
        
    }

    const removeFromCartList = async () => {
        
    }

    return (
        <div className="prodct" >
            <Header />
            {product && (<div className="product_detail">
                <div className="product_image">
                    <div className="imagegallery">
                        <div>
                            <img className="main_image" src={product.image} alt="image" />
                            <div className="product_buy">
                                {/* {!item && <button className="product_buy_addtocart" onClick={addToCartList}>ADD TO BAG</button>} */}
                                <div className="product_add_or_remove">
                                    <button className="product_add" onClick={addToCartList}>+</button>
                                    <div className="product_count">10</div>
                                    <button className="product_remove" onClick={removeFromCartList}>-</button>
                                </div>
                                <button className="product_buy_wishlist">WISHLIST</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product_description">
                    <div className="product_summary">
                        <h6 className="product_details_heading">{product.title}</h6>
                        <span className="product_details_manufacturer">by {product.manufacturer}</span>
                        <div className="product_review">
                            <span className="product_review_value">
                                4.5 <StarIcon sx={{ fontSize: 10, color: 'white' }} />
                            </span>
                            <span className="product_review_count">(20)</span>
                        </div>
                        <div class="product_price">
                            <span className="product_details_price">{`Rs. ${product.realPrice}`}</span>
                            <span className="product_details_discount_price">{`Rs. ${product.discountedPrice}`}</span>
                        </div>
                    </div>
                    <div className="product_info">
                        <span className="product_info_head">Product Details</span>
                        <p className="product_info_desc">{product.description}</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default ProductDetails;