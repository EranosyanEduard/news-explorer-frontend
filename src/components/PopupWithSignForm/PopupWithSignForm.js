import React from 'react';
import PopupWithBox from '../PopupWithBox/PopupWithBox';
import SignForm from '../SignForm/SignForm';

function PopupWithSignForm({ formID, onSubmit, ...others }) {
  const inputs = [
    {
      error: 'Неправильный формат email',
      inputID: `${formID}-form-email-input`,
      label: 'Email',
      placeholder: 'Введите почту',
      type: 'email'
    },
    {
      inputID: `${formID}-form-password-input`,
      label: 'Пароль',
      placeholder: 'Введите пароль',
      type: 'password'
    },
    {
      inputID: `${formID}-form-name-input`,
      label: 'Имя',
      placeholder: 'Введите свое имя',
      type: 'text'
    }
  ];

  const [signFormProps, redirectButtonContent] = {
    'sign-in': [
      {
        buttonContent: 'Войти',
        inputs: inputs.slice(0, 2),
        legend: 'Вход',
        onSubmit
      },
      'Зарегистрироваться'
    ],
    'sign-up': [
      {
        buttonContent: 'Зарегистрироваться',
        formSubmitError: 'Такой пользователь уже есть',
        inputs,
        legend: 'Регистрация',
        onSubmit
      },
      'Войти'
    ]
  }[formID];

  return (
    <PopupWithBox
      content={<SignForm {...signFormProps} />}
      contentID="sign-form"
      hasAnimation={true}
      redirectButtonContent={redirectButtonContent}
      theme="light"
      {...others}
    />
  );
}

export default PopupWithSignForm;
