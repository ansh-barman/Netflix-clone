import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [formValues, setformValues] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/")
  })

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title flex">
              <h1>Sign In</h1>
            </div>
            <div className="container flex column">
              <input type="email" placeholder='User Email' name='email'
                value={formValues.email}
                onChange={(e) =>
                  setformValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {

                <input type="password" placeholder='Password' name='password'
                  value={formValues.password}
                  onChange={(e) =>
                    setformValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

              }
              {
                <button onClick={handleLogIn}>Sign In</button>
              }
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  .content{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container{
     gap: 2rem;
     height: 85vh;
     .form{
      padding: 2rem;
      background-color: #000000b0;
      width: 20vw;
      height: 65vh;
      gap: 2rem;
      color: #ffffff;
      .container{
       gap: 1rem;
       input{
       padding: 1rem 1rem;
       width: 16rem;
       background-color: rgb(50,51,50);
       border: none;
       border-radius: 3px;
       font-weight: bold;
       color: #ffffff;
       }
       button{
       margin-top: 20px;
       padding: 1rem 1rem;
       background-color: #e50914;
       border: none;
       cursor: pointer;
       color: white;
       border-radius: 0.2rem;
       font-weight: bolder;
       font-size: 1.05rem;
      } 
    }
  }
}}
`