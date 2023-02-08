import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="home-container">
			<div>
				<h2 className="sub-title"> A Place For All Your Wishes</h2>
			</div>
			<div>
				<Link to={"/create"}>
					<button type="click">
						<h2>I want to create a wishlist!</h2>
					</button>
				</Link>
			</div>
			<div>
				<h3>
					Here you can create your wishlist to share with friends and family, no more awkward conversations
					bla bla bla bla
				</h3>
			</div>
		</div>
	);
}
