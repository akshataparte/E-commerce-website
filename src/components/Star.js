import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import '../styles/Star.css';

function Star(props) {
  const ratingStar = Array.from([0, 1, 2, 3, 4], (index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {props.stars >= index + 1 ? (
          <FaStar />
        ) : props.stars >= number ? (
          <FaStarHalfAlt />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });

  return (
    <>
      <div className="icon-style">
        <p>{ratingStar}</p>
      </div>
    </>
  );
}

export default Star;
