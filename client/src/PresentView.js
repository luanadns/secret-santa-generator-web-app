import React, { useState, useEffect, Fragment } from "react";

// Component that displays a list of presents
export default function PresentView() {
	const [list, setList] = useState(null);
	const [presentImages, setPresentImages] = useState({});
	const [error, setError] = useState("");
	const searchParams = new URLSearchParams(window.location.search); //variable that holds all query parameters in the browser with ?my_parameter=xxx
	const id = searchParams.get("list_id"); //variable that holds the id

	// Fetches the list of presents and the associated images
	useEffect(() => {
		fetch(`http://localhost:5000/lists/${id}`)
			.then(res => res.json())
			.then(list => {
				// upon success, update tasks
				setList(list);
				// For each present in the list, fetch the image associated with it
				list.presents.forEach(present => {
					fetch(present.url)
						.then(response => {
							response
								.text()
								.then(responseText => {
									// Extract the image URL from the response
									const metaTextStart = '<meta property="og:image" content="'; //communly used in browsers in the images
									const ogImageStart = responseText.indexOf(metaTextStart);
									if (ogImageStart === -1) {
										// If there's no image, use a default one
										setPresentImages(previousPresentImages => ({
											...previousPresentImages,
											[present.id]:
												"https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
										}));
										return;
									}
									const ogImageEnd = responseText.indexOf('">', ogImageStart);
									const ogImageUrl = responseText.substring(
										ogImageStart + metaTextStart.length,
										ogImageEnd
									);
									// Update the presentImages state with the fetched image URL
									setPresentImages(previousPresentImages => ({
										...previousPresentImages,
										[present.id]: ogImageUrl
									}));
								})
								.catch(err => {
									// If there's an error fetching the image, use a default one
									setPresentImages(previousPresentImages => ({
										...previousPresentImages,
										[present.id]:
											"https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
									}));
								});
						})
						.catch(err => {
							// If there's an error fetching the image, use a default one
							setPresentImages(previousPresentImages => ({
								...previousPresentImages,
								[present.id]:
									"https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
							}));
						});
				});
			})
			.catch(err => {
				// upon failure, show error message
				console.log(err);
				setError(`Oops! Couldn't get the presents list. ${err.message}`);
			});
	}, []);

	// Debugging: print the list to the console
	console.log(list);
	//console.log(list.presents[0].name);

	// Renders the list of presents and their associated images

	return (
		<div>
			<h2>View presents</h2>
			{list ? (
				<div>
					<h2>{list.owner}</h2>
					<h3>{list.name}</h3>
					{list.presents.map(present => {
						return (
							<Fragment key={present.id}>
								<h3>{present.name}</h3>
								<a href={present.url} target="_blank">
									<img
										style={{ height: "100px", width: "100px", objectFit: "contain" }}
										src={
											presentImages[present.id]
												? presentImages[present.id]
												: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
										}
										alt={present.name}
									/>
									{present.name}
								</a>
							</Fragment>
						);
					})}
				</div>
			) : null}
			{error ? <h2>{error}</h2> : null}
		</div>
	);
}
