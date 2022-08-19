export const getPokemonList = async(authorId,number='n') => {
    try{
        const test = /^:+[0-9]*$/gi;
        let url = '';
        if(test.test(number)){
            number = number.substring(1);
            url = `https://bp-pokemons.herokuapp.com/${number}?idAuthor=${authorId}`
        }else{
            url = `https://bp-pokemons.herokuapp.com/?idAuthor=${authorId}`
        }
        const resp = await fetch( url );
        const pokeData = await resp.json(); 
        return pokeData;
    }
    catch(ex){
        return [];
    }

}