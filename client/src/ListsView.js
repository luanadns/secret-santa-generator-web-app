import React, { useEffect, useState } from "react";

export default function ListsView() {
	const [lists, setLists] = useState([]);
	//const [error, setError] = useState("");

	useEffect(() => {
		fetch("http://localhost:5000/lists")
			.then(res => res.json())
			.then(lists => {
				// upon success, update tasks
				setLists(lists);
			})
			.catch(error => {
				// upon failure, show error message
				error("Oops! Something went wrong. Try again later");
			});
	}, []);

	return (
		<div>
			<h1>I work</h1>
			{lists.map(list => (
				<div key={list.id}>
					<a href={`/view-presents?list_id=${list.id}`}>
						{list.name} - {list.owner}
					</a>
				</div>
			))}
		</div>
	);
}
