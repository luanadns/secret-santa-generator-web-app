import React, { useEffect, useState } from "react";

export default function ListsView() {
	const [lists, setLists] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/lists")
			.then(res => res.json())
			.then(lists => {
				// upon success, update tasks
				setLists(lists);
			})
			.catch(error => {
				// upon failure, show error message
			});
	}, []);

	return (
		<div>
			<h1>I work</h1>
			{lists.map(list => (
				<div key={list.id}>
					{list.name} - {list.owner} - {list.presentName} - {list.url}
				</div>
			))}
		</div>
	);
}
