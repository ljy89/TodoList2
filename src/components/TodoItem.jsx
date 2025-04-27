import "./TodoItem.css"
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodoItem = ({id, tododate, content}) => {
    const nav = useNavigate();

    return (
        <div className="TodoItem">
            <div
                onClick={()=>nav(`/todo/${id}`)}  
                className="info_section">
                <div className="created_date">
                    {new Date(tododate).toLocaleDateString()}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
            <div
                onClick={()=>nav(`/edit/${id}`)}  
                className="button_section">
                <Button text={"수정하기"} />
            </div>

        </div>
    )
}

export default TodoItem;