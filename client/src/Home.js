import React from "react";
import "./Home.css";

export default function Home() {
	return (
		<div className="home-container">
			<div>
				<h2 className="sub-title">BEM VINDIS</h2>
			</div>
			<div>
				<a href="/create">
					<h2> Crie sua lista </h2>
				</a>
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
