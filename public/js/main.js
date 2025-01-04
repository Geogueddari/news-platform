async function fetchLatestNews() {
  try {
    const response = await fetch("/api/news");
    const data = await response.json();
    if (response.ok) {
      displayNews(data.posts);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Erreur:", error);
    showError(error.message);
  }
}

async function fetchUser(userId) {
  try{
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  }catch(error){
    console.error("Erreur:", error);
  }
}

function displayNews(news) {
  const container = document.getElementById("news-container");
  news.forEach(async (post) => {
    const author = await fetchUser(post.userId);
    container.innerHTML += `
  <div class="col-12 mb-4 card-container">
    <div class="card shadow-lg h-100 ">
      <div class="card-body">
        <!-- Auteur, icône save et menu des trois points -->
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center">
            <img
              src="${author.image}"
              alt="Author"
              class="rounded-circle me-2"
              style="width: 40px; height: 40px;"
            />
            <div>
              <h6 class="mb-0 fw-bold">${author.username}</h6>
              <small class="text-muted"> ${formatDate(new Date())}</small>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-dark btn-sm me-2 save-btn" style="border-radius: 50%;">
              <i class="bi bi-bookmark"></i>
            </button>
            <div class="dropdown">
              <button
                class="btn btn-link text-dark p-0"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-three-dots"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li>
                      <a class="dropdown-item  text-danger d-flex align-items-center" href="#">
                          <i class="bi bi-exclamation-triangle-fill me-2"></i> Signaler
                      </a>
                  </li>
                  <li>
                      <a class="dropdown-item  text-danger d-flex align-items-center" href="#">
                          <i class="bi bi-person-dash-fill me-2"></i> Ne plus suivre
                      </a>
                  </li>
                  <li>
                      <a class="dropdown-item  text-primary d-flex align-items-center" href="#">
                          <i class="bi bi-link-45deg me-2"></i> Copier le lien
                      </a>
                  </li>
                  <li>
                      <a class="dropdown-item d-flex align-items-center" href="#">
                          <i class="bi bi-info-circle me-2"></i>infos
                      </a>
                  </li>
              </ul>

            </div>
          </div>
        </div>
  
        <!-- Titre -->
        <h5 class="card-title text-dark fw-bold">${post.title}</h5>
  
        <!-- Contenu principal -->
        <p class="card-text" style="font-family: 'Arial', sans-serif; font-size: 1rem; line-height: 1.6;">
          ${post.body}
        </p>
          
        <!-- Tags -->
        <div class="mt-3">
          <span class="badge bg-secondary">${post.tags[0]}</span>
          <span class="badge bg-secondary">${post.tags[1]}</span>
          <span class="badge bg-secondary">${post.tags[2]}</span>
        </div>
      </div>
      <p class="card-text mb-3 mx-3" style="font-size:0.8rem; color: #0d6efd;">
          <i class="bi bi-eye"></i> ${post.views} Views
      </p>
      <!-- Footer -->
      <div class="card-footer d-flex justify-content-between align-items-center">
        <div>
          <span class="text-success like-btn fw-bold" style="cursor: pointer;">
            <i class="bi bi-hand-thumbs-up" style="font-weight: bold;"></i> <span>${
              post.reactions.likes
            }</span>
          </span>
          <span class="text-danger ms-3 dislike-btn fw-bold" style="cursor: pointer;">
            <i class="bi bi-hand-thumbs-down" style="font-weight: bold;"></i> <span>${
              post.reactions.dislikes
            }</span>
          </span>
          <span class="text-primary ms-3 comment-btn fw-bold" style="cursor: pointer;">
            <i class="bi bi-chat" style="font-weight: bold;"></i><span> ${15}</span>
          </span>
          <span class="text-warning ms-3 favorite-btn fw-bold" style="cursor: pointer;">
            <i class="bi bi-star" style="font-weight: bold;"></i>
          </span>
        </div>
        <button class="btn btn-info btn-sm read-more-btn text-bold d-flex align-items-center fw-bold">
          <i class="bi bi-share me-2"></i> Share
        </button>
      </div>
    </div>
  </div>
      `;
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const icon = this.querySelector("i");

        if (icon.classList.contains("bi-star")) {
          icon.classList.remove("bi-star");
          icon.classList.add("bi-star-fill");
        } else {
          icon.classList.remove("bi-star-fill");
          icon.classList.add("bi-star");
        }
      });
    });

    document.querySelectorAll(".like-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const icon = this.querySelector("i");
        const dislikeBtn =
          this.closest(".card-footer").querySelector(".dislike-btn i");

        if (this.classList.contains("liked")) {
          this.classList.remove("liked");
          icon.classList.remove("bi-hand-thumbs-up-fill");
          icon.classList.add("bi-hand-thumbs-up");
        } else {
          this.classList.add("liked");
          icon.classList.remove("bi-hand-thumbs-up");
          icon.classList.add("bi-hand-thumbs-up-fill");

          const dislikeParent =
            this.closest(".card-footer").querySelector(".dislike-btn");
          if (dislikeParent.classList.contains("disliked")) {
            dislikeParent.classList.remove("disliked");
            dislikeBtn.classList.remove("bi-hand-thumbs-down-fill");
            dislikeBtn.classList.add("bi-hand-thumbs-down");
          }
        }
      });
    });

    document.querySelectorAll(".dislike-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const icon = this.querySelector("i");
        const likeBtn =
          this.closest(".card-footer").querySelector(".like-btn i");

        if (this.classList.contains("disliked")) {
          this.classList.remove("disliked");
          icon.classList.remove("bi-hand-thumbs-down-fill");
          icon.classList.add("bi-hand-thumbs-down");
        } else {
          this.classList.add("disliked");
          icon.classList.remove("bi-hand-thumbs-down");
          icon.classList.add("bi-hand-thumbs-down-fill");

          const likeParent =
            this.closest(".card-footer").querySelector(".like-btn");
          if (likeParent.classList.contains("liked")) {
            likeParent.classList.remove("liked");
            likeBtn.classList.remove("bi-hand-thumbs-up-fill");
            likeBtn.classList.add("bi-hand-thumbs-up");
          }
        }
      });
    });

    document.querySelectorAll(".comment-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const icon = this.querySelector("i");

        if (this.classList.contains("commented")) {
          this.classList.remove("commented");
          icon.classList.remove("bi-chat-fill");
          icon.classList.add("bi-chat");
        } else {
          this.classList.add("commented");
          icon.classList.remove("bi-chat");
          icon.classList.add("bi-chat-fill");
        }
      });
    });
  });
}

function showError(message) {
  const container = document.getElementById("news-container");

  container.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  container.innerHTML = `
  <div class="alert alert-danger d-flex justify-content-between align-items-center fade show col-11">
      <span style="font-size:30;" class="fw-bold">${message}</span>
      <img src="./assets/error.png" alt="Error Icon"></img>
  </div>
  `;
}

document.addEventListener("DOMContentLoaded", fetchLatestNews);

function formatDate(date) {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
