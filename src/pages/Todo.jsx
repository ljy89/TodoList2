import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useTodo from "../hooks/useTodo";
import {getStringedDate} from "../util/get-stringed-date";

const Todo = () => {
    const params = useParams();
    const nav = useNavigate();

    const curTodoItem = useTodo(params.id);
    
    if(!curTodoItem){
        return <div>로딩중  ..</div>;
    }
    
    const { tododate, content} = curTodoItem;
    const title = getStringedDate(new Date(tododate));

    return(
        <div>
            <Header title={`${title} 일정`}
                leftChild = {<Button onClick={()=>nav(-1)} text="< 뒤로가기" />}
                rightChild = {<Button onClick={()=>nav(`/edit/${params.id}`)} text="수정하기" />}
            />
            <Viewer content={content} />
        </div>
    )
};

export default Todo;