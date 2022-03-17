import React, { useState } from "react"
import "./signup.css"
import { useNavigate } from "react-router-dom"

const Signup = () => {

    const history = useNavigate()

    const [ user, setUser] = useState({
		username: "",
		first_name: "",
		last_name: "",
        email:"",
        password:"",
        password1: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const signup = () => {
        const { username, first_name, last_name, email, password, password1 } = user
        
		let stcode=200
        if(password !== password1){
			alert("Passwords does not match")
			return
		}
		if(username && first_name && last_name && email && password && password1){
			fetch("https://app-a4k48.ondigitalocean.app/signup/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username,
					first_name,
					last_name,
					email,
					password,
					password1
				})
			})
			.then(res => {
				// if(!res.ok && res.status < 500){
				// 	// alert(res.map(err => err.message))
				// 	console.log(res.json())
				// 	// for (const key in res.de) {

				// 	// 	alert(`${key}: ${user[key]}`);
				// 	// }
				// 	throw new Error(res.statusText)
				// }
					
				stcode = res.status
				// console.log(res.status)
				return res.json()
			})
			.then(data => {
				// console.log(data)
				if(data.error){
					alert(data.error)
				}
				else if((stcode <500 && stcode >300) || stcode <200){
					// alert(data)
					let pr = ""
					 for (const key in data) {

					 	pr += (`${key}: ${data[key]}`) + "\n";
					 }
					 alert(pr)
				}
				else{
					// console.log(data)
					alert("Successfully signed up")
					history("/login")
				}
			})
			.catch(err =>
				{

					if(stcode === 500){
						alert("Successfully signed up")
						history("/login")
					}
					else{
						alert(err)
					}
				} )
		}
		else{
			alert("Please fill all the fields")
		}


        
    }

    return (
        <div className="signup">
            <h1>signup</h1>
			<input type="text" name="username" value={user.username} placeholder="Your Name" onChange={ handleChange }></input>
			<input type="text" name="first_name" value={user.first_name} placeholder="First Name" onChange={ handleChange }></input>
			<input type="text" name="last_name" value={user.last_name} placeholder="Last Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="password1" value={user.password1} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <button onClick={signup} >Signup</button>
			
            <div>Already have an account?</div>
            <button onClick={() => history("/login")}>Login</button>
        </div>
    )
}

export default Signup