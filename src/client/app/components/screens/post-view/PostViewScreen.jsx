import React from 'react';

import PreContent from '../../shared/PreContent';
import PostHeader from './components/PostHeader';
import PostImage from './components/PostImage';
import PostText from './components/PostText';

import data from './data';

const PostViewScreen = () => (
  <main className="blog-post">
    <PreContent />
    <article>
      <PostHeader post={data.post} author={data.user} />
      <section className="content">
        <PostImage post={data.post} />
        <PostText post={data.post} />
      </section>
      <footer />
    </article>
  </main>
);

export default PostViewScreen;
