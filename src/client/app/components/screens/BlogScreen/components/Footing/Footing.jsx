import React from 'react';
import styles from './Footing.module.scss';

const Footing = () => (
  <div className={styles.footing}>
    <div className={styles.inner}>
      <nav>
        <ul>
          <li><a target="_blank" rel="noopener noreferrer" href="https://blog.kentcdodds.com/about">About kentcdodds</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://blog.kentcdodds.com/latest">Latest Stories</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://blog.kentcdodds.com/archive">Archive</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://about.medium.com/">About Medium</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://medium.com/policy/9db0094a1e0f">Terms</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://medium.com/policy/f03bf92035c9">Privacy</a></li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Footing;
