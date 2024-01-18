const newSearchButton = document.querySelector(".new-search__button");
newSearchButton
  ? newSearchButton.addEventListener("click", () =>
  window.location.replace("/index.html")
    )
  : console.error("Botão de nova pesquisa não encontrado");
