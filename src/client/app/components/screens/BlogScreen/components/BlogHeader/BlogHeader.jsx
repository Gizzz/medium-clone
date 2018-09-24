import React from 'react';
import PropTypes from 'prop-types';

import styles from './BlogHeader.module.scss';

const BlogHeader = ({ name, description }) => {
  const windowWidth = window.innerWidth;
  const dpr = window.devicePixelRatio;
  let imgWidth;

  if (dpr <= 1) {
    imgWidth =
      windowWidth < 400 ? 400 :
        windowWidth < 600 ? 600 :
          windowWidth < 800 ? 800 :
            windowWidth < 1200 ? 1200 :
              windowWidth < 1600 ? 1600 :
                2000;
  } else {
    imgWidth =
      windowWidth < 400 ? 800 :
        windowWidth < 600 ? 1200 :
          windowWidth < 800 ? 1600 :
            windowWidth < 1200 ? 2400 :
              windowWidth < 1600 ? 3200 :
                4000;
  }

  return (
    <div className={styles['blog-header']} style={{ backgroundImage: `url(https://cdn-images-1.medium.com/max/${imgWidth}/1*JVwi6UU_AJzhMkp1kMVc7A.jpeg)` }}>
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <div className={styles.text}>
          <h1 className={styles.name}>{name}</h1>
          <h2 className={styles.description}>{description}</h2>
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
