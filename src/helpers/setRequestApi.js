export const setRequestApi = async({
    authorId,
    method,
    data
    }) => {
        
    const url = method==='POST'?
        `https://bp-pokemons.herokuapp.com/?idAuthor=${authorId}`:
        `https://bp-pokemons.herokuapp.com/${data.id}`;
    const resp = await fetch( url ,{
        method:method,
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    });
    try{
        const respData = await resp.json(); 
        return respData;
    }
    catch(ex){
        return null;
    }

}