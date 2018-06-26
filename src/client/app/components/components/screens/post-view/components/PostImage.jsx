import React from 'react';
import PropTypes from 'prop-types';

const PostImage = ({ post }) => (
  <figure className="post-image">
    <img
      srcSet={`https://cdn-images-1.medium.com/max/400/${post.imgDescriptor} 400w,
               https://cdn-images-1.medium.com/max/600/${post.imgDescriptor} 600w,
               https://cdn-images-1.medium.com/max/800/${post.imgDescriptor} 800w,
               https://cdn-images-1.medium.com/max/1600/${post.imgDescriptor} 1600w,`}
      src={`https://cdn-images-1.medium.com/max/1600/${post.imgDescriptor}`}
    />
    {/* <figcaption>
      Photo by <a href="#">Simon Caspersen</a> on <a href="#">Unsplash</a>
    </figcaption> */}
  </figure>
);

PostImage.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostImage;
