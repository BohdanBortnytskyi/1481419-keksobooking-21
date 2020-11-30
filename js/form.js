'use strict';

// Модуль работы с формой

(function () {

  // Валидация полей «Количество комнат» и «Количество мест»

  var roomNumberSelect = window.setup.adForm.querySelector('#room_number');

  var setCapacityOptions = function (roomNumber) {
    var capacitySelectOptions = window.setup.adForm.querySelectorAll('#capacity option');

    var resetCapacityOptions = function () {
      for (var capacitySelectOption of capacitySelectOptions) {
        capacitySelectOption.disabled = false;
      }
    };

    if (roomNumber) {
      if (roomNumber === '1') {
        resetCapacityOptions();
        // capacitySelectOptions[2].selected = true;
        capacitySelectOptions[0].disabled = true;
        capacitySelectOptions[1].disabled = true;
        capacitySelectOptions[3].disabled = true;
      } else if (roomNumber === '2') {
        resetCapacityOptions();
        // capacitySelectOptions[1].selected = true;
        capacitySelectOptions[2].disabled = false;
        capacitySelectOptions[0].disabled = true;
        capacitySelectOptions[3].disabled = true;
      } else if (roomNumber === '3') {
        resetCapacityOptions();
        // capacitySelectOptions[0].selected = true;
        capacitySelectOptions[1].disabled = false;
        capacitySelectOptions[2].disabled = false;
        capacitySelectOptions[3].disabled = true;
      } else if (roomNumber === '100') {
        resetCapacityOptions();
        // capacitySelectOptions[3].selected = true;
        capacitySelectOptions[1].disabled = true;
        capacitySelectOptions[2].disabled = true;
        capacitySelectOptions[0].disabled = true;
      }
    } else {
      setCapacityOptions(roomNumberSelect.value);
    }
  };

  setCapacityOptions();

  roomNumberSelect.addEventListener('change', function (evt) {
    setCapacityOptions(evt.target.value);
  });

  // Валидация полей «Тип жилья» и «Цена за ночь»

  var placeType = window.setup.adForm.querySelector('#type');
  var pricePerNight = window.setup.adForm.querySelector('#price');

  var minPrice;
  var maxPrice = 1000000;

  var setMinPrice = function (placeTypeValue) {
    switch (placeTypeValue) {
      case 'bungalow':
        minPrice = 0;
        break;
      case 'flat':
        minPrice = 1000;
        break;
      case 'house':
        minPrice = 5000;
        break;
      case 'palace':
        minPrice = 10000;
        break;
    }
  };

  placeType.addEventListener('change', function (evt) {
    pricePerNight.value = '';
    setMinPrice(evt.target.value);
  });

  pricePerNight.addEventListener('input', function () {
    if (pricePerNight.value < minPrice) {
      pricePerNight.setCustomValidity('Для этого типа жилья минимальная цена за ночь ' + minPrice + ' руб.');
    } else if (pricePerNight.value > maxPrice) {
      pricePerNight.setCustomValidity('Максимальная цена за ночь ' + maxPrice + ' руб.');
    } else {
      pricePerNight.setCustomValidity('');
    }

    pricePerNight.reportValidity();
  });

  // Валидация полей «Время заезда и выезда»

  var timeIn = window.setup.adForm.querySelector('#timein');
  var timeInOptions = window.setup.adForm.querySelectorAll('#timein option');

  var timeOut = window.setup.adForm.querySelector('#timeout');
  var timeOutOptions = window.setup.adForm.querySelectorAll('#timeout option');

  var setTimeInOption = function (timeOutValue) {
    for (var option of timeInOptions) {
      if (option.value === timeOutValue) {
        option.selected = true;
      }
    }
  };

  var setTimeOutOption = function (timeInValue) {
    for (var option of timeOutOptions) {
      if (option.value === timeInValue) {
        option.selected = true;
      }
    }
  };

  timeIn.addEventListener('change', function (evt) {
    setTimeOutOption(evt.target.value);
  });

  timeOut.addEventListener('change', function (evt) {
    setTimeInOption(evt.target.value);
  });
})();
