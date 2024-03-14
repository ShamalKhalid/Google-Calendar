import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../../contexts/GlobalContext";
const labelClass = ["indigo", "gray", "green", "blue", "red", "purple"];
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const { setShowAddEvent, daySelected } = useContext(GlobalContext);
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelClass[0]);
  const [isDone, setisDone] = useState(true);

  const TodoCollectionRef = collection(db, "Todos");

  const onSubmitTodo = async () => {
    try {
      await addDoc(TodoCollectionRef, {
        Title: title,
        Description: description,
        Date: daySelected.format("dddd, MMMM DD"),
        Color: selectedLabel,
      });
      setShowAddEvent(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="eventHead px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <button onClick={() => setShowAddEvent(false)}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="pt-3 border-0 text-gray-400 text-xl font-semibold pb-2 w-full border-b-2 borderColorGray200 focus:outline-none focus:ring-0 borderColorBlue500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600  font-semibold pb-2 w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>

            <div className="flex gap-x-2">
              {labelClass.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            onClick={onSubmitTodo}
          >
            Save
          </button>
        </footer>
      </div>
      {/* <div className="bg-purple-500">
        <div className="bg-red-500">
          <div className="bg-indigo-500 ">
            <div className="bg-gray-500">
              <div className="bg-blue-500">
                <div className="bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
