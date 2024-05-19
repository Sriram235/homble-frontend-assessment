import React, { useState } from "react";
import { postRequest } from "../axios";
import { useEffect } from "react";
import useGet from "../hooks/useGet";
import '../styles/home.css';
import Skeleton from "./Skeleton";

const Home = () => {
  const [isloading, setisloading] = useState(true);
  const [products, setproducts] = useState([]);
  const [display, setdisplay] = useState(false);
  const [Error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest('/products', {
      productName:e.target.productName.value,
      productDescription:e.target.productDescription.value,
      productAllenInfo:e.target.productAllenInfo.value
    }).then(res => console.log(res))
    setdisplay(!display)
  }

  const { data, loading, error } = useGet(`/products`)
  useEffect(() => {
    if (data) {
      const sortedProducts = [...data].sort((a, b) => a.selling_price - b.selling_price);
      setproducts(sortedProducts);
    }
    setError(error);
    setisloading(loading);
  }, [loading,error,data]);

  if(Error) return <h1 className="loading">{Error}</h1>;
  return (
    <>
    <h1 className="logo">Hombale</h1>
    <div className="addProduct">
      <button onClick={() => {setdisplay(!display)}}>Add Product</button>
    </div>
    {display && <div className="addProductModal">
      <button onClick={() => {setdisplay(!display)}} className="cancelButton">Cancel</button>
      <div className="productModalForm">
        <form onSubmit={handleSubmit}>
          <input type="text" name="productName" placeholder="Product Name" required={true} />
          <br />
          <input type="text" name="productDescription" placeholder="Product Description" required={true} />
          <br />
          <input type="text" name="productAllenInfo" placeholder="Product Allen Info" required={true} />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>}
    <div className="products">
      <h1 className="title">Products</h1>
      {isloading?
        <Skeleton /> :
        <div className="products-in">
        {products && products.map((item) => 
          <a href={`/product/${item.id}`} className="product"  key={item.id}>
              <img src={item.productImage} alt={item.name} />
              <div className="details">
                <p>{item.name}</p>
                <p>&#8377;{item.selling_price}</p>
              </div>
          </a>
        )}
        </div>
      }
    </div>
    </>
  );
};

export default Home;
