import express from "express";
import cors from "cors";

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

const addUser = (user) => {
	console.log("addUser");
	let newId = (Math.floor(Math.random()*1000000)).toString();
	user.id = newId;
	users["users_list"].push(user);
	console.log(user);
	return user;
}

app.post("/users", (req, res) => {
	console.log("post user");
	const toAdd = req.body;
	addUser(toAdd);
	let added = findName(toAdd.name);
	//console.log(added);
	if (added === undefined){res.status(400).send("Add user failed.");}
	else res.status(201).send(added);
});

const findName = (name) => {
	//console.log("Name");
	return users["users_list"].filter(
	(user) => user["name"] === name
	);
};

const findJob = (job) => {
	return users["users_list"].filter(
	(user) => user["job"] === job
	);
};

app.get("/users", (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	if (name != undefined && job != undefined){
		let result = findName(name).filter((user) => user["job"] === job);
		res.send(result);
	}else if(name != undefined && job === undefined){
		let result = findName(name);
		result = { users_list: result };
		res.send(result);
	}else if(name === undefined && job != undefined){
		let result = findJob(job);
		result = { users_list: result };
		res.send(result);
	}else{	
		res.send(users);	
	}
});

app.delete("/users/:id", (req, res) => {
	//console.log("Delete call");
	const id = req.params.id
	let result = findID(id);
	if (result === undefined){
		console.log("delete failed");
		res.status(404).send("User not found.");
	}else{
		//res.send(result);
		const updated = users['users_list'].filter( (user) => user["id"] !== id);
		users['users_list'] = updated;
		console.log("delete successful");
		res.status(204).send("User deleted.");
	}
});

const findID = (id) => 
	users["users_list"].find((user) => user["id"] === id);
	
app.get("/users/:id", (req, res) => {
	const id = req.params.id
	let result = findID(id);
	if (result === undefined){
		res.status(404).send("Resource not found.");
	}else{
		res.send(result);
	}
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};