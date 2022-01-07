import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';
import ReviewItem from './ReviewItem';
import calculateAvgRate from '../utils/Utils';

const ProductReviews = ({ name, reviews, onAddReviewClick }) => {
  const rates = [];
  reviews.forEach((review) => {
    rates.push(review.rating);
  });
  const avgRating = calculateAvgRate(rates);

  return (
    <div>
      <h2 className="product-header">{name}</h2>
      <div className="rating-row">
        <div className="left-part">
          <div className="total-rate">{parseFloat(avgRating).toFixed(1)}</div>
          <Stars value={avgRating}></Stars>
        </div>
        <div className="right-part">
          <button className="btn" onClick={onAddReviewClick}>
            Add review
          </button>
        </div>
      </div>
      <h3 className="reviews-title">Reviews</h3>
      {reviews.map((review, index) => (
        <ReviewItem key={`review_${index}`} review={review}></ReviewItem>
      ))}
    </div>
  );
};

ProductReviews.defaultProps = {
  name: '',
  reviews: [],
  onAddReviewClick: () => {},
};
ProductReviews.propTypes = {
  name: PropTypes.string,
  reviews: PropTypes.array,
  onAddReviewClick: PropTypes.func,
};

export default ProductReviews;
