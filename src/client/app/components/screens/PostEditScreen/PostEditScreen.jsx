import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MediumEditor from 'medium-editor';

import Spinner from '../../shared/Spinner';
import InputFields from './components/InputFields';

import styles from './PostEditScreen.module.scss';
import postTextStyles from '../../shared/PostText/PostText.module.scss';

class PostEditScreen extends React.Component {
  state = {
    isDataLoaded: false,
    formData: {
      title: '',
      subTitle: '',
      imgDescriptor: '',
      isLargePreview: false,
    },
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
      formData: {
        title: post.title,
        subTitle: post.subTitle,
        imgDescriptor: post.imgDescriptor,
        isLargePreview: post.isLargePreview,
      },
    });
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  handleInputChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  }

  handleCheckboxChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        isLargePreview: e.target.checked,
      },
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
        ...this.state.formData,
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
    const inputData = { ...this.state.formData };

    return (
      <main>
        <div className={styles['post-meta']}>
          <div className={styles['user-info']}>
            <a className="avatar avatar--middle avatar--circled" href="#">
              <img src={author.avatarUrl} />
            </a>
            <a className={styles.author} href="#">{author.username}</a>
          </div>
          <InputFields
            inputData={inputData}
            onInputChange={this.handleInputChange}
            onCheckboxChange={this.handleCheckboxChange}
          />
        </div>
        <div className={`${postTextStyles['post-text']} js-editable`} dangerouslySetInnerHTML={{ __html: post.contentMarkup }} />
        <div className={styles['post-actions']}>
          <button className="btn" onClick={this.handleSaveBtnClick}>Save</button>
          <Link className={styles.cancel} to={`/blogs/${post.blogId}/posts/${post.id}`}>Cancel</Link>
        </div>
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
