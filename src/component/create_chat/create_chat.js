import React from "react";
import "./create_chat.css";
import {useState} from "react";
import {db} from '../../config-firebase';
import {collection, addDoc, Timestamp} from "firebase/firestore";

const Create_chat = ({getGroupName}) => {
    const [showfield, setshowfield ]= useState(false);


    // console.log(getGroupName)
    const showinput = () => {   // invoerveld voor chat naam laten zien
        setshowfield(true)
    }
    
    return (
    <div className="text-center">
        <button className="btn btn-secondary" onClick={() => showinput()}>Create new chat</button>
        {showfield == true ? (<div className="move_down "> <form onSubmit={getGroupName}> <input type="tekst" id="inputname" className="form-control size"/> </form> </div>): null }
    </div>
        );
}

export default Create_chat;