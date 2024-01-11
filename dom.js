//obter dados
const getAnimeData = () => {
  return fetch("https://api.jikan.moe/v4/top/anime")
    .then((response) => response.json())
    .catch((err) => console.log("rejected,", err));
};
//filtrar pela lista de animes com score maior de 9
const getScoreHigherThanNine = () => {
  getAnimeData()
    .then((result) => {
      const score = result.data.filter((anime) => anime.score >= 9);
      console.log(score);
      getMain(score);
    })
    .catch((error) => alert(error));
};

//Cria um container para cada anime
const getMain = (animeFilter) => {
  const main = document.createElement("main");
  main.classList.add("main");
  document.body.prepend(main);

  const grid = document.createElement("div");
  grid.classList.add("grid");
  main.append(grid);

  //div para mostrar o anime na parte lateral
  const animeDiv = document.createElement("div");
  animeDiv.classList.add("animeDiv");
  main.append(animeDiv);

  animeFilter.forEach((anime) => {
    //Criação da grid com todas as imagens
    const container = document.createElement("div");
    container.classList.add("container");
    grid.append(container);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-wrapper");
    container.append(imgContainer);

    const animeImg = document.createElement("img");
    const images = anime.images.jpg.large_image_url;
    animeImg.classList.add("img--grid");
    animeImg.src = images;
    imgContainer.append(animeImg);

    const toggleAddClass = () => {
      container.addEventListener("click", () => {
        // Remove a classe 'active' de todos os containers
        document.querySelectorAll(".container").forEach((container) => {
          container.classList.remove("active");
        });

        // Adiciona a classe 'active' apenas ao container clicado
        container.classList.add("active");

        animeDiv.innerHTML = "";

        // Criação da parte lateral
        const containerAnimeDiv = document.createElement("div");
        containerAnimeDiv.classList.add("container--right");
        animeDiv.append(containerAnimeDiv);

        const imgAnimeDiv = document.createElement("div");
        imgAnimeDiv.classList.add("img-wrapper");
        containerAnimeDiv.append(imgAnimeDiv);

        const animeImgDiv = document.createElement("img");
        const animeImges = anime.images.jpg.large_image_url;
        animeImgDiv.src = animeImges;
        imgAnimeDiv.append(animeImgDiv);

        const animeGenres = anime.genres;
        const animeGenresFilter = animeGenres.map((anime) => {
          return anime.name;
        });

        const containerText = document.createElement("div");
        containerText.classList.add("text-wrapper");
        containerText.innerHTML = `<p>${anime.title}</p> <p>${anime.rating}</p> <p>${anime.year}</p> <p>${animeGenresFilter}</p>`;
        containerAnimeDiv.append(containerText);
      });
    };
    toggleAddClass();
  });
};

getScoreHigherThanNine();

const getFooter = () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  document.body.prepend(footer);

  const container = document.createElement("div");
  container.classList.add("container");
  footer.append(container);

  const footerLeft = document.createElement("div");
  footerLeft.classList.add("footer-left");
  container.append(footerLeft);

  const footerRight = document.createElement("div");
  footerRight.classList.add("footer-right");
  container.append(footerRight);
  //ano
  const date = document.createElement("p");
  const currentYear = new Date().getFullYear();
  date.textContent = `${currentYear}`;
  footerLeft.append(date);

  //copyright
  const copyRight = document.createElement("p");
  copyRight.classList.add("copyright");
  copyRight.textContent = "© Diogo";
  footerRight.append(copyRight);
};
getFooter();
