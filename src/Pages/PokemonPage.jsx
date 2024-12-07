import { useState } from "react";
import Nav from "../components/Nav";

const Pokemon = () => {

    const [pokemonData, setPokemonData] = useState(null);
    const [showData, setShowData] = useState(false);

    async function getData() {
        var api = "https://pokeapi.co/api/v2/pokemon/";
        var pokemon = document.getElementById("pokemon").value;
        const response = await fetch(api + pokemon);
        const data = await response.json();
        setPokemonData(data);
        setShowData(true);
    }

    return(
        <>
            <Nav />
            <h1>Welcome to the Pokemon Page</h1>
            <h3>Select a pokemon from the list below to display data about the pokemon</h3>
            <select name="pokemon" id="pokemon" width="500">
                <option value="pikachu">Pikachu</option>
                <option value="charizard">Charizard</option>
                <option value="blastoise">Blastoise</option>
                <option value="venusaur">Venusaur</option>
            </select>
            <button onClick={getData}>Ok</button>

            {showData ? 
            <p>{pokemonData.name} weight : {pokemonData.weight}</p>
            :
            <>
            {/* {<p>? weight : N/A</p>} */}
            </>
            }
        </>
    )

}

export default Pokemon