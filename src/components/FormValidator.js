export default class FormValidator {
  constructor({data}, formElement) {
    this.formSelector = data.formSelector;
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;

    this.formElement = formElement;
    this.inputs = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    this.submitButton = this.formElement.querySelector(this.submitButtonSelector);
  }

  enableValidation() {
    this._toggleSubmitButtonState();
    this.formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleSubmitButtonState();
      }, 0);
    });
    this.inputs.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValid(inputItem);
        this._toggleSubmitButtonState();
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

  _toggleSubmitButtonState() {
    if (this.inputs.some((inputItem) => {
      return !inputItem.validity.valid
    })) {
      this.submitButton.classList.add(this.inactiveButtonClass);
      this.submitButton.setAttribute('disabled', 'disabled');
    } else {
      this.submitButton.classList.remove(this.inactiveButtonClass);
      this.submitButton.removeAttribute('disabled');
    }
  }
}
