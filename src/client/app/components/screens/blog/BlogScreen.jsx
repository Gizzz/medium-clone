import React from 'react';

import BlogHeader from './BlogHeader';
import PreContent from './PreContent';
import PostPreview from './PostPreview';
import Footing from './Footing';

import data from './data';

const BlogScreen = () => (
  <main className="blog-home">
    <BlogHeader name={data.blog.name} description={data.blog.description} />
    <PreContent />
    <div className="posts">
      {
        data.posts.map((post) => (
          <PostPreview post={post} author={data.user} key={post.id} />
        ))
      }
    </div>
    <Footing />
  </main>
);

export default BlogScreen;
