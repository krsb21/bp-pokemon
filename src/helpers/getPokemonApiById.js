export const getPokemonApiById = async( pokemonId ) => {
    try{
        const url = `https://bp-pokemons.herokuapp.com/${pokemonId}`
        const resp = await fetch( url );
        const pokeData = await resp.json(); 
        return pokeData;
    }
    catch(ex){
        return {};
    }

}