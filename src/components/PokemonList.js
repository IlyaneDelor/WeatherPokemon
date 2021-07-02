import React from 'react'

const PokemonList = ({ pokeList }) => {
    let index;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getPokemonSpriteURL = url => {
        const pokedexNumbRegex = '^.+/([0-9]+)/$';
        index = url.match(pokedexNumbRegex)[1];
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`
    }

    const getType = index => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
            .then(res => res.json())
            .then(res => {
                document.getElementById('hp' + index).innerHTML = res.stats[0].base_stat
                document.getElementById('attack' + index).innerHTML = res.stats[1].base_stat
                document.getElementById('defense' + index).innerHTML = res.stats[2].base_stat
                document.getElementById('special_attack' + index).innerHTML = res.stats[3].base_stat
                document.getElementById('special_defense' + index).innerHTML = res.stats[4].base_stat
                document.getElementById('speed' + index).innerHTML = res.stats[5].base_stat
                return res;
            })
            .then(res => res.types)
            .then(typeArr => typeArr.map(elem => capitalizeFirstLetter(elem.type.name)))
            .then(types => {
                document.getElementById(`${index}`).innerHTML = types.toString().replace(",", ", ");
            })
            .catch(err => console.log(err));

        return <div className="type" id={index}>{ }</div>
    }


    const getDetail = (url) => {
        let i = index
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}/`)
            .then(res => res.json())
            // .then(a => console.log(a))
            .then(result => {
                document.getElementById('habitat' + i).innerHTML = capitalizeFirstLetter(result.habitat.name);
                document.getElementById('text' + i).innerHTML = result.flavor_text_entries[2].flavor_text.toString();
                return result.flavor_text_entries[0].flavor_text.toString();
            })
            .then(r => {
                document.getElementById(url).innerHTML = r;
            })
            .catch(err => console.log(err))
        return <div className='description' id={url}>{ }</div>
    }

    return pokeList.map(pokemon => {
        return <div className='card-container' key={pokemon.name}>
            <div className='card'>
                <div className='front'>
                    <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
                    <img id='sprite' src={getPokemonSpriteURL(pokemon.url)} alt='pokemon'></img>
                    {getType(index)}
                    {getDetail(pokemon.url)}
                </div>
                <div className='back'>
                    <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
                    <div className='info'>
                        <div><span className='info_section'>Habitat: </span><span id={'habitat' + index}></span></div>
                        <div><span className='info_section'>Hp </span>(<span className='icon'>&#x2b;): </span><span id={'hp' + index}></span></div>
                        <div><span className='info_section'>Attack </span>(<span className='icon'>&#9876;): </span><span id={'attack' + index}></span></div>
                        <div><span className='info_section'>Defense </span>(<span className='icon'>&#x2297;): </span><span id={'defense' + index}></span></div>
                        <div><span className='info_section'>Special Attack </span>(<span className='icon'>&#9876;): </span><span id={'special_attack' + index}></span></div>
                        <div><span className='info_section'>Special Defense </span>(<span className='icon'>&#x2297;): </span><span id={'special_defense' + index}></span></div>
                        <div><span className='info_section'>Speed </span>(<span className='icon'>&#x22B1;): </span><span id={'speed' + index}></span></div>
                        <br />
                        <p id={'text' + index}></p>
                    </div>
                </div>
            </div>
        </div>
    })
}

export default PokemonList;