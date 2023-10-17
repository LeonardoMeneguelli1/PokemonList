import React, { useState, useEffect } from 'react';
import './pokemon.css';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonSkins, setPokemonSkins] = useState({});
  const [spriteViewPokemon, setSpriteViewPokemon] = useState(null);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data) => setPokemonList(data.results));
  }, [currentPage, itemsPerPage]);

  const pokemonSprite = (name) => {
    if (!pokemonSkins[name] || spriteViewPokemon !== name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
          const sprite = data.sprites.front_default;
          setPokemonSkins({ ...pokemonSkins, [name]: sprite });
          setSpriteViewPokemon(name);
        });
    } else {
      setSpriteViewPokemon(null);
    }
  };

  const spriteView  = (name) => spriteViewPokemon === name;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <img style={{ maxWidth: '100%', height: 'auto' }} src="./pokemon_logo.png" alt="Logotipo do Pokémon" />
      <ul className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <li key={index} className="pokemon-item">
            <div className={`pokemon-name ${spriteView(pokemon.name) ? 'aparecer' : ''}`} onClick={() => pokemonSprite(pokemon.name)}>
              {capitalizeFirstLetter(pokemon.name)}
            </div>
            {spriteView(pokemon.name) && (
              <div className="sprite">
                {pokemonSkins[pokemon.name] && (
                  <img src={pokemonSkins[pokemon.name]} alt={`Sprite de ${pokemon.name}`} />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Página Anterior
        </button>
        <button className="pagination-button" onClick={() => setCurrentPage(currentPage + 1)}>
          Próxima Página
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
