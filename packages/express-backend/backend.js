import express from "express";
import cors from "cors";
import user from './user-services.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.post("/users", (req, res) => {
	console.log("post user");
	const toAdd = req.body;
	user.addUser(toAdd).then((data) => {
		res.status(201).send(data);
	}).catch((error) => {
		console.log(error);
		res.status(400).send("Add user failed.");
		});
});

app.get("/users", (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	user.getUsers(name, job).then((data) => {
		res.send({ users_list: data });
	}).catch((error) => {
		console.log(error);
		res.status(500).send();
	});

});

app.delete("/users/:id", (req, res) => {
	console.log("Delete call");
	const id = req.params.id
	
	user.removeUserByID(id).then((data) => {
		console.log(data);
		if(data === undefined){
			return res.status(404).send("User not found.");
		}else{res.status(204).send("User deleted");}
	}).catch((error) => {
		console.log(error);
		res.status(500).send();
	});
});
	
app.get("/users/:id", (req, res) => {
	const id = req.params.id
	
	user.findUserById(id).then((data) => {
		console.log(data);
		let result = data;
		if (result === undefined){res.status(404).send("Resource not found.");
		}else{res.send(result);}
	}).catch((error) => {
		console.log(error);
		res.status(404).send("Resource not found.");
	});

});
