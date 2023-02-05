import React, { useEffect, useState } from "react";

export default function ListsView() {
	const [lists, setLists] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		fetch("http://localhost:5000/lists")
			.then(res => res.json())
			.then(lists => {
				// upon success, update tasks
				setLists(lists);
			})
			.catch(error => {
				// upon failure, show error message
				setError(`Oops! Something went wrong. ${error}`);
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
			{error ? <h1>{error}</h1> : null}
		</div>
	);
}
