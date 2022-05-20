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
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jhpbri", {
			method: "PUT",
			body: JSON.stringify(toDoList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	}, [toDoList]);

	const handleToggle = (id) => {
		const mapped = toDoList.map((todo) => {
			return todo.id === Number(id)
				? { ...todo, done: !todo.done }
				: { ...todo };
		});
		setToDoList(mapped);
	};

	const handleFilter = () => {
		const filtered = toDoList.filter((todo) => {
			return !todo.done;
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
