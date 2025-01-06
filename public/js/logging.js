const form = document.querySelector("#form");
const message = document.querySelector("#message");
const userNameInput = document.querySelector("#userName");
const passwordInput = document.querySelector("#pwd");

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/authentification/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        const log = await response.json();

        if (response.ok) {
            message.innerHTML = `<i class="bi bi-check-circle me-2"></i>${log.message}`;
            message.className = "alert alert-success d-flex justify-content-center align-items-center fade show login-success";
            setTimeout(() => {
                window.location.href = './welcom.html';
            }, 1000);
        } else {
            message.innerHTML = `<i class="bi bi-x-circle me-2"></i>${log.message}`;
            message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show login-error";
        }

    } catch (error) {
        message.innerHTML = `<i class="bi bi-exclamation-triangle me-2"></i>Une erreur est survenue. Veuillez réessayer.`;
        message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show login-error";
    }
});

const clearMessageOnEmptyFields = () => {
    if (userNameInput.value.trim() === "" || passwordInput.value.trim() === "") {
        message.textContent = "";
        message.className = "";
    }
};

userNameInput.addEventListener('input', clearMessageOnEmptyFields);
passwordInput.addEventListener('input', clearMessageOnEmptyFields);
