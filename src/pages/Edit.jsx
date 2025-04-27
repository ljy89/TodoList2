import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import useTodo from "../hooks/useTodo";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TodoDispatchContext } from "../util/TodoContext";

const Edit = () =>{
    const params = useParams();
    const nav = useNavigate();
    const {onDelete, onUpdate} = useContext(TodoDispatchContext);
    const curTodoItem = useTodo(params.id);

    const onClickDelete = () => {
        if(window.confirm("정말 삭제할까요? 다시 복구되지 않습니다")){
            onDelete(params.id);
            nav("/", {replace : true});
        }
    }; 
    const onSubmit = (input) =>{
        if(window.confirm("수정하시겠습니까?")){
            onUpdate(
                params.id,
                input.tododate.getTime(),
                input.content
            );
            nav("/", {replace : true});
        }
    };

    return(
        <div>
            <Header title={"수정하기"} 
                leftChild={<Button onClick={()=>nav(-1)} text={"< 뒤로 가기"} />}
                rightChild={<Button
                                onClick={onClickDelete} 
                                text={"삭제하기"} 
                                type={"NEGATIVE"} />}
            />
            <Editor initData={curTodoItem} onSubmit={onSubmit}/>
        </div>
    )
};

export default Edit;