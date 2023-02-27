import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import {  FaSearch } from "react-icons/fa";
// FaPowerOff
export default function Navbar({ isScrolled }) {

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tvshows" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  const navigate = useNavigate(); 
  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(!currentUser) navigate("/signup")
  })
  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            {/* <FaPowerOff /> */}
            <img src="http://occ-0-2085-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdYJV5wt63AcxNaDoqDXUhqZb55oN5Dxt1m-Zdn_z5rn_hIq9m8dA8JB2xdcPmrY3yXnlVWYKPXnOrbv2QN4aEVU28dESJg.png?r=1d4" alt="" />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`

.scrolled{
    background-color: #101110;
}

nav{
    position: sticky;
    top: 0;
    height: 4.3rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 3rem;
    align-items: center;
    transition: 0.3s ease-out;
    .left{
        gap: 2rem;
        .brand{
            img {
                height: 3rem;
                cursor: pointer;
            }
        }
        .links{
            list-style-type: none;
            gap: 1.5rem;
            font-size: 14px;
         li{
            a{
                color: white;
                text-decoration: none;
            }
         }
        }
    }
    .right{
        gap: 1rem;
        button{
            background-color: transparent;
            cursor: pointer;
            padding-top: 0.4rem;
            border: none;
            &:focus{
                outline: none;
            }
            img{
                border: none;
                border-radius: 4px;
            }
        }
        .search{
            display: flex;
            gap: 0.4rem;
            align-items: center;
            justify-content: center;
            padding: 0.2rem;
            padding-left: 0.5rem;
            padding-top: 0.3rem;
            padding-bottom: 0.4rem;
            button{
                background-color: transparent;
                svg{
                    color: white;
                }
            }
            input{
                width: 0;
                opacity: 0;
                visibility: hidden;
                transition: 0.3s ease-in-out;
                background-color: transparent;
                border: none;
                color: white;
                &:focus{
                    outline: none;
                }
            }
        }
        .show-search{
            border: 1px solid white;
            border-radius: 5px;
            background-color: rgb(0, 0, 0, 0.6);
            input{
                width: 100%;
                opacity: 1;
                visibility: visible;
                padding: 0.3rem;
            }
        }
    }
}
`;