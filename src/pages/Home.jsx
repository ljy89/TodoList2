import { useState , useContext} from "react";
import { TodoStateContext } from "../util/TodoContext";
import Header from "../components/Header";
import Button from "../components/Button";
import TodoList from "../components/TodoList";

const getMonthlyData = (pivotDate, data) =>{
    if(!data){
        data = [];
    }
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1,0,0,0).getTime();
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() +1, 0,23,59,59).getTime();

    return data.filter((item) => beginTime <= item.tododate && item.tododate <= endTime);
}

const Home = () => {
    const data = useContext(TodoStateContext);

    const [pivotDate , setPivotDate] = useState(new Date());

    const monthlyData = getMonthlyData(pivotDate, data);
    
    const onIncreaseMonth = () =>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() +1));
    };
    const onDecreaseMonth = () =>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() -1));
    };

    return(
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`} 
                leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
                rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
            />
            <TodoList data={monthlyData}/>
        </div>
    )
};

export default Home;