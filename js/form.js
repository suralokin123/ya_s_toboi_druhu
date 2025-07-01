const addButton = document.getElementById('add-object-button');
const addObjectForm = document.getElementById('add-object-form');
const overlay = document.getElementById('overlay');
const contentWrapper = document.querySelector('.content-wrapper');
const closeFormButton = document.getElementById('close-form-button');

addButton.addEventListener('click', function() {
    addObjectForm.style.display = 'block';
    setTimeout(() => {
        addObjectForm.style.opacity = 1;
    }, 10);
    contentWrapper.classList.add('blurred');
    overlay.style.display = 'block';
});

function closeForm() {
    addObjectForm.style.opacity = 0;
    setTimeout(() => {
        addObjectForm.style.display = 'none';
    }, 300);
    contentWrapper.classList.remove('blurred');
    overlay.style.display = 'none';
}

closeFormButton.addEventListener('click', function() {
    closeForm();
});

const form = document.querySelector('.add-objects');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email-input');
    const input1 = document.getElementById('object-name');
    const input2 = document.getElementById('object-description');

    const emailError = document.getElementById('email-error');
    const error1 = document.getElementById('object-name-error');
    const error2 = document.getElementById('object-description-error');

    let isValid = true;

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        isValid = false;
    }

    function hideError(input, errorElement) {
        input.classList.remove('error');
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    }

    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, 'Пожалуйста, введите вашу почту.');
    } else {
        hideError(emailInput, emailError);
    }

    if (input1.value.trim() === '') {
        showError(input1, error1, 'Пожалуйста, введите сообщение.');
    } else {
        hideError(input1, error1);
    }

    if (input2.value.trim() === '') {
        showError(input2, error2, 'Пожалуйста, введите описание объекта.');
    } else {
        hideError(input2, error2);
    }

    if (!isValid) {
        return;
    }

    //  Если нужно отправлять форму, раскомментируйте это
    // form.submit();
});

overlay.removeEventListener('click', function(event) {
    if (event.target === overlay) {
        closeForm();
    }
});