import React, { useState, useEffect } from 'react'
import "./style.css";

const localData = () => {
  const lists = localStorage.getItem('myTodoList'); 

  if (lists) {
    return JSON.parse(lists);
  }
  else {
    return [];
  }
}

function Todo() { 
  const [inputData, setInputData] = useState('');
  const [isEditItem, setIsEditItem] = useState('');
  const [items, setItems] = useState(localData());
  const [toggleButton, setToggleButton] = useState(false);
  const addItem = () => {
    if(!inputData) {
      alert('fil the data');
    } else if( inputData && toggleButton ) {
      setItems(
        items.map((itemData) => {
          if(itemData.id === isEditItem) {
            return {...itemData, name: inputData}
          }
          return itemData;
        })
      )
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    } 
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      };
      console.log(myNewInputData);
      setItems([... items, myNewInputData])
      setInputData('');
    }
  }

  const editItem = (id) => {
    const item_todo_edited = items.find((itemData) => {
      return itemData.id === id
    })

    setInputData(item_todo_edited.name);
    setIsEditItem(id);
    setToggleButton(true);

  }

  const deleteItem = (id) => {
    const updatedItems = items.filter((itemData) => {
      return itemData.id !== id
    });
    setItems(updatedItems)
  }
  
  const removeAll = () => {
    setItems([])
  }

  useEffect(() => {
    localStorage.setItem('myTodoList', JSON.stringify(items));
  }, [items])
  
  
  return (
    <>
      <div className='main-div' >
        <div className='child-div' >
          <figure>
            <img src="./images/todo.svg" alt="todo logo" />
            <figcaption> Add your list Here </figcaption>
          </figure>
          <div className='addItems' >
            <input type="text" placeholder='Add items' className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)} />
            {
              toggleButton ? <i className="far fa-edit" onClick={addItem} ></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>
            }
            
          </div>
          {/* show items */}
          <div className='showItems' >
            {
              items.map( (itemData) => {
                return(
                  <div className='eachItem' key={itemData.id} >
                    <h3>{itemData.name}</h3>
                    <div className='todo-btn' > 
                      <i className="far fa-edit" onClick={() => editItem(itemData.id)} ></i>
                      <i className="far fa-trash-alt" onClick={() => deleteItem(itemData.id)} ></i>
                    </div>
                  </div>
                )
            } )
            }
          </div>
          <div className='showItems' >
            <button className='btn effect04' data-sm-link-text="REMOVE ALL" onClick={removeAll} > <span> CHECK LIST </span>  </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Todo