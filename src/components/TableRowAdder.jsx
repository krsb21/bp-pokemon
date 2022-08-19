import {useState, useEffect} from 'react';
import { getPokemonApiById } from '../helpers/getPokemonApiById';
import { getPokemonList } from '../helpers/getPokemonList';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil,faTrash} from '@fortawesome/free-solid-svg-icons'
import { setRequestApi } from '../helpers/setRequestApi';
export const TableRowAdder =  ({pokemonId,reloader,setReloader,updateData,setUpdateData,setEditor}) => {
    const [data,setData] = useState({});
    const getPokemonById = async() => {
        if(pokemonId !== null && !isNaN(pokemonId)){
            getPokemonApiById( pokemonId ).then(pokeData => {
                setData(pokeData); 
            });
        }else{
            if(pokemonId === null){
                getPokemonList(2121).then(pokeData => {
                    setData(pokeData)
                });
            }else{
                getPokemonList(2121,pokemonId).then(pokeData => {
                    setData(pokeData)
                });
            }
            
        }
        setReloader(false)
        // console.log(pokemonId,pokeData); 
       
    }
    const editPokemon = (ev,data) => {
        setEditor(true);
        setUpdateData(data);
    }
    const deletePokemon = (ev,id) => {
        ev.preventDefault();
		setRequestApi({
			authorId: 2121,
			method: 'DELETE',
			data:{
				id:id
			}
		}).then(resp => {
			getPokemonById()
		})
    }
    if(reloader){
        getPokemonById()
    }
    useEffect( () => {
        getPokemonById()
    },[pokemonId]);
    if(
        pokemonId !== undefined && pokemonId !== null && 
        !Array.isArray(data) && 
        typeof data === 'object' &&
        Object.keys(data).length !== 0){
        // console.log(Object.keys(data) );
        return (
            <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td><img src={data.image} width="20" /></td>
                <td>{data.attack}</td>
                <td>{data.defense}</td>
                <td>
                        <div className="actions-bar center">
                            <a title="Editar" href="#" className="pokedex-table__button" onClick={ev =>{editPokemon(ev,data)}}>
                                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                            </a>
                            <a title="Borrar" href="#" className="pokedex-table__button" onClick={ev => {deletePokemon(ev,data.id)}}>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </a>
                        </div>
                    </td>
            </tr>
        )
    }else if(Array.isArray(data) && data.length > 0){
        return <>
        {
            data.map(pokeDataResp => (
                <tr key={pokeDataResp.id}>
                    <td>{pokeDataResp.id}</td>
                    <td>{pokeDataResp.name}</td>
                    <td><img src={pokeDataResp.image} width="20" /></td>
                    <td>{pokeDataResp.attack}</td>
                    <td>{pokeDataResp.defense}</td>
                    <td>
                        <div className="actions-bar center">
                            <a title="Editar" href="#" className="pokedex-table__button" onClick={ev =>{editPokemon(ev,pokeDataResp)}}>
                                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                            </a>
                            <a title="Borrar" href="#" className="pokedex-table__button" onClick={ev => {deletePokemon(ev,pokeDataResp.id)}}>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </a>
                        </div>
                    </td>
                </tr>
            ))
        }
        </>
        
    }else{
        return (
            <tr>
                <td colSpan="6">No Info</td>
            </tr>
        )
    }
}
