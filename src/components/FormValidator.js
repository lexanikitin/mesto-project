export default class FormValidator {
  constructor({data}, formElement) {
    this.formSelector = data.formSelector;
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;

    this.formElement = formElement;
  }

  enableValidation() {
    const inputs = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    const submitButton = this.formElement.querySelector(this.submitButtonSelector);
    this._toggleSubmitButtonState(submitButton, inputs);
    this.formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleSubmitButtonState(submitButton, inputs);
      }, 0);
    });
    inputs.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValid(inputItem);
        this._toggleSubmitButtonState(submitButton, inputs);
      })

    })
  }

  _checkInputValid(inputItem) {
    if (inputItem.validity.patternMismatch) {
      inputItem.setCustomValidity(inputItem.dataset.errorMessage)
    } else {
      inputItem.setCustomValidity("");
    }
    if (!inputItem.validity.valid) {
      this._showErrorMessage(inputItem);
    } else {
      this._hideErrorMessage(inputItem);
    }
  }

  _hideErrorMessage(inputItem) {
    inputItem.classList.remove(this.inputErrorClass);
    const errorSpan = inputItem.closest(this.formSelector).querySelector(`.${inputItem.id}-error`);
    errorSpan.textContent = '';
    errorSpan.classList.remove(this.errorClass);
  }

  _showErrorMessage(inputItem) {
    inputItem.classList.add(this.inputErrorClass);
    const errorSpan = inputItem.closest(this.formSelector).querySelector(`.${inputItem.id}-error`);
    errorSpan.textContent = inputItem.validationMessage;
    errorSpan.classList.add(this.errorClass);
  }

  _toggleSubmitButtonState(buttonItem, inputList) {
    if (inputList.some((inputItem) => {
      return !inputItem.validity.valid
    })) {
      buttonItem.classList.add(this.inactiveButtonClass);
      buttonItem.setAttribute('disabled', 'disabled');
    } else {
      buttonItem.classList.remove(this.inactiveButtonClass);
      buttonItem.removeAttribute('disabled');
    }
  }
}
