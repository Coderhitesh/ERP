import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <>
        <section className="login">
            <div className="container">
                <form action="">
                    <h2>Login Your <span>ERP</span> Account</h2>
                    <input type="email" name="email" placeholder="Email :" />
                    <input type="text" name="password" placeholder="Password :" />

                    <button type="submit">LOGIN</button>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login