import React from 'react';
import PropTypes from 'prop-types';

const InputFields = ({ inputData, onInputChange, onCheckboxChange }) => {
  const { title, subTitle, previewImgUrl, fullsizeImgUrl, isLargePreview } = inputData;

  return (
    <div className="input-fields">
      <div>
        <input type="text" className="img-url" name="previewImgUrl" placeholder="Preview image url" value={previewImgUrl} onChange={onInputChange} />
      </div>
      <div>
        <input type="text" className="img-url" name="fullsizeImgUrl" placeholder="Fullsize image url" value={fullsizeImgUrl} onChange={onInputChange} />
      </div>
      <div className="is-large-preview">
        <label>
          <input type="checkbox" checked={isLargePreview} onChange={onCheckboxChange} />
          Enable large preview
        </label>
      </div>
      <div>
        <input type="text" className="title" name="title" placeholder="Title" value={title} onChange={onInputChange} />
      </div>
      <div>
        <input type="text" className="subtitle" name="subTitle" placeholder="Subtitle" value={subTitle} onChange={onInputChange} />
      </div>
    </div>
  );
};

InputFields.propTypes = {
  inputData: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default InputFields;

/* eslint object-curly-newline: off */
/* eslint jsx-a11y/label-has-for: off */
