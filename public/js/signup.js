const form = document.querySelector("#form");
const message = document.querySelector("#message");
const userNameInput = document.querySelector("#userName");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#pwd");
const confirmPasswordInput = document.querySelector("#confirmPwd");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!emailRegex.test(data.email)) {
        message.innerHTML = `<i class="bi bi-exclamation-circle me-2"></i>Adresse email invalide.`;
        message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show signup-error";
        emailInput.focus();
        return;
    }

    if (!passwordRegex.test(data.password)) {
        message.innerHTML = `<i class="bi bi-exclamation-circle me-2"></i>Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.`;
        message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show signup-error";
        passwordInput.focus();
        return;
    }

    if (data.password !== data.confirmPassword) {
        message.innerHTML = `<i class="bi bi-exclamation-circle me-2"></i>Les mots de passe ne correspondent pas.`;
        message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show signup-error";
        confirmPasswordInput.value = "";
        confirmPasswordInput.focus();
        return;
    }

    try {
        const response = await fetch('/api/authentification/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const log = await response.json();

        if (response.ok) {
            message.innerHTML = `<i class="bi bi-check-circle me-2"></i>${log.message}`;
            message.className = "alert alert-success d-flex justify-content-center align-items-center fade show signup-success";
        } else {
            message.innerHTML = `<i class="bi bi-x-circle me-2"></i>${log.message}`;
            message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show signup-error";
        }
    } catch (error) {
        message.innerHTML = `<i class="bi bi-exclamation-triangle me-2"></i>Une erreur est survenue. Veuillez réessayer.`;
        message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show signup-error";
    }
});

const clearMessageOnEmptyFields = () => {
    if (
        userNameInput.value.trim() === "" ||
        passwordInput.value.trim() === "" ||
        confirmPasswordInput.value.trim() === "" ||
        emailInput.value.trim() === ""
    ) {
        message.textContent = "";
        message.className = "text-center mt-3";
    }
};

userNameInput.addEventListener('input', clearMessageOnEmptyFields);
passwordInput.addEventListener('input', clearMessageOnEmptyFields);
confirmPasswordInput.addEventListener('input', clearMessageOnEmptyFields);
emailInput.addEventListener('input', clearMessageOnEmptyFields);
