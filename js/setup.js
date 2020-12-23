'use strict';

// Модуль активации/деактивации страницы

(function () {
  window.setup = {
    map: document.querySelector('.map'),
    mapFilters: document.querySelector('.map__filters-container'),
    mapFiltersForm: document.querySelector('.map__filters'),
    adsFragment: document.createDocumentFragment(),
    adForm: document.querySelector('.ad-form'),
    adFormFieldsets: document.querySelectorAll('.ad-form fieldset'),
    isPageActive: false,
    setPageInactive: function () {
      this.map.classList.add('map--faded');

      this.adForm.classList.add('ad-form--disabled');

      for (var fieldset of this.adFormFieldsets) {
        fieldset.disabled = true;
      }

      for (var filter of this.mapFiltersForm.children) {
        filter.disabled = true;
      }

      this.isPageActive = false;
    },
    setPageActive: function () {
      this.map.classList.remove('map--faded');

      this.adForm.classList.remove('ad-form--disabled');

      for (var fieldset of this.adFormFieldsets) {
        fieldset.disabled = false;
      }

      for (var filter of this.mapFiltersForm.children) {
        filter.disabled = false;
      }

      window.showAdsPins();

      this.isPageActive = true;
    }
  };
})();
