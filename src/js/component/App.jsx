import React, { useState, useEffect } from "react";
//mock data
import data from "./data.json";
//components
import Header from "./Header.jsx";
import ToDoList from "./ToDoList.jsx";
import ToDoForm from "./ToDoForm.jsx";

function App() {
	const [toDoList, setToDoList] = useState(data);

	useEffect(() => {
		console.log("use effect ran");
		console.log(toDoList);
	}, [toDoList]);

	const handleToggle = (id) => {
		let mapped = toDoList.map((label) => {
			return label.id === Number(id)
				? { ...label, complete: !label.done }
				: { ...label };
		});
		setToDoList(mapped);
	};

	const handleFilter = () => {
		let filtered = toDoList.filter((label) => {
			return !label.done;
		});
		setToDoList(filtered);
	};

	const addTask = (userInput) => {
		let copy = [...toDoList];
		copy = [...copy, { label: userInput, done: false }];
		setToDoList(copy);
	};

	return (
		<div className="App">
			<Header />
			<ToDoList
				toDoList={toDoList}
				handleToggle={handleToggle}
				handleFilter={handleFilter}
			/>
			<ToDoForm addTask={addTask} />
		</div>
	);
}

export default App;
