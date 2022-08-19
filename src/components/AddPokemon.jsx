import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react';
import { setRequestApi } from '../helpers/setRequestApi';
export const AddPokemon = ({setReloader,updateData,editor,setEditor,setUpdateData}) => {
	const [nameValue,setNameValue] = useState(''); 
	const [attackValue,setAttackValue] = useState(50); 
	const [defenseValue,setDefenseValue] = useState(50);
	const [imagenValue,setImagenValue] = useState('');
	const [title,setTitle] = useState('Nuevo Pokemon');
	const [actualId,setActualId] = useState(null);
	const onInputNameChange = ({target}) => {
		setNameValue(target.value)
	}
	const onInputURLChange = ({target}) => {
		setImagenValue(target.value)
	}
	const onInputAttackChange = ({target}) => {
		setAttackValue(target.value)
	}
	const onInputDefenseChange = ({target}) => {
		setDefenseValue(target.value)
	}
	const setFormData = () => {
		if(!editor){
			setTitle('Nuevo Pokemon');
			setActualId(null)
		}else{
			setTitle('Editar Pokemon');
			setActualId(updateData.id)
		}
		setImagenValue(
			(updateData.image != undefined && updateData.image != null) ? updateData.image:''
		)
		setNameValue(
			(updateData.name != undefined && updateData.name != null) ? updateData.name:''
		)
		setDefenseValue(
			(updateData.defense != undefined && updateData.defense != null) ? updateData.defense:50
		)
		setAttackValue(
			(updateData.attack != undefined && updateData.attack != null) ? updateData.attack:50
		)
	}
	useEffect( () => {
        setFormData();
    },[updateData]);
	const restartIDE = (response = null) => {
		setImagenValue('')
		setNameValue('')
		setDefenseValue(50)
		setAttackValue(50)
		setReloader(true)
		setEditor(false)
		setActualId(null)
		setUpdateData({})
		
		console.log(response);
	}
	const onSubmit = (ev) => {
		ev.preventDefault();
		if(actualId === null){
			setRequestApi({
				authorId: 2121,
				method: 'POST',
				data:{
					name: nameValue,
					image: imagenValue,
					attack: attackValue,
					defense: defenseValue,
					hp: 100,
					type: 'pokemon',
					id_author: 2121,
					idAuthor: 2121
				}
			}).then(resp => {
				restartIDE(resp);
			})
		}else{
			setRequestApi({
				authorId: 2121,
				method: 'PUT',
				data:{
					name: nameValue,
					image: imagenValue,
					attack: attackValue,
					defense: defenseValue,
					hp: 100,
					type: 'pokemon',
					id_author: 2121,
					idAuthor: 2121,
					id: updateData.id
				}
			}).then(resp => {
				restartIDE(resp);
			})
		}
		
	}
	return (
		<>
			<div className="create-pokemon-container bordered">
				<h2 className="create-pokemon-container__title">{title}</h2>
				<form onSubmit={onSubmit}>
					<div className="input-form">
						<div className="input-control">
							<label htmlFor="nombre_field">Nombre:</label>
							<input id="nombre_field" className="" type="text" value={nameValue} onChange={onInputNameChange}/>
						</div>
						<div className="input-control">
							<label htmlFor="ataque_field">Ataque:</label>
							<input type="range" min="0" max="100" value={attackValue} id="ataque_field" onChange={onInputAttackChange}/>
							<span className="input-control__percent">{attackValue}</span>
						</div>
						<div className="input-control">
							<label htmlFor="url_field">Imagen:</label>
							<input id="url_field" className="" type="text" value={imagenValue} onChange={onInputURLChange}/>
						</div>
						<div className="input-control">
							<label htmlFor="defensa_field">Defensa:</label>
							<input type="range" min="0" max="100" value={defenseValue}  id="defensa_field" onChange={onInputDefenseChange}/>
							<span className="input-control__percent">{defenseValue}</span>
						</div>
					</div>
					<div className="actions-bar center pt-2">
						<button className="action-button icon">
							<div className="action-button-icon">
								<FontAwesomeIcon icon={faFloppyDisk}></FontAwesomeIcon>
							</div>
							Guardar
						</button>
						<button className="action-button icon" onClick={restartIDE}>
							<div className="action-button-icon">
								<FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
							</div>
							Cancelar
						</button>
						
					</div>
				</form>
			</div>
		</>
	)
}
