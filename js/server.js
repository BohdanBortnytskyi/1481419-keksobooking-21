'use strict';

// Модуль взаимодействия c удалённым сервером

(function () {
  const DOWNLOAD_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const UPLOAD_URL = 'https://21.javascript.pages.academy/keksobooking';

  const TIMEOUT_IN_MS = 10000;

  const xhrStatus = {
    success: 200,
    badRequest: 400,
    notFound: 404,
    internatServerError: 500
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
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError('Произошла ошибка скачивания данных с сервера! ' + error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка скачивания данных с сервера!');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', DOWNLOAD_URL);

    xhr.send();
  };

  var onDownloadError = function (message) {
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

    downloadDataFromServer(onSuccess, onDownloadError);
  };

  // Загрузка данных на сервер

  var uploadDataToServer = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === xhrStatus.success) {
        onSuccess(xhr.response);
      } else {
        onUploadError();
      }
    });

    xhr.addEventListener('error', function () {
      onUploadError('Произошла ошибка загрузки данных на сервер');
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  }

  // Сообщение об успешной отправке данных

  var showSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var sucessMessageElement = successMessageTemplate.cloneNode(true);

    document.body.insertAdjacentElement('afterbegin', sucessMessageElement);

    document.addEventListener('keydown', onSuccessMessageEscapePress);

    document.addEventListener('click', hideSuccessMessage);
  }

  var hideSuccessMessage = function () {
    var successMessage = document.querySelector('.success');

    if (successMessage) {
      document.body.removeChild(successMessage);

      document.removeEventListener('keydown', onSuccessMessageEscapePress);

      document.removeEventListener('click', hideSuccessMessage);
    }
  }

  var onSuccessMessageEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      hideSuccessMessage();
    }
  };

  // Сообщение об ошибке отправки данных

  var onUploadError = function () {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);

    var mainSection = document.querySelector('main');
    var errorButton = mainSection.querySelector('.error__button');

    mainSection.insertAdjacentElement('afterbegin', errorMessageElement);

    document.addEventListener('keydown', onErrorMessageErrBtnAndEscapePress);

    document.addEventListener('click', hideErrorMessage);
  };

  var hideErrorMessage = function () {
    var errorMessage = document.querySelector('.error');

    var mainSection = document.querySelector('main');

    if (errorMessage) {
      mainSection.removeChild(errorMessage);

      document.removeEventListener('keydown', onErrorMessageErrBtnAndEscapePress);

      document.removeEventListener('click', hideErrorMessage);
    }
  }

  var onErrorMessageErrBtnAndEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      hideErrorMessage();
    }
  };

  // Отправка данных формы на сервер

  window.setup.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(window.setup.adForm);

    var onSuccess = function () {
      window.resetFormFields();
      window.setup.setPageInactive();
      window.setAddressInputValue();
      showSuccessMessage();
    }

    uploadDataToServer(formData, onSuccess);
  });

})();
