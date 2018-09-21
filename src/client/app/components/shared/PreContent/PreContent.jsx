import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './PreContent.module.scss';

const PreContent = ({ withoutBottomLine }) => (
  <div className={styles['pre-content']}>
    <div className={withoutBottomLine ? `${styles.inner} ${styles['inner--without-bottom-line']}` : styles.inner}>
      <div className={styles.links}>
        <Link to="/blogs/1">HOME</Link>
        <span className={styles.devider} />
        <a href="https://kentcdodds.com/links/" target="_blank" rel="noopener noreferrer">FIND KENT AROUND THE WEB</a>
      </div>
      <div className={styles.actions}>
        <a className={styles.search} href="#">search</a>
        <a className={`link-icon ${styles.twitter}`} href="https://twitter.com/kentcdodds" target="_blank" rel="noopener noreferrer">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <path d="M21.725 5.338c-.744.47-1.605.804-2.513 1.006a3.978 3.978 0 0 0-2.942-1.293c-2.22 0-4.02 1.81-4.02 4.02 0 .32.034.63.07.94-3.31-.18-6.27-1.78-8.255-4.23a4.544 4.544 0 0 0-.574 2.01c.04 1.43.74 2.66 1.8 3.38-.63-.01-1.25-.19-1.79-.5v.08c0 1.93 1.38 3.56 3.23 3.95-.34.07-.7.12-1.07.14-.25-.02-.5-.04-.72-.07.49 1.58 1.97 2.74 3.74 2.8a8.49 8.49 0 0 1-5.02 1.72c-.3-.03-.62-.04-.93-.07A11.447 11.447 0 0 0 8.88 21c7.386 0 11.43-6.13 11.414-11.414.015-.21.01-.38 0-.578a7.604 7.604 0 0 0 2.01-2.08 7.27 7.27 0 0 1-2.297.645 3.856 3.856 0 0 0 1.72-2.23" />
          </svg>
        </a>
        <button className="btn btn--smallest">Follow</button>
      </div>
    </div>
  </div>
);

PreContent.defaultProps = {
  withoutBottomLine: false,
};

PreContent.propTypes = {
  withoutBottomLine: PropTypes.bool,
};

export default PreContent;
