import './App.css'
import { useReducer , useRef, useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom"
import {TodoStateContext, TodoDispatchContext} from './util/TodoContext';
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import axios from 'axios';

function reduce (state, action){
  let nextState;

  switch (action.type){
    case "INIT" : 
      return action.data;
    case "CREATE" :{
      nextState = [action.data, ...state];
      break;
    }
      
    case "UDATE" :{
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
      
    case "DELETE" :{
      nextState = state.filter((item) => String(item.id) !== String(action.data.id));
      break;
    }
      
    default : state;
  }
  localStorage.setItem("TODO", JSON.stringify(nextState));
  return nextState
}

//export const TodoStateContext = createContext();
//export const TodoDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reduce, []);
  const idRef = useRef(0);

    useEffect(()=> {
      const storedData = localStorage.getItem("todo");
      if(!storedData){
        setIsLoading(false);
        return;
      }
      const parsedData = JSON.parse(storedData);

      if(!Array.isArray(parsedData)){
          setIsLoading(false);
          return ;
      }

      let maxId = 0;
      parsedData.forEach((item) =>{
        if(Number(item.id) > maxId){
          maxId = Number(item.id)
        }
      });
      idRef.current = maxId +1 ;
        dispatch({
          type : "INIT",
          data : parsedData,
        });
        setIsLoading(false);
    }, []);

  const onCreate = (tododate, content) => {
    dispatch({
      type : "CREATE",
      data : {
        id : idRef.current++,
        tododate,
        content,
      },
    });
  };

  const onUpdate = (id, tododate, content) => {
    dispatch({
      type : "UPDATE",
      data : {
        id,
        tododate,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type : "DELETE",
      data : {
        id
      },
    });
  };

  if(isLoading){
    return <div>로딩중</div>;
  }

  return (
    <>
      <TodoStateContext.Provider value={data}>
        <TodoDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/todo/:id" element={<Todo />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </>
  );
}

export default App;
