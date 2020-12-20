'use strict';

// Модуль для работы с карточками

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Отрисовка карточки по шаблону

  window.renderCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);

    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardAvatar = cardElement.querySelector('.popup__avatar');

    cardTitle.textContent = ad.offer.title;
    cardAddress.textContent = ad.offer.address;
    cardPrice.textContent = ad.offer.price + '₽/ночь';

    switch (ad.offer.type) {
      case 'flat':
        cardType.textContent = 'Квартира';
        break;
      case 'bungalow':
        cardType.textContent = 'Бунгало';
        break;
      case 'house':
        cardType.textContent = 'Дом';
        break;
      case 'palace':
        cardType.textContent = 'Дворец';
        break;
    }

    cardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkin;

    cardFeatures.innerHTML = '';
    for (var featureSingle of ad.offer.features) {
      cardFeatures.innerHTML += '<li>' + featureSingle + '</li>';
    }

    cardDescription.textContent = ad.offer.description;

    cardPhotos.innerHTML = '';
    for (var photoSingle of ad.offer.photos) {
      cardPhotos.innerHTML += '<img src="' + photoSingle + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    cardAvatar.src = ad.author.avatar;

    return cardElement;
  };

  // Открыть и закрыть карточку объявления

  var openMapCardPopup = function (targetPin, adsArray) {
    for (var ad of adsArray) {
      if (targetPin.alt.includes(ad.offer.title)) {
        var mapCard = window.renderCard(ad);
        var mapCardClose = mapCard.querySelector('.popup__close');
        window.setup.map.insertBefore(mapCard, window.setup.mapFilters);

        mapCardClose.addEventListener('click', function () {
          closeMapCardPopup();
        });

        document.addEventListener('keydown', onMapCardPopupEscapePress);
      }
    }
  };

  var closeMapCardPopup = function () {
    var mapCard = window.setup.map.querySelector('.map__card');
    if (mapCard) {
      window.setup.map.removeChild(mapCard);

      document.removeEventListener('keydown', onMapCardPopupEscapePress);
    }
  };

  window.addPinsClickEnterHandler = function (adsArray) {
    var mapPins = window.setup.map.querySelectorAll('.map__pin');
    mapPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        var targetElement;
        pin.addEventListener('click', function (evt) {
          if (evt.target.classList.contains('map__pin')) {
            targetElement = evt.target.querySelector('img');
          } else {
            targetElement = evt.target;
          }

          var mapCard = window.setup.map.querySelector('.map__card');
          if (mapCard) {
            window.setup.map.removeChild(mapCard);
            openMapCardPopup(targetElement, adsArray);
          } else {
            openMapCardPopup(targetElement, adsArray);
          }
        });
      }
    });
  };

  var onMapCardPopupEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      closeMapCardPopup();
    }
  };
})();
