const express = require("express");
const router = express.Router();
const db = require("../model/helper");

router.get("/", async (req, res) => {
	try {
    const result = await db('SELECT * from lists')
    const lists = result.data

		res.send(lists);
	} catch (err) {
		res.status(500).send("Something went wrong");
	}
});

router.get("/:id", async (req, res) => {
  const id = req.params.id

	try {
    const result = await db(`SELECT * from lists WHERE id = ${id}`)
    const lists = result.data
    const list = lists[0]

    if (!list) {
      res.status(404).send()
      return
    }

		res.send(list);
	} catch (err) {
		res.status(500).send("Something went wrong");
	}
});

router.get("/:id/presents", async (req, res) => {
  const id = req.params.id

	try {
    const result = await db(`SELECT * from presents WHERE list_id = ${id}`)
    const presents = result.data

		res.send(presents);
	} catch (err) {
		res.status(500).send("Something went wrong");
	}
});

router.post("/", async (req, res) => {
  res.send('TODO')
});

module.exports = router;
