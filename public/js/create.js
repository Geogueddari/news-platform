const articleForm = document.getElementById('articleForm');
const message =  document.getElementById('message');

articleForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(articleForm);
    const data = Object.fromEntries(formData.entries());

    data.userId = 1;

    try {
        const response = await fetch('/api/news/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
            message.textContent = 'Article créé avec succès !';
            message.className = 'alert alert-success create-success';
            message.style.display = 'block';
            setTimeout(() => {
                window.location.href = './index.html';
            }, 1000);
        } else {
            message.textContent = `Erreur : ${result.message || 'Impossible de créer l\'article.'}`;
            message.className = 'alert alert-danger create-error';
            message.style.display = 'block';
        }
        
    } catch (error) {
        message.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        message.className = 'alert alert-danger create-error';
        message.style.display = 'block';
    }
});