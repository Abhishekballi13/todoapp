import React, {useState,useEffect}from 'react'
import "./style.css"

//get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);
    }
    else{
       return [];
    }
}



const Todo = () => {
    //state bdlne ke liye taki jo likhe vo add hota jay
    const[inputdata,setInputData] = useState("");
    const[items,setItems] = useState(getLocalData());
    const[isEditItem,setIsEditItem] = useState();
    const[toggleButton,setToggleButton] = useState(false)

//add the items function    
const addItem = () => {
    if(!inputdata){
        alert("plz fill the data");
    }
    else if(inputdata && toggleButton){
        setItems(
            items.map((curElem) =>{
                if(curElem.id===isEditItem){
                    return{...curElem,name:inputdata};
                }
                return curElem;
            })
        )

        setInputData("")
        setIsEditItem();
        setToggleButton(false);
    }
    else{
        // ... ye spread operator hai ka kam hai previous data ko rkhna
        //aur nay data ko add krdo
        //ek array ke form me state ko  dalta jayega ya store krta rhega
        //ek object create krdiya taki naya data ate rhe
        const myNewInputData = {
            id:new Date().getTime().toString(),
            name:inputdata,
        };
        setItems([...items,myNewInputData]);
        setInputData("");
    }
}

//how to delete item section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
        return curElem.id !== index;//jiska bhi match krjay usko chod kr sab rteurn krdo in form of array
    })
   setItems(updatedItems);
  }

  //remove all the elements
const removeAll = () => {
 setItems([]);
};

//adding localStorage
useEffect(() => {
  return () => {
    //stringify isliye kiya hai kyoi vha array pass kr rhe hai hamlog but vha hamlog
    //ko chye thi string , ke bad
    localStorage.setItem("mytodolist",JSON.stringify(items));
  }
}, [items])

//edit the items
const editItem = (index) => {
    const item_todo_edited = items.find((curElem)=>{
        return curElem.id === index;
    })
    setInputData(item_todo_edited)
    setIsEditItem(index);
    setToggleButton(true);
};

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
            <figure>
                <img src='./images/todo.svg' alt="todologo" />
                {/* windows key + .key for emoji */}
                <figcaption>Add Your List here 👏</figcaption>
            </figure>
            <div className='addItems'>
                <input type = "text"
                placeholder="✍ Add item"
                className="form-control"
                value={inputdata}
                onChange={(event) => setInputData(event.target.value) }
                />
                {toggleButton ? (
                    <i class="fa fa-edit add-btn" onClick={addItem}></i>
                ) : (
                    <i class="fa fa-plus add-btn" onClick={addItem}></i>
                )}
                {/* show our items */}
                   <div className='showItems'>
                   {items.map((curElem) => {
                    return(
                        <div className='eachItem' key={curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className='todo-btn'>
                            <i className='far fa-edit add-btn'
                            onClick={()=>editItem(curElem.id)}></i>
                            <i className="far fa-trash-alt add-btn"
                            onClick={() => deleteItem(curElem.id)}></i>
                        </div>
                    </div>
                    );
                   })}
                   </div>
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                      <span>CHECK LIST</span>
                    </button>
                </div>
             </div>
            </div>
        </div>
    </>
  )
}

export default Todo
