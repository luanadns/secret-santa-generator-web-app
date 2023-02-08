import React, { useState, useEffect } from "react";

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
	const [addList, setAddList] = useState(null);

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
		/*  if button = submit
            else return handleSubmit2 function 
         */

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
	//The useEffect can be called only once and automatically loads.
	//useEffect to get entire list, then check with console.log(list[-1]) to access last item submitted
	useEffect(() => {
		const getLastList = async () => {
			let response = await fetch("/create");
			let data = await response.json();
			setAddList(data);
		};
		getLastList();
		/* fetch(`http://localhost:5000/create`)
			.then(res => res.json())
			.then(res => {
				// upon success, update tasks
				setAddList(res);
				console.log("This is addList", res);
			})
			.catch(err => {
				// upon failure, show error message
				console.log(err);
				setError(`Oops! Couldn't get the presents list. ${err.message}`);
			}); */
	}, []); //putting the info inside of the empty array

	//this is for add more presents
	const handleSubmit2 = event => {
		event.preventDefault(); //prevents from refreshing

		postList(list.name, list.occasion, list.present, list.url) //sending the input info to the back end
			//the back end is gonna return an answer with the listId (used on post back end)
			.then(fetchResponse => {
				//the api returns the id that it's created
				console.log(fetchResponse.listId);
				setResponse(fetchResponse.listId);
			})

			.catch(error => {
				setError(`List was not created: ${error}`); //in case of error returns the error
			});
		getLastList();

		setList({
			//reset the form
			name: addList[-1].name, //the addList[-1] is taking the last info that had on my input
			occasion: addList[-1].occasion,
			present: "",
			url: ""
		});
	};

	return (
		<div>
			<div>
				<h2>Start your list</h2>
			</div>
			<form>
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
				<button onClick={() => handleSubmit()} type="submit" className="submit-button">
					Submit
				</button>
				<button onClick={() => handleSubmit2()} type="click" className="add-more">
					Add more presents
				</button>
			</form>
			{response ? <a href={`/view-presents?list_id=${response}`}>List created!</a> : null}
			{error ? <h1>{error}</h1> : null}
		</div>
	);
}
