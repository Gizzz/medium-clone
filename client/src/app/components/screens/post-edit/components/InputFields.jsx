import React from 'react';
import PropTypes from 'prop-types';

const InputFields = ({ inputData, onInputChange, onCheckboxChange }) => {
  const { title, subTitle, imgDescriptor, isLargePreview } = inputData;

  return (
    <div className="input-fields">
      <div>
        <input type="text" className="img-url" name="imgDescriptor" placeholder="Image descriptor for url" value={imgDescriptor} onChange={onInputChange} />
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
