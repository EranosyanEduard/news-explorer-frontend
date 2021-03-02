import React, { useEffect, useState } from 'react';
import './SignForm.css';

function SignForm(props) {
  const {
    inputs,
    isOpen,
    legend,
    buttonContent,
    formError = '',
    onSubmit
  } = props;

  const [errorStates, setErrorStates] = useState(() => ({}));
  const [inputValues, setInputValues] = useState(() => ({}));
  const [isDisabledButton, setIsDisabledButton] = useState(() => true);
  const [isVisibleFormError, setIsVisibleFormError] = useState(() => false);

  useEffect(() => {
    setInputValues(() => inputs.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {}));
    setErrorStates(() => inputs.reduce((acc, { name }) => ({ ...acc, [name]: null }), {}));
    setIsDisabledButton(() => true);
    setIsVisibleFormError(() => false);
  }, [inputs, isOpen]);

  // [Functions]
  const handleInputChange = (evt) => {
    // Input props
    const { name, validity, value } = evt.target;
    const isVisibleError = !validity.valid;

    setInputValues((prevState) => ({ ...prevState, [name]: value }));
    setErrorStates((prevState) => ({ ...prevState, [name]: isVisibleError }));
    setIsDisabledButton(() => Object.keys(errorStates).some((inputName) => {
      if (inputName === name) {
        return isVisibleError;
      }
      return errorStates[inputName] !== null ? errorStates[inputName] : true;
    }));
  };

  // [Variables]
  // Define elements class names
  // 0. Submit button
  const buttonClasses = ['form__button', 'form__button_disable'];
  const buttonClassName = isDisabledButton ? buttonClasses.join(' ') : buttonClasses[0];
  // 1. Form error
  const errClasses = ['form__error', 'form__error_visible'];
  const formErrorClassName = isVisibleFormError ? errClasses.join(' ') : errClasses[0];

  return (
    <form className="form" noValidate onSubmit={(evt) => {
      evt.preventDefault();
      onSubmit(inputValues, setIsVisibleFormError);
    }}
    >
      <fieldset className="form__fieldset">
        <legend className="form__legend">{legend}</legend>
        {inputs.map(({ error, id, label, name, placeholder, type }, index) => (
          <div className="form__box" key={index}>
            <label htmlFor={id} className="form__label">{label}</label>
            <input
              type={type}
              id={id}
              className="form__input"
              name={name}
              placeholder={placeholder}
              value={inputValues[name]}
              onChange={handleInputChange}
              required
            />
            <span className={errorStates[name] ? errClasses.join(' ') : errClasses[0]}>
              {error}
            </span>
          </div>
        ))}
        <div className="form__box form__box_with_button">
          <span className={formErrorClassName}>{formError}</span>
          <button type="submit" className={buttonClassName} disabled={isDisabledButton}>
            {buttonContent}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default SignForm;
