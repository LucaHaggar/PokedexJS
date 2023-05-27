//il codice utilizza il metodo fetch()
//Viene chiamato il metodo fetch() passando come argomento l'URL del file JSON (presumibilmente "pokemon.json/pokedex.json"). Questo avvia una richiesta HTTP per ottenere il contenuto del file JSON.
//Il metodo fetch() restituisce una promessa che rappresenta la risposta alla richiesta HTTP.
//Viene chiamato il metodo then() sulla promessa restituita da fetch(). Questo metodo accetta una funzione di callback che viene eseguita quando la promessa viene risolta con successo, cioè quando la risposta HTTP è stata ricevuta.
//Nella funzione di callback, viene chiamato il metodo json() sulla risposta ricevuta. Questo metodo restituisce una promessa che rappresenta i dati JSON contenuti nella risposta.
//Viene chiamato un altro metodo then() sulla promessa restituita da response.json(). Anche in questo caso, viene passata una funzione di callback che viene eseguita quando la promessa viene risolta con successo, cioè quando i dati JSON sono stati estratti dalla risposta.
//Nella seconda funzione di callback, vengono stampati i dati JSON ottenuti dalla risposta utilizzando console.log(data)
//Se si verifica un errore durante il processo, viene gestito chiamando il metodo catch() sulla promessa originale. In questo caso, il blocco di codice all'interno del catch() viene eseguito senza alcuna azione specifica.

const searchBar = document.getElementById("search-bar");

let pokemon;
fetch("pokemon.json/pokedex.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    pokemon = data.slice(0, 151);
    console.log(pokemon);
    generaCards(pokemon);
  })
  .catch((err) => {});

//!Funzione per generare le card
function generaCards(listaPokemon) {
  const pokedex = document.getElementById("pokedex");
  while (pokedex.firstChild) {
    pokedex.removeChild(pokedex.firstChild);
  }
  listaPokemon.forEach((pokemon) => {
    const card = `<div class="iniline-block rounded-xl m-auto max-w-[200px] p-5 hover:bg-slate-200">
    <img src="pokemon.json/images/${formatID(pokemon.id)}.png">
    <h3>${pokemon.name.english}</h3>
    </div>`;
    pokedex.insertAdjacentHTML("beforeend", card);
  });
}

//!Funzione per formattare id delle immagini
function formatID(id) {
  if (id.toString().length == 1) return `00${id}`;
  if (id.toString().length == 2) return `0${id}`;
  return id;
}

//! Funzione per la searcBar con evento keyup -> è un evento che si verifica quando viene rilasciato un tasto sulla tastiera mentre un elemento ha il focus.
searchBar.addEventListener("keyup", (e) => {
  let pokemonFiltrati = [];
  if (e.target.value.startsWith("type:")) {
    const value = e.target.value.replace("type:", "");
    pokemonFiltrati = pokemon.filter((pkmn) => {
      return pkmn.type.indexOf(value) != -1;
    });
  } else {
    pokemonFiltrati = pokemon.filter((pkmn) => {
      return pkmn.name.english.startsWith(e.target.value);
    });
  }
  generaCards(pokemonFiltrati);
});
