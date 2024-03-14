import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase/Firebase";

export const getTodoList = async () => {
    const todoCollectionRef = collection(db, "Todos");
    try {
      const data = await getDocs(todoCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return filteredData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

const Todo = () => {
  const [TodoList, setTodoList] = useState([
    {
      Title: "",
      Description: "",
      Date: "",
      Color: "",
    },
  ]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodoList();
      setTodoList(data);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-5">
      {TodoList.map((todo, index) => (
        <div key={index} style={{ backgroundColor: `${todo.Color}` }}>
          <h1>{todo.Title}</h1>
          <p>{todo.Description}</p>
          <p>{todo.Date}</p>
        </div>
      ))}
    </div>
  );
};

export default Todo;

