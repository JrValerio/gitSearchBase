const getUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem("githubUserInfo");
  return userJSON ? JSON.parse(userJSON) : null;
};

const renderUserInfo = (userInfo) => {
  document.querySelector(".profile__image").src = userInfo.avatar_url;
  document.querySelector(".profile__username").textContent = userInfo.login;
};

const renderUserRepos = (userData) => {
  fetch(`https://api.github.com/users/${userData.login}/repos`)
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject("Falha ao buscar repositórios")
    )
    .then((repositories) => updateRepoList(repositories))
    .catch(showError);
};

const updateRepoList = (repositories) => {
  const ul = document.querySelector(".profile__ul");
  ul.innerHTML = repositories
    .map(
      (repo) => `
      <li>
        <h4>${repo.name}</h4>
        <p>${
          repo.description ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        }</p>
        <a href="${repo.html_url}" target="_blank">Repositório</a>
      </li>
    `
    )
    .join("");
};

const showError = (error) => {
  document.querySelector(
    ".profile__ul"
  ).innerHTML = `<li>Erro ao carregar repositórios: ${error}</li>`;
};

const clearDataAndRedirect = () => {
  localStorage.clear();
  window.location.replace("../index.html");
};

const button = document.querySelector(".profile__change-user--button");
if (button) {
  button.addEventListener("click", clearDataAndRedirect);
} else {
  console.error("Botão não foi encontrado no DOM");
}

const userData = getUserFromLocalStorage();
if (userData) {
  renderUserInfo(userData);
  renderUserRepos(userData);
} else {
  redirectToHomePage();
}
