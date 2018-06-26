import React from 'react';
import PropTypes from 'prop-types';

const BlogHeader = ({ name, description }) => {
  const windowWidth = window.innerWidth;
  const imgWidth =
    windowWidth < 400 ? 400 :
      windowWidth < 600 ? 600 :
        windowWidth < 800 ? 800 :
          windowWidth < 1200 ? 1200 :
            windowWidth < 1600 ? 1600 :
              2000;

  return (
    <div className="blog-header" style={{ backgroundImage: `url(https://cdn-images-1.medium.com/max/${imgWidth}/1*JVwi6UU_AJzhMkp1kMVc7A.jpeg)` }}>
      <div className="overlay" />
      <div className="inner">
        <div className="text">
          <h1 className="name">{name}</h1>
          <h2 className="description">{description}</h2>
        </div>
      </div>
    </div>
  );
};

BlogHeader.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BlogHeader;

/* eslint no-nested-ternary: off */
