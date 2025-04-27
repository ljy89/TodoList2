import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TodoDispatchContext } from "../util/TodoContext";

const New = () => {
    const {onCreate} = useContext(TodoDispatchContext);
    const nav = useNavigate();
    const onSubmit = (input) =>{
        onCreate(
            input.tododate.getTime(),
            input.content
        );
        nav("/", {replace : true});
    };

    return(
        <div>
            <Header title={"Todo 추가"} 
                leftChild={<Button onClick={()=>nav(-1)} text={"< 뒤로 가기"} />}
            />
            <Editor onSubmit ={onSubmit}/>
        </div>
    )
};

export default New;