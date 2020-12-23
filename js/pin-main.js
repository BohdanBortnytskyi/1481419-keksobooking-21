'use strict';

// Модуль работы с главной меткой

(function () {

  window.mapPinMain = window.setup.map.querySelector('.map__pin--main');

  const PIN_MAIN_SIZE = {
    width: 64,
    height: 80
  };

  var page = document.querySelector('.page');

  const PIN_X_MIN = (page.clientWidth - document.body.clientWidth) / 2 + PIN_MAIN_SIZE.width / 2;
  const PIN_X_MAX = page.clientWidth - (page.clientWidth - document.body.clientWidth) / 2 - PIN_MAIN_SIZE.width / 2;

  const PIN_Y_MIN = 130;
  const PIN_Y_MAX = 630;

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
    if (!window.setup.isPageActive) {
      window.setup.setPageActive();
      window.setAddressInputValue();
    }
  };

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      handleMapPinMain();
    }
  });

  // Клик по главной метке и ее перемещение

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
