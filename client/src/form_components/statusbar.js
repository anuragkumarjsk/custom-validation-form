import React from 'react'
import './statusbar.css'
import {Correct, Incorrect} from './icons'
function Status(props) {
       return (
        <div>
             <table className="table_stats" >
        <tr>
            <td  className={`tr_stats ${props.arr[0] ? "back1" :"back2"}`}>Step 1 : {props.arr[0] ?  <Correct/>:<Incorrect/>}</td>
            <td  className={`tr_stats ${props.arr[1] ? "back1" :"back2"}`}>Step 2 :  {props.arr[1] ? <Correct/>:<Incorrect/>}</td>
            <td  className={`tr_stats ${props.arr[2] ? "back1" :"back2"}`}>Step 3 : {props.arr[2] ?  <Correct/>:<Incorrect/>}</td>
            <td  className={`tr_stats ${props.arr[3] ? "back1" :"back2"}`}>Step 4 :  {props.arr[3] ? <Correct/>:<Incorrect/>}</td>
            <td  className={`tr_stats ${props.arr[4] ? "back1" :"back2"}`}>Step 5 :  {props.arr[4] ?  <Correct/>:<Incorrect/>}</td>
        </tr>
        </table>
        </div>
    )
}

export default Status
