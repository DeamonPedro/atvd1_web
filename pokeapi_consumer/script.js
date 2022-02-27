const requestPokemonTypes = async () => {
  const apiUrl = "https://pokeapi.co/api/v2/type";
  response = await fetch(apiUrl);
  data = await response.json();
  return data.results;
};

const renderItem = async (name) => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  response = await fetch(apiUrl);
  data = await response.json();
  stats = "";
  for (const el of data.stats) {
    stats += `${el.stat.name}: ${el.base_stat} </br>`;
  }
  const div = document.createElement("div");
  div.className = "col-lg-2 col-md-6 mb-4";
  div.innerHTML = `
      <div class="card rounded shadow-sm border-0">
        <div class="card-body p-4 d-flex flex-column">
          <img
            src="${data.sprites.front_default}"
            class="img-fluid p-4"
          />
          <h5>
            <a href="#" class="text-dark">
              ${name}
            </a>
          </h5>
          <p class="small text-muted font-italic">
            ${stats}
          </p>
        </div>
      </div>
  `;
  return div;
};

const renderList = async (type) => {
  const list = document.querySelector("#list");
  list.innerHTML = '<div class="loader"></div>';
  const apiUrl = `https://pokeapi.co/api/v2/type/${type}`;
  response = await fetch(apiUrl);
  data = await response.json();
  const itemList = await Promise.all(
    data.pokemon.map((item) => renderItem(item.pokemon.name))
  );
  list.innerHTML = "";
  for (const item of itemList) {
    list.appendChild(item);
  }
};

window.onload = async () => {
  const pokemonType = document.querySelector("#pokemonType");
  const pokemonTypesList = await requestPokemonTypes();
  for (const item of pokemonTypesList) {
    const option = document.createElement("option");
    option.value = item.name;
    option.innerHTML = item.name;
    pokemonType.appendChild(option);
  }
  pokemonType.onchange = (evt) => renderList(evt.target.value);
  renderList(pokemonType.value);
};
