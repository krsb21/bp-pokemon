import { useState } from "react"
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {AddPokemon} from './components/AddPokemon'
import {TableRowAdder} from './components/TableRowAdder'
export const BpPokemon = () => {
	const [pokeId,setPokeId] = useState(null);
	const [searchValue,setSearchValue] = useState(null);
	const [reloader,setReloader] = useState(false);
	const [updateData,setUpdateData] = useState({});
	const [editor,setEditor] = useState(false);
	const searchPokeById = (ev) => {
		ev.preventDefault();
		if(searchValue!==null && searchValue.trim().length > 0) {
			setPokeId(searchValue.trim())
		}else{
			setPokeId(null)
		}
		
	}
	const onSearchFieldChange = ({ target }) => {
        setSearchValue( target.value );
    }
	return (
		<>
			<div className="main">
				<h1>Listado de Pokemon</h1>
				<div className="actions-bar between">
					<form onSubmit={searchPokeById}>	
						<div className="input-control">
							<input className="search-field search-field--fw" name="search_field" type="text" id="search_field" placeholder="Buscar || :N"
							onChange={onSearchFieldChange}
							/>
						</div>
					</form>
					<button className="action-button icon" onClick={ev => {setUpdateData({});setEditor(false);}}>
					<div className="action-button-icon">
					<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
					</div>
					Nuevo
					</button>
				</div>
				<div className="pokedex-container">
					<table className="pokedex-table">
						<thead>
							<tr>
								<th>id</th>
								<th>Nombre</th>
								<th>Imagen</th>
								<th>Ataque</th>
								<th>Defensa</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
						<TableRowAdder pokemonId={pokeId} reloader={reloader} setEditor={setEditor} setReloader={setReloader} updateData={updateData} setUpdateData={setUpdateData}/>
						</tbody>
					</table>
				</div>
				<AddPokemon editor={editor} setEditor={setEditor} setReloader={setReloader} updateData={updateData} setUpdateData={setUpdateData}/>
			</div>
		</>
  )
}
