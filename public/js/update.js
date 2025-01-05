const updateArticleForm = document.getElementById('updateArticleForm');
const message = document.getElementById('message');

updateArticleForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(updateArticleForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`/api/news/${data.articleId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            message.textContent = 'Article modifié avec succès !';
            message.className = 'alert alert-success update-success';
            message.style.display = 'block';

            // Attendre un peu avant de rediriger vers la liste des articles
            setTimeout(() => {
                window.location.href = './index.html';
            }, 1000);
        } else {
            message.textContent = `Erreur : ${result.message || 'Impossible de modifier l\'article.'}`;
            message.className = 'alert alert-danger update-error';
            message.style.display = 'block';
        }
    } catch (error) {
        message.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        message.className = 'alert alert-danger';
        message.style.display = 'block';
    }
});
