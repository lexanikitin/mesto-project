export default function enableValidation({
                                           formSelector,
                                           inputSelector,
                                           submitButtonSelector,
                                           inactiveButtonClass,
                                           inputErrorClass,
                                           errorClass
                                         }) {


// скрытие сообщения о невалидности поля
  function hideErrorMessage(inputItem) {
    inputItem.classList.remove(inputErrorClass);
    const errorSpan = inputItem.closest(formSelector).querySelector(`.${inputItem.id}-error`);
    errorSpan.textContent = '';
    errorSpan.classList.remove(errorClass);
  }

// отображение сообщения о невалидности поля
  function showErrorMessage(inputItem) {
    inputItem.classList.add(inputErrorClass);
    const errorSpan = inputItem.closest(formSelector).querySelector(`.${inputItem.id}-error`);
    errorSpan.textContent = inputItem.validationMessage;
    errorSpan.classList.add(errorClass);
  }

// проверка валидности поля ввода
  function checkInputValid(inputItem) {
    if (inputItem.validity.patternMismatch) {
      inputItem.setCustomValidity(inputItem.dataset.errorMessage)
    } else {
      inputItem.setCustomValidity("");
    }
    if (!inputItem.validity.valid) {
      showErrorMessage(inputItem);
    } else {
      hideErrorMessage(inputItem);
    }
  }

// переключение состояния кнопки submit от состояния полей ввода
  function toggleSubmitButtonState(buttonItem, inputList) {
    if (inputList.some((inputItem) => {
      return !inputItem.validity.valid
    })) {
      buttonItem.classList.add(inactiveButtonClass);
      buttonItem.setAttribute('disabled', 'disabled');
    } else {
      buttonItem.classList.remove(inactiveButtonClass);
      buttonItem.removeAttribute('disabled');
    }
  }

  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formItem) => {
    const inputs = Array.from(formItem.querySelectorAll(inputSelector));
    const submitButton = formItem.querySelector(submitButtonSelector);
    toggleSubmitButtonState(submitButton, inputs);
    formItem.addEventListener('reset', ()=>{
      setTimeout(()=>{
        toggleSubmitButtonState(submitButton, inputs);
      }, 0);
    });
    inputs.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        checkInputValid(inputItem);
        toggleSubmitButtonState(submitButton, inputs);
      })

    })
  })
}
