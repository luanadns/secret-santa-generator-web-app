import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import ListsCreationView from "./ListsCreationView.js";
import PresentView from "./PresentView.js";
import ListsView from "./ListsView.js";

function App() {
	return (
		<div>
			<header className="page-header">
				<h1 className="header-title">Wishlist Generator</h1>
			</header>
			<main className="main-content">
				<Router>
					<Switch>
						<Route exact path="/">
							{/* initial page */}
							<Home />
						</Route>
						<Route exact path="/create">
							{/* create list of presents */}
							<ListsCreationView />
						</Route>
						<Route exact path="/view-presents">
							{/* view the presents */}
							<PresentView />
						</Route>
						<Route exact path="/lists">
							{/* all lists */}
							<ListsView />
						</Route>
					</Switch>
				</Router>
			</main>
		</div>
	);
}

export default App;
