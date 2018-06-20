import React from 'react';
import PropTypes from 'prop-types';
import MediumEditor from 'medium-editor';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

class PostEditScreen extends React.Component {
  componentDidUpdate() {
    if (!this.props.data) {
      return;
    }

    this.editor = new MediumEditor('.js-editable', {
      targetBlank: true,
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h3', 'h4', 'quote'],
      },
    });
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    if (!this.props.data) {
      return (<p>Loading...</p>);
    }

    const { post } = this.props.data;

    return (
      <main className="post-edit">
        <div className="post-meta">
          <div className="user-info">
            <a className="avatar avatar--middle avatar--circled" href="#">
              <img src="https://cdn-images-1.medium.com/fit/c/120/120/1*9ZtET_L1852yXaDZJUo9CQ.png" />
            </a>
            <a href="#" className="author">Kent C. Dodds</a>
          </div>
          <div className="input-fields">
            <div>
              <input className="title" placeholder="Title" />
            </div>
            <div>
              <input className="subtitle" placeholder="Subtitle" />
            </div>
            <div>
              <input className="big-img-url" placeholder="Big image url" />
            </div>
          </div>
        </div>
        <div className="post-text js-editable" dangerouslySetInnerHTML={post.contentMarkup} />
      </main>
    );
  }
}

PostEditScreen.defaultProps = {
  data: null,
};

PostEditScreen.propTypes = {
  data: PropTypes.object,
};

export default PostEditScreen;

/* eslint max-len: off */
/* eslint react/no-danger: off */
/* eslint jsx-a11y/label-has-for: off */
