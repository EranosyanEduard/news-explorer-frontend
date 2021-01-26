import React from 'react';
import './Author.css';
import authorImage from '../../images/author/author.jpg';

const Author = () => (
  <section className="page__area page__area_id_author author">
    <img
      src={authorImage}
      alt="Фотография автора проекта"
      className="author__image"
    />
    <div className="author__info">
      <h2 className="author__text author__text_type_heading">Об авторе</h2>
      <p className="author__text">
        Это блок с описанием автора проекта. Здесь следует указать, как вас
        зовут, чем вы занимаетесь, какими технологиями разработки владеете.
      </p>
      <p className="author__text">
        Также можно рассказать о процессе обучения в Практикуме, чему вы тут
        научились, и чем можете помочь потенциальным заказчикам.
      </p>
    </div>
  </section>
);

export default Author;
