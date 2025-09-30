// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
	const [person, setPerson] = useState({
		name: "",
		c: "",
		sc: ""
	});
	function handleChange(event) {
		const { name, value } = event.target;
		if (name === "c")
			setPerson({ name: person["name"], c: value, sc: person["sc"] });
		else if(name === "sc")
			setPerson({ name: person["name"], c: person["c"], sc: value});
		else setPerson({ name: value, job: person["c"], sc: person["sc"] });
	}
	function submitForm() {
		props.handleSubmit(person);
		setPerson({name:"",c:"",sc:""});
	}
	return (
	  <form>
		<label htmlFor="name">Name</label>
		<input
		  type="text"
		  name="name"
		  id="name"
		  value={person.name}
		  onChange={handleChange}
		/>
		<label htmlFor="c">Class</label>
		<input
		  type="text"
		  name="c"
		  id="c"
		  value={person.c}
		  onChange={handleChange}
		/>
		<label htmlFor="sc">Subclass</label>
		<input
		  type="text"
		  name="sc"
		  id="sc"
		  value={person.sc}
		  onChange={handleChange}
		/>
		<input type="button" value="Submit" onClick={submitForm} />
	  </form>
	);
}
export default Form;