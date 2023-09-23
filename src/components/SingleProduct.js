import React from 'react';
import Star from './Star';
import '../styles/SingleProduct.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLocation } from 'react-router-dom';

function SingleProduct(props) {
  let { item: data } = useLocation().state;

  return (
    <div className="main-container">
      <div className="container">
        <div className="imgs">
          <Carousel className="carousel">
            {data.images.map((imageSrc) => {
              return <img src={imageSrc} className="img" alt="product-image" />;
            })}
          </Carousel>
        </div>

        <div className="info">
          <h2>Title : {data.title}</h2>
          <p>Price : RS.{data.price}</p>
          <p>Description : {data.description}</p>
          <p>Brand : {data.brand}</p>
          <p>{<Star stars={data.rating} />}</p>
          <p>Stock : {data.stock > 0 ? 'In Stock' : 'Not Available'}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
