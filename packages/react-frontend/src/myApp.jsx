import React, {useState, useEffect} from 'react';
import Form from "./Form";
import Table from "./Table";

function MyApp() {
	
	const [characters, setCharacters] = useState([]);
	
	function removeOneCharacter(index) {
		//const deleted = characters[index];
		console.log("delete user");
		const promise = fetch(`http://localhost:8000/users/${index}`,{
			method: "DELETE"
		});
		promise.then(() => {
			fetchUsers()
				.then((res) => res.json())
				.then((json) => setCharacters(json["users_list"]));
				
		});
    }

	function updateList(person) {
		postUser(person)
		.then((response) => {
			if(response.status != 201){
				console.error("Post failed");
				throw new Error(response.json());
			}else{
				//person = response.json()
				return response.json();
			}
		})
		.then((data) => {
			console.log(data);
			setCharacters([...characters, data[0]])
		})
		.catch((error) => {console.log(error);})
	}
	
	function fetchUsers(){
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}
	
	useEffect(() => {
		fetchUsers().then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => {console.log(error);});
	}, []);
	
	function postUser(person) {
		console.log("post");
		const promise = fetch("Http://localhost:8000/users", {
			method: "POST",
			headers: {"Content-Type": "application/json",},
			body: JSON.stringify(person),});
		return promise;
  }
	
	return (
	  <div className="container">
		<Table
		  characterData={characters}
		  removeCharacter={removeOneCharacter}
		/>
		<Form handleSubmit={updateList}/>
	  </div>
	);
}
export default MyApp;