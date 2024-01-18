const fetchUserData = () => {
  const username = document.querySelector(".index__input").value.trim();
  if (!username) {
    return alert("Por favor, insira um nome de usuário do GitHub.");
  }
  fetch(`https://api.github.com/users/${username}`)
    .then((response) =>
      response.ok ? response.json() : Promise.reject("Usuário não encontrado")
    )
    .then((userData) => {
      localStorage.setItem("githubUserInfo", JSON.stringify(userData));
      window.location.replace ("./src/pages/profile.html");
    })
    .catch((error) => {
      console.error("Erro ao buscar dados do usuário:", error);
      window.location.replace ("./src/pages/error.html");
    });
};


document
  .querySelector(".index__button")
  .addEventListener("click", fetchUserData);
