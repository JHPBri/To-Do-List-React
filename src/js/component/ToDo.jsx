import React from "react";

const ToDo = ({ todo, handleToggle }) => {
	const handleClick = (e) => {
		e.preventDefault();
		handleToggle(e.currentTarget.id);
	};

	return (
		<div
			id={todo.id}
			key={todo.id + todo.label}
			name="todo"
			value={todo.id}
			onClick={handleClick}
			className={todo.done ? "todo strike" : "todo"}>
			{todo.label}
		</div>
	);
};

export default ToDo;
