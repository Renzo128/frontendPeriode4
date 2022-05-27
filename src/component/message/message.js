import React from "react";

const Message = ({mess, index, edit_value, showinput, update, delete_value, isDisabled,sender, currentUser}) => {
    currentUser = "test123";
    let messenger = true;
    if (currentUser == sender){
       messenger = true;
    }
    else{
        messenger = false;
    }
    return(

        <div className="text-center">
            {messenger ? (<div className="text-left"><button onClick={() => edit_value(index)} className="button" name="edit" disabled={isDisabled}>Edit</button> <button onClick={() => delete_value(index)} className="button" name="delete" disabled={isDisabled}>Delete</button> {mess}  
            {showinput ? (<p><input id={index} type="tekst" defaultValue={mess}/> <button onClick={() =>update(index, document.getElementById(index).value)}>Save</button></p>) : null }</div>) : (<div className="text-right"> {mess}</div>) }
            {}
        </div>
    )
}
export default Message;