import { useNavigate } from "react-router-dom";
import { useContext ,useEffect, useState} from "react";
import { TodoStateContext } from "../util/TodoContext";

const useTodo = (id) =>{
    const data = useContext(TodoStateContext);
    const [curTodoItem, setCurTodoItem] = useState();
    const nav = useNavigate();

    useEffect(() => {
        const currentTodoItem = data.find(
            (item) => String(item.id) === String(id)
        );

        if(!currentTodoItem){
            window.alert("존재하지 않는 페이지입니다.");
            nav("/", { replace : true});
        }
        setCurTodoItem(currentTodoItem);
    }, [id]);
    return curTodoItem;
}

export default useTodo;


