import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostPreview = ({ post, author }) => (
  <article className={post.isLargePreview ? 'post post--full-width' : 'post'}>
    <Link className="image" to={`/blogs/${post.blogId}/posts/${post.id}`}>
      <div className="overlay-border" />
      <img
        srcSet={`https://cdn-images-1.medium.com/max/400/${post.imgDescriptor} 400w,
                 https://cdn-images-1.medium.com/max/600/${post.imgDescriptor} 600w,
                 https://cdn-images-1.medium.com/max/800/${post.imgDescriptor} 800w,`}
        src={`https://cdn-images-1.medium.com/max/800/${post.imgDescriptor}`}
      />
    </Link>
    <div className="text">
      <Link className="text-link" to={`/blogs/${post.blogId}/posts/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{post.subTitle}</p>
      </Link>
      <div className="meta">
        <a className="avatar avatar--small avatar--circled" href="#">
          <img src={author.avatarUrl} />
        </a>
        <div className="sub-meta">
          <a href="#" className="author">{author.fullName}</a>
          <span className="date">{post.date}</span>
        </div>
      </div>
    </div>
  </article>
);

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

export default PostPreview;
