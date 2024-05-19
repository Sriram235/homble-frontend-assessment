import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/product.css';
import useGet from '../hooks/useGet';
// import { getRequest } from "../axios";

function Product() {
    const params = useParams();
    const [productData, setproductData] = useState({});
    const [isloading, setisloading] = useState(true);
    const [showDescription, setshowDescription] = useState(false);
    const [showAllenergen, setshowAllenergen] = useState(false);
    const [showUsage, setshowUsage] = useState(false);
    const [Error, setError] = useState(null);
    
    const { data, loading, error } = useGet(`/products/${params.id}`)
    useEffect(() => {
        setisloading(loading);
        setError(error);
        setproductData(data);
    }, [loading,error,data])

    if(isloading) return <h1 className='loading'>Loading...</h1>;
    if(Error) return <h1 className='loading'>{Error}</h1>;
    
    return (
        <>
        <a href="/" className='backlink'>Back</a>
        <div className="container">
            <img src={productData.productImage} alt={productData.name} />
            <table>
                <tr>
                    <td className='label'>Product Name</td>
                    <td >{productData.name}</td>
                </tr>
                <tr>
                    <td className='label'>Price</td>
                    <td>{productData.selling_price}</td>
                </tr>
                <tr>
                    <td className='label'>Description</td>
                    <td>
                        <button onClick={() => setshowDescription(!showDescription)}>{showDescription?"hide":"show"}</button>
                        <p>{showDescription && productData.description}</p>
                    </td>
                </tr>
                <tr>
                    <td className='label'>Allergens</td>
                    <td>
                        <button onClick={() => setshowAllenergen(!showAllenergen)}>{showAllenergen?"hide":"show"}</button>
                        <p>{showAllenergen && productData.allergen_info}</p>
                    </td>
                </tr>
                <tr>
                    <td className='label'>Usage Instructions</td>
                    <td>
                        <button onClick={() => setshowUsage(!showUsage)}>{showUsage?"hide":"show"}</button>
                        <p>{showUsage && productData.cooking_instruction}</p>
                    </td>
                </tr>
            </table>
        </div>
        </>
    )
}

export default Product;