import React from 'react';
import PropTypes from 'prop-types';

const PostImage = ({ post }) => (
  <figure className="post-image">
    <img src={post.fullsizeImgUrl} />
    {/* <figcaption>
      Photo by <a href="#">Simon Caspersen</a> on <a href="#">Unsplash</a>
    </figcaption> */}
  </figure>
);

PostImage.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostImage;
