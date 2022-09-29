import './App.css';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase-config'

function App() {
  // creating 4 states to handle thebinformation passed through by the user for auth

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    //ln17 is very similar to useState. It is a hook that passes auth and recieves a callback func (currentUser) every time they change who's logged in
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    })
  }, [])



  //These functions will mostly return a promise when dealing with firebase. You can approach two methods; .then and .catch, or async await 
  const register = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user)
      //This is returning a promise and the await will add the new user to our database and will also log you in. The user information will also be stored in this variable
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user)
      //This is returning a promise and the await will add the new user to our database and will also log you in. The user information will also be stored in this variable
    } catch (error) {
      console.log(error.message);
    }
  };


  const logout = async () => {

    await signOut(auth);
  }
  return (
    <div className="App">
      <div>
        <form name='resgisterUSer' onSubmit={register}>
          <h3> Register User</h3>
          <input placeholder='Email...'
            type='email'
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input placeholder='Password...'
            type='password'
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />

          <button>Create User</button>
        </form>
      </div>

      <div>
        <form name='Login' onSubmit={login}>
          <h3> Login</h3>
          <input placeholder='Email...'
            type='email'
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input placeholder='Password...'
            type='password'
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          <button> Login</button>
        </form>
      </div>

      <h4>User Logged In:</h4>
      {user.email}
      <form name='signOut' onSubmit={logout}>
        <button>Sign Out</button>
      </form>
    </div>
  );
}

export default App;
