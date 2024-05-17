import React, { useState } from "react";
import { postRequest } from "../axios";
import { useEffect } from "react";
import useGet from "../hooks/useGet";

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

  if(Error) return <h1>{Error}</h1>;
  return (
    <>
    <div className="addProduct">
      <button onClick={() => {setdisplay(!display)}}>Add Product</button>
    </div>
    {display && <div className="addProductModal">
      <button onClick={() => {setdisplay(!display)}}>Cancel</button>
      <form onSubmit={handleSubmit}>
        <input type="text" name="productName" placeholder="Product Name" required={true} />
        <br />
        <input type="text" name="productDescription" placeholder="Product Description" required={true} />
        <br />
        <input type="text" name="productAllenInfo" placeholder="Product Allen Info" required={true} />
        <button type="submit">Add</button>
      </form>
    </div>}
    <div className="products">
      {isloading?
        <h1>Loading....</h1> :
        products && products.map((item) => 
          <a href={`/product/${item.id}`} key={item.id}>
            <div className="product">
              <img src={item.productImage} alt={item.name} />
              <p>{item.name}</p>
              <p>&#8377;{item.selling_price}</p>
            </div>
          </a>
        )
      }
    </div>
    </>
  );
};

export default Home;
