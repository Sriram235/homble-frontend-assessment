import React from 'react';
import '../styles/home.css';
import picture from '../assets/loading.jpg';

function Skeleton() {
  return (
    <div className="products-in">
        <a href={`/`} className="product"  >
            <img src={picture} alt="Loading" />
            <div className="details">
            <p>Loading...</p>
            <p>&#8377;Loading...</p>
            </div>
        </a>
        <a href={`/`} className="product"  >
            <img src={picture} alt="Loading" />
            <div className="details">
            <p>Loading...</p>
            <p>&#8377;Loading...</p>
            </div>
        </a>
        <a href={`/`} className="product"  >
            <img src={picture} alt="Loading" />
            <div className="details">
            <p>Loading...</p>
            <p>&#8377;Loading...</p>
            </div>
        </a>
        
    </div>
  )
}

export default Skeleton