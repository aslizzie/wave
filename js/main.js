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

  const favoriteButtons = document.querySelectorAll(".btn-outline-secondary");

  let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || {};

  favoriteButtons.forEach(function (favoriteButton) {
    favoriteButton.addEventListener("click", function () {
      const movieTitle = favoriteButton.closest(".carousel-item").querySelector("h4").textContent.trim();
      const movieImageUrl = favoriteButton.closest(".carousel-item").querySelector("img").getAttribute("data-poster");
      const movieUrl = favoriteButton.closest(".carousel-item").querySelector("img").getAttribute("data-url");

      if (favoriteButton.classList.contains("favorite")) {
        favoriteButton.classList.remove("favorite");
        delete favoriteMovies[movieTitle];
      } else {
        favoriteButton.classList.add("favorite");
        favoriteMovies[movieTitle] = {
          isFavorite: true,
          imageUrl: movieImageUrl,
          url: movieUrl
        };
      }

      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    });

    const movieTitle = favoriteButton.closest(".carousel-item").querySelector("h4").textContent.trim();
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
      divFavorites.innerHTML = "<div class='w-100 my-5'> <h5 class='text-center'>¡No hay nada aquí... todavía!</h5> <h5 class='text-center fw-light'>Añade tus películas y series favoritas y vuelve a disfrutar de ellas una y otra vez. Ve al <a class='fs-5' href='/home.html'> inicio</a> para ver todo nuestro contenido.</h5> </div>";
    }
  }

  const navLinks = document.querySelectorAll(".nav_link, .menu-option");
  const currentPath = window.location.pathname;

  navLinks.forEach(function (navLink) {
    if (navLink.getAttribute("href") === currentPath) {
      navLink.classList.add("active");
    }
  });

  if (currentPath === "/favorites.html" || currentPath === "/series.html" || currentPath === "/movies.html") {
  } else {
    window.addEventListener("scroll", function () {
      const header = document.querySelector('.header');
      if (window.scrollY > 300) {
        header.classList.add("solid");
      } else {
        header.classList.remove("solid");
      }
    });
  }
});


