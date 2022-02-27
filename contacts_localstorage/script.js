const refreshContactsList = () => {
  const list = document.querySelector("section");
  list.innerHTML = "";
  const items = [];
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    items.push({ key, ...JSON.parse(localStorage.getItem(key)) });
  }
  items.sort((a, b) => a.key - b.key);
  for (const item of items) {
    const contactInfo = document.createElement("p");
    contactInfo.innerHTML = `Nome: ${item.name}<br>
                              Surname: ${item.surname}<br>
                              Numero: ${item.tel}<br>
                              Genre: ${item.genre}<br>`;
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "DELETE";
    deleteButton.onclick = () => deleteItem(item.key);
    const div = document.createElement("div");
    div.appendChild(contactInfo);
    div.appendChild(deleteButton);
    list.appendChild(div);
  }
};

const saveItem = (name, surname, tel, genre) => {
  const key = Date.now();
  localStorage.setItem(
    key,
    JSON.stringify({
      name,
      surname,
      tel,
      genre,
    })
  );
  refreshContactsList();
};

const deleteItem = (key) => {
  localStorage.removeItem(key);
  refreshContactsList();
};

window.onload = () => {
  refreshContactsList();
  const nameInput = document.querySelector("#nameInput");
  const surnameInput = document.querySelector("#surnameInput");
  const genreInput = document.querySelector("#genreInput");
  const telInput = document.querySelector("#telInput");
  const saveButton = document.querySelector("#saveButton");
  saveButton.onclick = () =>
    saveItem(
      nameInput.value,
      surnameInput.value,
      telInput.value,
      genreInput.value
    );
};
