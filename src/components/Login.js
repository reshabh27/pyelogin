import React, {useState} from "react"
import "./login.css"
import { useNavigate } from "react-router-dom"

const Login = ({ setLoginUser}) => {

    const history = useNavigate()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login2 = () => {
		let stcode=0
		const { email, password } = user
		if(email && password){
			fetch("https://app-a4k48.ondigitalocean.app/login/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email,
					password
				})
			})
			.then(res => {
				stcode = res.status
				// console.log(res.status)
				return res.json()
			})
			.then(data => {
				// console.log(data)
				if(stcode === 400){
					let pr = ""
					 for (const key in data) {

					 	pr += (` ${data[key]}`) + "\n";
					 }
					 alert(pr)
				}
				else if(data.error){
					alert(data.error)
				}
				else
				{
					setLoginUser(data)
					history.push("/")
				}
			})
			.catch(err => console.log(err))
		}
		else{
			alert("Please enter email and password")
		}
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <button onClick={login2}>Login</button>
            <div>dont have an account?</div>
            <button onClick={() => history("/signup")}>Register</button>
        </div>
    )
}

export default Login