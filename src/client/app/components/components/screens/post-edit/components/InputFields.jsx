import React from 'react';
import PropTypes from 'prop-types';

const InputFields = ({ inputData, onInputChange }) => {
  const { title, subTitle, previewImgUrl, fullsizeImgUrl } = inputData;

  return (
    <div className="input-fields">
      <div>
        <input className="img-url" name="previewImgUrl" placeholder="Preview image url" value={previewImgUrl} onChange={onInputChange} />
      </div>
      <div>
        <input className="img-url" name="fullsizeImgUrl" placeholder="Fullsize image url" value={fullsizeImgUrl} onChange={onInputChange} />
      </div>
      <div>
        <input className="title" name="title" placeholder="Title" value={title} onChange={onInputChange} />
      </div>
      <div>
        <input className="subtitle" name="subTitle" placeholder="Subtitle" value={subTitle} onChange={onInputChange} />
      </div>
    </div>
  );
};

InputFields.propTypes = {
  inputData: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default InputFields;

/* eslint object-curly-newline: off */
