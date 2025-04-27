import "./TodoList.css";
import Button from "./Button";
import TodoItem from "./TodoItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TodoList = ({data}) => {
    const nav = useNavigate();
    const [sortType , setSortType] = useState("latest");

// const TodoList = () => {
//     const nav = useNavigate();
//     const [sortType , setSortType] = useState("latest");
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         const res = await axios.get('/api/posts');
//         console.log("Fetched Data:", res.data);
//         setData(res.data);
//     };

//     useEffect(() => {
//         fetchData();
//     },[]);

    const onChageSortType = (e) =>{
        setSortType(e.target.value);
    };

    const getSortData = () =>{
        return data.toSorted((a,b)=>{
            if(sortType === 'oldest'){
               // return Number(a.createdDate) - Number(b.createdDate);
                return Number(a.tododate) - Number(b.tododate);
            }else{
                //return Number(b.createdDate) - Number(a.createdDate);
                return Number(b.tododate) - Number(a.tododate);
            }
        });
    };

    const sortedData = getSortData();

    return (
        <div className="TodoList">
            <div className="menu_bar">
                <select onChange={onChageSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button
                    onClick={() => nav("/new")} 
                    text={"Todo 추가"} 
                    type={"POSITIVE"}/>
            </div>
            <div className="list_wrapper">
                {sortedData.map((item)=> <TodoItem key={item.id} {...item} />)}
            </div>
        </div>
    )
}

export default TodoList;