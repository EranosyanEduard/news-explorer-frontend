import React, { useState } from 'react';
import './SignForm.css';

function SignForm(props) {
  const {
    inputs,
    legend,
    buttonContent,
    formSubmitError = '',
    onSubmit
  } = props;

  const [isVisibleFormError, setIsVisibleFormError] = useState(() => false);

  const errorClasses = ['form__error', 'form__error_active'];
  const formSubmitErrorClassName = isVisibleFormError
    ? errorClasses.join(' ')
    : errorClasses[0];

  return (
    <form className="form" noValidate onSubmit={(evt) => {
      evt.preventDefault();
      onSubmit();
    }}
    >
      <fieldset className="form__fieldset">
        <legend className="form__legend">{legend}</legend>
        {inputs.map(({ error = '', inputID, label, placeholder, type }, index) => (
          <div className="form__box" key={index}>
            <label htmlFor={inputID} className="form__label">{label}</label>
            <input
              type={type}
              id={inputID}
              className="form__input"
              placeholder={placeholder}
            />
            <span className="form__error">{error}</span>
          </div>
        ))}
        <div className="form__box">
          <span className={formSubmitErrorClassName}>{formSubmitError}</span>
          <button type="submit" className="form__button">{buttonContent}</button>
        </div>
      </fieldset>
    </form>
  );
}

export default SignForm;
