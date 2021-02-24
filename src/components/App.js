import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import { Button, IconButton, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
	  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	  border: 0,
	  borderRadius: 3,
	  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	  color: 'white',
	  height: 48,
	  padding: '0 30px',
	},
  });
function App() 
{
	const classes = useStyles();
	const[itemContent,setItemContent]=useState('');
	const [listItems,setListItems]= useState([]);	
	const[listMarkup,setListMarkup]=useState([]);	 
	const[editIndex,setEditIndex]=useState(-1);
	const[itemEditing,setItemEditing]=useState('');

	const insertItem=()=>{
		if(itemContent!==''){
			let oldlist=[...listItems];
			oldlist.push(itemContent);
			setListItems(oldlist);
			setItemContent('');
		}
	} 
	const deleteItem=(event)=>{
		let delIndex=event.target.parentNode.id;
		let oldlist=[...listItems];
		oldlist.splice(delIndex,1);
		setListItems(oldlist);
	}
	const editItem=(event)=>{
		// console.log(event.target.parentNode.id)/
		let tempIndex=event.target.parentNode.id;
		setEditIndex(tempIndex);
		setItemEditing(listItems[tempIndex])
	}
	const saveItem=(event)=>{
		let tempIndex=event.target.parentNode.id;
		let oldlist=[...listItems];
		oldlist[tempIndex]=itemEditing;
		setListItems(oldlist);
		setEditIndex(-1);
		setItemEditing('');		
	}
	useEffect(()=>{
		let tempMarkup=listItems.map((el,index)=>{
			return (
				index==editIndex 
				?
					<div id={index}>
						<textarea className="editTask" value={itemEditing} onChange={(event)=>setItemEditing(event.target.value)} ></textarea>
						<button className="saveTask" disabled={!itemEditing}onClick={(event)=>saveItem(event)}> save </button>
					</div>
				: <div id={index}>
					<TextField className="list" disabled id="standard-disabled" label={el} />
					<button className="delete" onClick={(event)=>deleteItem(event)} >delete</button>
					<button className="edit" onClick={(event)=>editItem(event)} >edit</button>
				</div>)
		})
		setListMarkup(tempMarkup);
	},[listItems,itemEditing])
	
	return (
	<div id="main">
		<div className={classes.root} style={{textAlign:'center',fontSize:'40px'}}>To - do -List</div>
		<div style={{position:'relative',left:'40%',top:'40px'}}>
			<textarea id="task" value={itemContent} onChange={(event)=>setItemContent(event.target.value)} ></textarea> 
			<button id="btn" onClick={insertItem}>  Add</button>
		</div>
		<div style={{position:'relative',left:'40%',top:'40px'}}>
			{listMarkup}
		</div>
	</div>
	 
	);
}


export default App;
