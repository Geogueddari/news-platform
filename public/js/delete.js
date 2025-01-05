const deleteArticleForm = document.getElementById('deleteArticleForm');
const message = document.getElementById('message');

deleteArticleForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(deleteArticleForm);
    const data = Object.fromEntries(formData.entries());

    
    try {
        const response = await fetch(`/api/news/${data.articleId}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            message.textContent = 'Article supprimé avec succès !';
            message.className = 'alert alert-success delete-success';
            message.style.display = 'block';

            // Attendre un peu avant de rediriger vers la liste des articles
            setTimeout(() => {
                window.location.href = './index.html';
            }, 1000);
        } else {
            message.textContent = `Erreur : ${result.message || 'Impossible de supprimer l\'article.'}`;
            message.className = 'alert alert-danger delete-error';
            message.style.display = 'block';
        }
    } catch (error) {
        message.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        message.className = 'alert alert-danger delete-error';
        message.style.display = 'block';
    }
});
