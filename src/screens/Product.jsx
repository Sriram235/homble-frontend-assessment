import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import { getRequest } from "../axios";
import useGet from '../hooks/useGet';

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

    if(isloading) return <h1>Loading...</h1>;
    if(Error) return <h1>{Error}</h1>;
    
    return (
        <>
        <img src={productData.productImage} alt={productData.name} />
        <p>Product Name : {productData.name}</p>
        <p>Price : {productData.selling_price}</p>
        <p>Description <button onClick={() => setshowDescription(!showDescription)}>{showDescription?"hide":"show"}</button></p>
        {showDescription && productData.description}

        <p>Allergens <button onClick={() => setshowAllenergen(!showAllenergen)}>{showAllenergen?"hide":"show"}</button></p>
        {showAllenergen && productData.allergen_info}

        <p>Usage Instructions  <button onClick={() => setshowUsage(!showUsage)}>{showUsage?"hide":"show"}</button></p>
        {showUsage && productData.cooking_instruction}
        </>
    )
}

export default Product;