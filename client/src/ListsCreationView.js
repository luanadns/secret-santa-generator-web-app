import React, { useState } from "react";

const postList = async (name, occasion, present, url) => {
	const response = await fetch("http://localhost:3000/lists/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			owner: name,
			name: occasion,
			presentName: present,
			url: url
		})
	});
	return response.json();
};

export default function ListsCreationView() {
	//const [input, setInput] = useState("");
	const [error, setError] = useState("");
	let [response, setResponse] = useState("");

	const [list, setList] = useState({
		name: "",
		occasion: "",
		present: "",
		url: ""
	});

	const handleInputChange = event => {
		const name = event.target.name;
		const value = event.target.value;

		setList({
			...list,
			[name]: value
		});
	};
	//handleSubmit saves the information that I write on my input and resets the form
	const handleSubmit = event => {
		event.preventDefault(); //prevents from refreshing
		postList(list.name, list.occasion, list.present, list.url) //sending the input info to the back end
			//the back end is gonna return an answer with the listId (used on post back end)
			.then(fetchResponse => {
				//the api returns the id that it's created
				console.log(fetchResponse.listId);
				setResponse(fetchResponse.listId);
			})

			.catch(error => {
				setError(`List was not created: ${error}`); //in case of error returns it
			});

		setList({
			//reset the form
			name: "",
			occasion: "",
			present: "",
			url: ""
		});
	};
	return (
		<div>
			<div>
				<h2>Crie a sua lista</h2>
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name: </label>
					<input name="name" onChange={handleInputChange} value={list.name} placeholder="Your name" />
				</div>
				<div>
					<label>Occasion: </label>
					<input name="occasion" onChange={handleInputChange} value={list.occasion} placeholder="e.g: Bday" />
				</div>
				<section>
					<div>
						<label>Present: </label>
						<input
							name="present"
							onChange={handleInputChange}
							value={list.present}
							placeholder="Present that you want"
						/>
					</div>
					<div>
						<label>Link: </label>
						<input
							name="url"
							onChange={handleInputChange}
							value={list.url}
							placeholder="Link to buy the present"
						/>
					</div>
				</section>
				<button type="submit" className="submit-button">
					Submit
				</button>
				<button type="button" className="add-more">
					Add more presents
				</button>
			</form>
			{response ? <a href={`/view-presents?list_id=${response}`}>List created!</a> : null}
			{error ? <h1>{error}</h1> : null}
		</div>
	);
}
