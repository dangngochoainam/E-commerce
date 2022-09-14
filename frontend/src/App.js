import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [newUser, setNewUser] = useState({
    createdAt: "2022-09-04 18:59:59",
    updatedAt: "2022-09-04 18:59:59",
    username: "",
    password: "",
    email: "",
  });
  const avatar = useRef();

  const change = (obj) => {
    setNewUser({
      ...newUser,
      ...obj,
    });
  };

  const register = async (event) => {
    event.preventDefault();

    let data = new FormData();
  
    data.append("username", newUser.username);
    data.append("createdAt", newUser.createdAt);
    data.append("updatedAt", newUser.updatedAt);
    data.append("password", newUser.password);
    data.append("email", newUser.email);
    data.append("avatar", avatar.current.files[0]);

    try {
      
      let temp = {
        username: data.get("username"),
        password: data.get("password"),
        email: data.get("email"),
        createdAt: data.get("createdAt"),
        updatedAt: data.get("updatedAt"),
        avatar: data.get("avatar"),
      }
console.log(temp);
      const response = await fetch("http://localhost:8080/v1/ecommerce/users", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
       
        headers: {
          'Content-Type': "multipart/form-data",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    
        body:  JSON.stringify(temp) // body data type must match "Content-Type" header
      });
      const res = await response.json();
      console.log(res) // parses JSON response into native JavaScript objects
    
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <form method="post" onSubmit={register} encType="multipart/form-data">
        <input
          type="text"
          value={newUser.username}
          onChange={(evt) => change({ username: evt.target.value })}
        />
        <input
          type="password"
          value={newUser.password}
          onChange={(evt) => change({ password: evt.target.value })}
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(evt) => change({ email: evt.target.value })}
        />
      
        <input type="file" name="avatar" ref={avatar} />

        <input type="submit" value='Dang ky' />
      </form>
    </div>
  );
}

export default App;
