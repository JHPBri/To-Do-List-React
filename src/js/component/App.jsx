import React, { useState } from "react";
//mock data
import data from "./data.json";
//components
import Header from "./Header.jsx";
import ToDoList from "./ToDoList.jsx";
import ToDoForm from "./ToDoForm.jsx";

function App() {
	const [toDoList, setToDoList] = useState(data);

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

	fetch("https://assets.breatheco.de/apis/fake/todos/user/jhpbri", {
		method: "PUT",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
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
