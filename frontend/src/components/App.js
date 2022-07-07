/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { loggedInContext } from '../contexts/loggedInContext'

function App() {
  const history = useHistory()
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState();
  const [userEmail, setUserEmail] = React.useState()
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [openPopupSuccess, setOpenPopupSuccess] = React.useState(false);
  const [success, setSuccess] = React.useState();
  const [login, setLogin] = React.useState(true);

  function switchHeaderLink() {
    setLogin(!login)
  }

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api.usersMe(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email)
            setLoggedIn(!loggedIn);
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  function apiGetUserData() {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function apiGetCards() {
    api
      .getInitialCards()
      .then((d) => {
        const data = d.data;
        data.reverse();
        const cards = data.map((item) => {
          return {
            _id: item._id,
            name: item.name,
            link: item.link,
            likes: item.likes,
            owner: item.owner,
          };
        });
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    tokenCheck();
    if (localStorage.getItem('token')) {
      apiGetUserData();
      apiGetCards();
    }
  }, []);

  function handleEditProfileClick() {
    document.addEventListener("keydown", handleEscClose);
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    document.addEventListener("keydown", handleEscClose);
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    document.addEventListener("keydown", handleEscClose);
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setOpenPopupSuccess(false)
    setSelectedCard(null);
    document.removeEventListener("keydown", handleEscClose);
  }

  function handleCardClick(data) {
    document.addEventListener("keydown", handleEscClose);
    setSelectedCard(data);
  }

  function handleUpdateUser(data) {
    api
      .editDataUser(data)
      .then((data) => {
        closeAllPopups();
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(url) {
    api
      .editAvatarUser(url.avatar)
      .then((data) => {
        closeAllPopups();
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLike(card.id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    api
      .removeCard(cardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard.data, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister(password, email) {
    api.signUp(password, email)
      .then((data) => {
        setOpenPopupSuccess(true)
        setSuccess(true)
        history.push('/sign-in')
      })
      .catch((err) => {
        setOpenPopupSuccess(true)
        setSuccess(false)
        console.log(err);
      });
  }

  function onLogin(password, email) {
    api.signIn(password, email)
      .then((data) => {
        setUserEmail(email)
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        window.location.reload()
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setLogin(true);
    setLoggedIn(false);
    document.querySelector('.elements').innerHTML = '';
    setCards([]);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <loggedInContext.Provider value={loggedIn}>
          <Switch>
            <div className="page">
              <Header
                switchLink={switchHeaderLink}
                onSignOut={onSignOut}
                login={login}
                userEmail={userEmail}
              />
              <ProtectedRoute
                path='/'
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
              />
              <Route>
                {loggedIn && <Redirect to='/' />}
              </Route>
              <Route path='/sign-in'>
                <Login
                  onLogin={onLogin}
                  setLoggedIn={setLoggedIn} />
              </Route>
              <Route path='/sign-up'>
                <Register
                  switchLink={switchHeaderLink}
                  onRegister={onRegister}
                />
              </Route>
              <Footer />
              <InfoTooltip
                isOpen={openPopupSuccess}
                onClose={closeAllPopups}
                success={success} />
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
              />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
            </div>
          </Switch>
        </loggedInContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
