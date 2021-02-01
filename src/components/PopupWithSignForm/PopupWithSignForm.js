import React from 'react';
import PopupWithBox from '../PopupWithBox/PopupWithBox';
import SignForm from '../SignForm/SignForm';

function PopupWithSignForm({ formID, isOpen, onSubmit, ...others }) {
  const inputs = [
    {
      error: 'Неправильный формат email',
      id: `${formID}-form-email-input`,
      label: 'Email',
      name: 'email',
      placeholder: 'Введите почту',
      type: 'email'
    },
    {
      error: 'Заполните данное поле ввода',
      id: `${formID}-form-password-input`,
      label: 'Пароль',
      name: 'password',
      placeholder: 'Введите пароль',
      type: 'password'
    },
    {
      error: 'Заполните данное поле ввода',
      id: `${formID}-form-name-input`,
      label: 'Имя',
      name: 'name',
      placeholder: 'Введите свое имя',
      type: 'text'
    }
  ];

  const [signFormProps, redirectButtonContent] = {
    'sign-in': [
      {
        buttonContent: 'Войти',
        formError: 'Недопустимое значение учетных данных',
        inputs: inputs.slice(0, 2),
        isOpen,
        legend: 'Вход',
        onSubmit
      },
      'Зарегистрироваться'
    ],
    'sign-up': [
      {
        buttonContent: 'Зарегистрироваться',
        formError: 'Такой пользователь уже есть',
        inputs,
        isOpen,
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
      isOpen={isOpen}
      redirectButtonContent={redirectButtonContent}
      theme="light"
      {...others}
    />
  );
}

export default PopupWithSignForm;
