const express = require("express");
const router = express.Router();
const db = require("../model/helper");

router.get("/", async (req, res) => {
	try {
		const result = await db("SELECT * from lists");
		const lists = result.data;

		res.send(lists);
	} catch (err) {
		res.status(500).send("Something went wrong");
	}
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const result = await db(`SELECT * from lists WHERE id = ${id}`);
		const lists = result.data;
		const list = lists[0];

		if (!list) {
			res.status(404).send();
			return;
		}
		const presentId = req.params.id;
		const presentResult = await db(`SELECT * from presents WHERE list_id = ${presentId};`);
		list.presents = presentResult.data;

		res.send(list);
	} catch (err) {
		res.status(500).send("Something went wrong");
	}
});

//router.get("/:id/presents", async (req, res) => {});

/*
router.post is gonna add a list, 
save the last id added,
add the presents,
return the list id to the client 
 */
router.post("/", async (req, res) => {
	const owner = req.body.owner;
	const name = req.body.name; //name of the ocasion
	const addPerson = await db(`INSERT INTO lists (owner, name) VALUES ("${owner}", "${name}");`);
	//now I need to add the presents to the list
	if (addPerson.insertId) {
		const insertId = addPerson.insertId;
		const presentName = req.body.presentName;
		const url = req.body.url;
		await db(`INSERT INTO presents (name, url, list_id) VALUES ("${presentName}", "${url}", ${insertId});`);
		res.send({ listId: insertId });
	} else {
		res.send("Could not insert list");
	}
});

module.exports = router;
