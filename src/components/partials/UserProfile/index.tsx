import React, { useState, ChangeEvent, FormEvent } from 'react';
import './style.css';

interface Profile {
  name: string;
  nickname: string;
  email: string;
  city: string;
  phone: string;
  company: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: 'Иван',
    nickname: 'Ivan1234',
    email: 'Ivan1234@mail.ru',
    city: 'Санкт-Петербург',
    phone: '8 (999) 111-23-23',
    company: 'AT-WORK',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Логика сохранения профиля
    console.log('Profile saved:', profile);
  };

  return (
    <div className="profile">
      <div className="profile__left-panel">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile__image" />
        <nav className="profile__nav">
          <a href="#profile" className="profile__nav-item">
            Данные профиля
          </a>
          <a href="#workspace" className="profile__nav-item">
            Рабочее пространство
          </a>
          <a href="#privacy" className="profile__nav-item">
            Приватность
          </a>
          <a href="#security" className="profile__nav-item">
            Безопасность
          </a>
        </nav>
      </div>
      <div className="profile__right-panel">
        <h2 className="profile__title">Данные профиля</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          {Object.keys(profile).map((key) => (
            <div key={key} className="profile__field">
              <label htmlFor={key} className="profile__label">
                {key === 'name' && 'Имя'}
                {key === 'nickname' && 'Никнейм'}
                {key === 'email' && 'Почта'}
                {key === 'city' && 'Город'}
                {key === 'phone' && 'Телефон'}
                {key === 'company' && 'Название компании'}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={profile[key as keyof Profile]}
                onChange={handleChange}
                className="profile__input"
              />
            </div>
          ))}
          <button type="submit" className="profile__button">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
