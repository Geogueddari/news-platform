const forgotPasswordForm = document.querySelector("#forgotPasswordForm");
const message = document.querySelector("#message");
const emailInput = document.querySelector("#email");

forgotPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(forgotPasswordForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/authentification/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const log = await response.json();

        if (response.ok) {
            message.innerHTML = `<i class="bi bi-check-circle me-2"></i>${log.message}`;
            message.className = "alert alert-success d-flex justify-content-center align-items-center fade show forgot-success";
        } else {
            message.innerHTML = `<i class="bi bi-x-circle me-2"></i>${log.message}`;
            message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show forgot-error";
        }
    } catch (error) {
        message.innerHTML = `<i class="bi bi-exclamation-triangle me-2"></i>Une erreur est survenue. Veuillez réessayer.`;
        message.className = "alert alert-danger d-flex justify-content-center align-items-center fade show forgot-error";
    }
});

const clearMessageOnEmptyField = () => {
    if (emailInput.value.trim() === "") {
        message.textContent = "";
        message.className = "text-center mt-3";
    }
};

emailInput.addEventListener('input', clearMessageOnEmptyField);
