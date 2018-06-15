import React from 'react';
import PropTypes from 'prop-types';

const BlogHeader = ({ name, description }) => (
  <div className="blog-header">
    <div className="overlay" />
    <div className="inner">
      <div className="text">
        <h1 className="name">{name}</h1>
        <h2 className="description">{description}</h2>
      </div>
    </div>
  </div>
);

BlogHeader.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BlogHeader;
