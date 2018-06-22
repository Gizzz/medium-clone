import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MediumEditor from 'medium-editor';

import Spinner from '../../shared/Spinner';

class PostEditScreen extends React.Component {
  state = {
    isDataLoaded: false,
    title: '',
    subTitle: '',
    previewImgUrl: '',
    fullsizeImgUrl: '',
  }

  componentDidUpdate() {
    if (!this.props.data || this.state.isDataLoaded) {
      return;
    }

    this.editor = new MediumEditor('.js-editable', {
      targetBlank: true,
      toolbar: {
        buttons: [
          'bold', 'italic', 'underline', 'anchor', 'h3', 'h4',
          {
            name: 'unorderedlist',
            contentDefault: '<b>UL</b>',
          },
          {
            name: 'orderedlist',
            contentDefault: '<b>OL</b>',
          },
          'quote',
          {
            name: 'pre',
            action: 'append-pre',
            tagNames: ['pre'],
            contentDefault: 'PRE',
          },
          {
            name: 'strikethrough',
            action: 'strikethrough',
            tagNames: ['strike'],
            contentDefault: 'CODE',
          },
        ],
      },
      placeholder: {
        text: 'Tell your story...',
        hideOnClick: false,
      },
    });

    const { post } = this.props.data;

    this.setState({
      isDataLoaded: true,
      title: post.title,
      subTitle: post.subTitle,
      previewImgUrl: post.previewImgUrl,
      fullsizeImgUrl: post.fullsizeImgUrl,
    });
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSaveBtnClick = () => {
    const { post } = this.props.data;

    fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        subTitle: this.state.subTitle,
        previewImgUrl: this.state.previewImgUrl,
        fullsizeImgUrl: this.state.fullsizeImgUrl,
        contentMarkup: document.querySelector('.js-editable').innerHTML,
      }),
    })
      .then(() => { this.props.onSave(); });
  }

  render() {
    if (!this.props.data) {
      return (<Spinner />);
    }

    const { post, author } = this.props.data;

    return (
      <main className="post-edit">
        <div className="post-meta">
          <div className="user-info">
            <a className="avatar avatar--middle avatar--circled" href="#">
              <img src={author.avatarUrl} />
            </a>
            <a href="#" className="author">{author.fullName}</a>
          </div>
          <div className="post-actions">
            <button className="btn" onClick={this.handleSaveBtnClick}>Save</button>
            <Link className="cancel" to={`/blogs/${post.blogId}/posts/${post.id}`}>Cancel</Link>
          </div>
          <div className="input-fields">
            <div>
              <input className="img-url" name="previewImgUrl" placeholder="Preview image url" value={this.state.previewImgUrl} onChange={this.handleInputChange} />
            </div>
            <div>
              <input className="img-url" name="fullsizeImgUrl" placeholder="Fullsize image url" value={this.state.fullsizeImgUrl} onChange={this.handleInputChange} />
            </div>
            <div>
              <input className="title" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
            </div>
            <div>
              <input className="subtitle" name="subTitle" placeholder="Subtitle" value={this.state.subTitle} onChange={this.handleInputChange} />
            </div>
          </div>
        </div>
        <div className="post-text js-editable" dangerouslySetInnerHTML={{ __html: post.contentMarkup }} />
      </main>
    );
  }
}

PostEditScreen.defaultProps = {
  data: null,
};

PostEditScreen.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default PostEditScreen;

/* eslint max-len: off */
/* eslint react/no-danger: off */
/* eslint react/no-did-update-set-state: off */
/* eslint jsx-a11y/label-has-for: off */
