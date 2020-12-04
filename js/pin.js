'use strict';

// Модуль отрисовки пинов по шаблону

(function () {
  window.pin = {
    PIN_SIZE: {
      width: 50,
      height: 68
    },
    renderPin: function (pin) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style = 'left: ' + (pin.location.x - this.PIN_SIZE.width / 2) + 'px; top: ' + (pin.location.y + this.PIN_SIZE.height) + 'px;';

      var pinImage = pinElement.querySelector('img');
      pinImage.src = pin.author.avatar;
      pinImage.alt = pin.offer.title;

      return pinElement;
    }
  };
})();
