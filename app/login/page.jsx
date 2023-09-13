// import React from 'react'

// BEM Box,elemnt,modifier

const page = () => {
  return (
    <div className="loginpage">
      <section className="loginpage-login">
        <div className="loginpage-login-1">
          <input type="text" placeholder="enter the email"/>
          <input type="text" placeholder="enter the password"/>
        </div>
        <div className="loginpage-login-2">

        </div>
        <button>Sign in</button>
        <button>Sign up with email</button>
        <button>Use Google</button>
        <button>Use Microsoft</button>
      </section>
    </div>
  )
}

export default page