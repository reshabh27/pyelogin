import React from 'react'

export const Mainpage = ({setLoginuser}) => {
	

  return (
	<div>
		<h1>Mainpage</h1>
		<button onClick={() => setLoginuser(null)}>Logout</button>
	</div>
  )
}
