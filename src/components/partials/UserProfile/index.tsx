/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import {
  fetchUsers,
  selectStatus,
  selectUserById,
  updateUser,
} from '../../../store/slices/user.slice';
import { RootState } from '../../../store';

import { ERequestStatus } from '../../../common/request';

import IUser from '../../../types/IUser';
import './style.scss';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => selectUserById(state, Number(userId)));
  const usersStatus = useAppSelector(selectStatus);

  const [formData, setFormData] = useState<IUser | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (usersStatus === ERequestStatus.IDLE) {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  const validate = () => {
    if (!formData) return false;
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Имя не может быть пустым';
    if (!formData.username.trim()) newErrors.username = 'Никнейм не может быть пустым';
    if (!formData.email.trim()) newErrors.email = 'Почта не может быть пустой';
    if (!formData.address.city.trim()) newErrors.city = 'Город не может быть пустым';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон не может быть пустым';
    if (!formData.company.name.trim()) newErrors.company = 'Название компании не может быть пустым';

    setErrors(newErrors);

    console.log(Object.keys(newErrors).length === 0);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { value } = e.target;

    setFormData({
      ...formData,
      company: {
        ...formData.company,
        name: value,
      },
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { value } = e.target;

    setFormData({
      ...formData,
      address: {
        ...formData.address,
        city: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && formData.id && validate()) {
      dispatch(updateUser({ ...formData }));
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  if (usersStatus === ERequestStatus.LOADING || !formData) {
    return <div>Загрузка данных пользователя...</div>;
  }

  return (
    <>
      <nav className="head-nav">
        <button className="head-nav__button" aria-label="head-nav__button" onClick={handleGoBack}>
          Назад
        </button>
      </nav>
      <div className="user-profile">
        <div className="user-profile__sidebar">
          <img src={formData.avatar} alt="User avatar" className="user-profile__avatar" />
          <div className="user-profile__menu">
            <div className="user-profile__menu-item user-profile__menu-item--active">
              Данные профиля
            </div>
            <div className="user-profile__menu-item">Рабочее пространство</div>
            <div className="user-profile__menu-item">Приватность</div>
            <div className="user-profile__menu-item">Безопасность</div>
          </div>
        </div>

        <div className="user-profile__content">
          <h2 className="user-profile__title">Данные профиля</h2>
          <form className="user-profile__form" onSubmit={handleSubmit}>
            <div className="user-profile__form-group">
              <label className="user-profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className="user-profile__input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="user-profile__form-group">
              <label className="user-profile__label" htmlFor="username">
                Никнейм
              </label>
              <input
                className="user-profile__input"
                type="text"
                id="nickname"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>

            <div className="user-profile__form-group">
              <label className="user-profile__label" htmlFor="email">
                Почта
              </label>
              <input
                className="user-profile__input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="user-profile__form-group">
              <label className="user-profile__label" htmlFor="city">
                Город
              </label>
              <input
                className="user-profile__input"
                type="text"
                id="city"
                name="city"
                value={formData.address.city}
                onChange={handleCityChange}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>

            <div className="user-profile__form-group">
              <label className="user-profile__label" htmlFor="phone">
                Телефон
              </label>
              <input
                className="user-profile__input"
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="user-profile__form-group">
              <label className="user-profile__label" htmlFor="company">
                Название компании
              </label>
              <input
                className="user-profile__input"
                type="text"
                id="company"
                name="company"
                value={formData.company.name}
                onChange={handleCompanyChange}
              />
              {errors.company && <span className="error">{errors.company}</span>}
            </div>

            <button className="user-profile__submit-button" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
