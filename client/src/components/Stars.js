import React from 'react';
import PropTypes from 'prop-types';

const Stars = ({ value, editable, onClick }) => {
  const rates = [5, 4, 3, 2, 1];
  // const rates = [1, 2, 3, 4, 5];
  return (
    <div className={`rating ${editable ? '' : 'disabled'}`}>
      {rates.map((rate, index) => (
        <span
          data-value={rate}
          data-valug={value}
          key={`starts_key_${index}`}
          className={`star ${value >= rate ? 'active' : ''}`}
        >
          <svg fill="fill" viewBox="0 0 24 24" className="star-icon">
            <path
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </span>
      ))}
    </div>
  );
};

Stars.defaultProps = {
  value: 0,
  editable: false,
  onClick: () => {},
};
Stars.propTypes = {
  value: PropTypes.number,
  editable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Stars;
