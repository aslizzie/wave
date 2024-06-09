document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, bodyId, headerId, collapseCategories, collapseProfile) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId),
      collapsableCategories = document.getElementById(collapseCategories),
      collapsableProfile = document.getElementById(collapseProfile);

    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("show");
        toggle.classList.toggle("bx-x");
        bodypd.classList.toggle("body-pd");
        headerpd.classList.toggle("body-pd");

        if (nav.classList.contains("show")) {
          toggle.src = "/img/logos/logo-no-background.png";
          collapsableCategories.classList.remove("d-none");
          collapsableProfile.classList.remove("d-none");
        } else {
          toggle.src = "/img/logos/icon.png";
          collapsableCategories.classList.add("d-none");
          collapsableProfile.classList.add("d-none");
        }
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "body-pd", "header", "collapseCategories", "collapseProfile");

  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }

  linkColor.forEach((l) => l.addEventListener("click", colorLink));

  const favoriteButtons = document.querySelectorAll(".btn-outline-secondary");

  let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || {};

  favoriteButtons.forEach(function (favoriteButton) {
    favoriteButton.addEventListener("click", function () {
      const movieTitle = favoriteButton.closest(".carousel-item").querySelector("h4").textContent;
      const movieImageUrl = favoriteButton.closest(".carousel-item").querySelector("img").getAttribute("data-poster");

      if (favoriteButton.classList.contains("favorite")) {
        favoriteButton.classList.remove("favorite");
        delete favoriteMovies[movieTitle];
      } else {
        favoriteButton.classList.add("favorite");
        favoriteMovies[movieTitle] = {
          isFavorite: true,
          imageUrl: movieImageUrl
        };
      }

      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    });

    const movieTitle = favoriteButton.closest(".carousel-item").querySelector("h4").textContent;
    if (favoriteMovies[movieTitle] && favoriteMovies[movieTitle].isFavorite) {
      favoriteButton.classList.add("favorite");
    }
  });

  const divFavorites = document.getElementById("favoritesMovies");
  if (divFavorites) {
    const localStorageContent = localStorage.getItem("favoriteMovies");

    if (localStorageContent) {
      const favoriteMovies = JSON.parse(localStorageContent);

      let htmlContent = "";
      for (const movieTitle in favoriteMovies) {
        const movie = favoriteMovies[movieTitle];
        htmlContent += `
            <div class="carousel-cell position-relative">
                <a href="${movie.url}">
                    <div class="opacity-carousel"></div>
                    <img src="${movie.imageUrl}" alt="" srcset="">
                </a>
            </div>`;
      }

      divFavorites.innerHTML = htmlContent;

    } else {
      divFavorites.innerHTML = "<p>No hay datos en el localStorage.</p>";
    }
  }

});


