var express = require('express');
var router = express.Router();
const pool = require("../db");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
      const { rows } = await pool.query("SELECT * FROM usuarios ORDER BY id ASC");
      res.json(rows)
  } catch (err) {
      console.error(err.message);
      res.json(err.message);
  }
});

/* POST a user listing. */
router.post("/", async(req,res) => {
  try{
      const { nombre } = req.body;
      const newUser = await pool.query("INSERT INTO usuarios (nombre) VALUES ($1) RETURNING *", [ nombre ]);       
      res.json(newUser.rows[0]);
  }catch (err) {
      console.error(err.message);
      res.status(500).send({ error: err.message });
  }
});

/* PUT a user listing. */
router.put("/:id", async(req,res) => {
  try {
      const { id } = req.params;
      const { nombre } = req.body;
      const updateUser = await pool.query("UPDATE usuarios SET nombre = $1 WHERE id = $2 RETURNING *",[nombre, id]);
      console.log(updateUser.rows[0])
      res.json(updateUser.rows[0]);        
  } catch (err) {
      console.error(err.message);
      res.json(err.message);
  }
});

/* DELETE a user listing. */
router.delete("/:id", async(req,res) =>{
  try {
      const { id } = req.params;
      const deleteUser = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id])
      console.log(deleteUser.rows[0])
      res.json(deleteUser.rows[0])
  } catch (err) {
      console.error(err.message);  
      res.json(err.message);      
  }
});


module.exports = router;
