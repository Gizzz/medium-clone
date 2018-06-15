import React from 'react';

import BlogHeader from './components/BlogHeader';
import PreContent from './components/PreContent';
import PostPreview from './components/PostPreview';
import Footing from './components/Footing';

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
