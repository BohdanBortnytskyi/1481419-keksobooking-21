'use strict';

// Модуль взаимодействия c удалённым сервером

(function () {
  var URL = 'https://21.javascript.pages.academy/keksobooking/data';

  var TIMEOUT_IN_MS = 10000;

  var onError = function (message) {
    var errorNode = document.createElement('div');
    errorNode.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; padding: 5px';
    errorNode.style.position = 'absolute';
    errorNode.style.left = 0;
    errorNode.style.right = 0;
    errorNode.style.fontSize = '17px';

    errorNode.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorNode);
  };

  // Загрузка данных с сервера

  window.uploadDataFromServer = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);

    xhr.send();
  };

  // Отрисовка пинов по данным с сервера

  window.showAdsPins = function () {
    var renderPinsFromServer = function (pinsArrray) {
      for (var i = 0; i < pinsArrray.length; i++) {
        window.setup.adsFragment.appendChild(window.pin.renderPin(pinsArrray[i]));
      }
      var pinsList = document.querySelector('.map__pins');
      pinsList.appendChild(window.setup.adsFragment);
    }

    var onSuccess = function (data) {
      renderPinsFromServer(data);
      window.addPinsClickEnterHandler(data);
    };

    window.uploadDataFromServer(onSuccess, onError);
  };
})();
