import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';

const ReviewModal = ({ onSubmit }) => {
  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState(0);
  return (
    <div className="overlay">
      <h2 className="product-header">What’s your rating?</h2>
      <label className="label">Rating</label>
      <Stars
        editable={true}
        value={rating}
        onClick={(rating) => {
          setRating(rating);
        }}
      ></Stars>
      <label className="label">Review</label>
      <input
        id="review-input"
        onKeyUp={(event) => {
          setText(event.target.value);
        }}
        placeholder="Start typing..."
      />
      <div>
        <button
          className="btn"
          id="submit-review"
          onClick={() => onSubmit(rating, text)}
        >
          Submit review
        </button>
      </div>
    </div>
  );
};

ReviewModal.defaultProps = {
  product: {},
  onClick: () => {},
};
ReviewModal.propTypes = {
  product: PropTypes.object,
  onClick: PropTypes.func,
};

export default ReviewModal;
