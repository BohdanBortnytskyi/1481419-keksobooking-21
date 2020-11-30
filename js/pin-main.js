'use strict';

// Модуль работы с главной меткой

(function () {

  window.mapPinMain = window.setup.map.querySelector('.map__pin--main');

  // Установка значения поля адреса

  window.setAddressInputValue = function () {
    var addressInput = window.setup.adForm.querySelector('#address');

    var addressX = window.mapPinMain.style.left.replace('px', '');
    var addressY = window.mapPinMain.style.top.replace('px', '');

    if (!window.setup.isPageActive) {
      addressInput.value = (+addressX + window.pin.PIN_SIZE.width / 2) + ', ' + (+addressY + window.pin.PIN_SIZE.width / 2);
    } else {
      addressInput.value = (+addressX + window.pin.PIN_SIZE.width / 2) + ', ' + (+addressY + window.pin.PIN_SIZE.height);
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

        window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
        window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';

        window.setAddressInputValue();
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
