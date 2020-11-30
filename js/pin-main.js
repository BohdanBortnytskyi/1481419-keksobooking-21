'use strict';

// Модуль работы с главной меткой

(function () {

  const PIN_MAIN_SIZE = {
      width: 64,
      height: 82
    }

  const PIN_X_MIN = (innerWidth - document.body.clientWidth) / 2 + PIN_MAIN_SIZE.width / 2;
  const PIN_X_MAX = innerWidth - (innerWidth - document.body.clientWidth) / 2 - PIN_MAIN_SIZE.width / 2;
  const PIN_Y_MIN = 130;
  const PIN_Y_MAX = 630;

  window.mapPinMain = window.setup.map.querySelector('.map__pin--main');

  // Установка значения поля адреса

  window.setAddressInputValue = function () {
    var addressInput = window.setup.adForm.querySelector('#address');

    var addressX = window.mapPinMain.style.left.replace('px', '');
    var addressY = window.mapPinMain.style.top.replace('px', '');

    if (!window.setup.isPageActive) {
      addressInput.value = (+addressX + PIN_MAIN_SIZE.width / 2) + ', ' + (+addressY + PIN_MAIN_SIZE.width / 2);
    } else {
      addressInput.value = (+addressX + PIN_MAIN_SIZE.width / 2) + ', ' + (+addressY + PIN_MAIN_SIZE.height);
    }
  };

  var handleMapPinMain = function () {
    window.setup.setPageActive();
    window.setAddressInputValue();
  };

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      handleMapPinMain();
    }
  });

  // Перемещение главной метки

  window.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      handleMapPinMain();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

      if (moveEvt.clientY >= PIN_Y_MIN && moveEvt.clientY <= PIN_Y_MAX && moveEvt.clientX >= PIN_X_MIN && moveEvt.clientX <= PIN_X_MAX) {
          window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
          window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';

          window.setAddressInputValue();
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

})();
