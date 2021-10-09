import React, { useState } from "react";
import todo from "../images/todo.png";
import "../App.css";

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [editItems, setEditItems] = useState(null);

    const addItem = () => {
        if(!inputData){
            alert('please fill data');
        }else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem) => {
                    if(elem.id === editItems){
                        return {...elem, name: inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setEditItems(null);

        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name: inputData}
            setItems([...items, allInputData]);
            setInputData('')
        }
        
    }
    const deleteItem = (index) => {
        
        const updatedItem = items.filter((elem) => {
            return index !==  elem.id;
        })
        setItems(updatedItem);
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id == id;
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setEditItems(id);
    }

    const removeAll = (id) => {
        
        setItems([]);
    }

    return(
        <>
        <div className="todo-main-section">
            <div className="todo-box-wrap">
                <div className="image-wrap">
                    <figure>
                        <img src={todo} alt="todo image" />
                    </figure>
                    <figcaption>Add Your List Here</figcaption>
                </div>
                <div className="additem-input">
                    <input type="text" name="addItems" id="addItem" placeholder="Add Items..." value={inputData} 
                    onChange={(e) => setInputData(e.target.value)}
                    />
                    {
                        toggleSubmit ? <i className="fa fa-plus-square" title="Add Item" onClick={addItem}></i> : <i className="fa fa-edit" title="Edit Item" onClick={addItem}></i>
                    }
                    
                </div>
                <div className="show-item-wrap">
                    {
                        items.map((elem, ind) => {
                            return (  
                                <div className="show-item-single" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="edit-del-btn">
                                        <i className="fa fa-edit" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                        <i className="fa fa-trash-alt" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className="btn-wrap">
                    <button className="btn btn-primary" onClick={removeAll}><span className="default-name">CHECK LIST</span><span className="hover-name">Remove All</span></button>
                </div>

            </div>
        </div>
        </>
    )
}

export default Todo