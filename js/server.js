'use strict';

// Модуль взаимодействия c удалённым сервером

(function () {
  const DOWNLOAD_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const UPLOAD_URL = 'https://21.javascript.pages.academy/keksobooking';

  const TIMEOUT_IN_MS = 10000;

  const xhrStatus = {
    success: 200,
    badRequest: 400,
    notFound: 404
  };

  // Скачивание данных с сервера

  var downloadDataFromServer = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case xhrStatus.success:
          onSuccess(xhr.response);
          break;
        case xhrStatus.badRequest:
          error = 'Неверный запрос';
          break;
        case xhrStatus.notFound:
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

    xhr.open('GET', DOWNLOAD_URL);

    xhr.send();
  };

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

  // Отрисовка пинов по данным с сервера

  window.showAdsPins = function () {
    var renderPinsFromServer = function (pinsArrray) {
      var numPins = 0;
      pinsArrray.forEach(function (pin) {
        pin.id = 'pin' + numPins;
        window.setup.adsFragment.appendChild(window.pin.renderPin(pin));
        numPins++;
      });

      var pinsList = document.querySelector('.map__pins');
      pinsList.appendChild(window.setup.adsFragment);
    };

    var onSuccess = function (data) {
      renderPinsFromServer(data);
      window.addPinsClickEnterHandler(data);
    };

    downloadDataFromServer(onSuccess, onError);
  };

  // Загрузка данных на сервер

  var uploadDataToServer = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  }

  // Отправка данных формы

  window.setup.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(window.setup.adForm);

    uploadDataToServer(formData, function () {
      window.resetFormFields();
      window.setup.setPageInactive();
      window.setAddressInputValue();
    });
  });

})();
