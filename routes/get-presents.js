const express = require("express");
const router = express.Router();
const db = require("../model/helper");

/* GET presents. */
/* router.get("/", (req, res) => {
	res.send("No back end a gente vai acessar a lista de presentes");
});
 */
async function getPresents(id) {
	//const getId = req.query.id;
	const idAsNumber = parseInt(id); // Using parseInt to make sure there is no SQL command injected by hackers
	const result = await db(`SELECT name,url FROM presents WHERE id=${idAsNumber};`);
	return result.data;
}

router.get("/get-presents", async (req, res) => {
	// Send back the full list of presents
	try {
		res.send(await getPresents(req.query.id));
	} catch (err) {
		res.status(500).send("Something went wrong");
	}
	/* db(`"SELECT name,url FROM presents WHERE id="${req.query.id}";"`)
		.then(results => {
			res.send(results.data);
		})
		.catch(err => res.status(500).send(err)); */
});

//router.get("/", getPresents);

module.exports = router;
