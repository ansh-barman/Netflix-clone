import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import requests from '../Requests';
import tmdb from '../components/tmdb';
import MovieCard from '../components/MovieCard';

export default function Tvshows() {
  

    const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  const [isScrolled, setIsScrolled] = useState(false);

    const [movies,setMovies] = useState([])

    useEffect(()=>{
      const fetchMovies = async()=>{
        const {data} = await tmdb.get("tv/popular")
        setMovies(data.results)
      }

      fetchMovies()
  },[])



  const navigate = useNavigate()

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null)
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

    return (
        <Container>
          <Navbar isScrolled={isScrolled} />
    
          <header className='banner'
            style={{
              backgroundSize: "cover",
              // backgroundImage: `url("https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
              backgroundPosition: "center center",
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            }}
          >
            <div className="container">
              <div className="title">
                <h1 className='banner_title'>
                  {movie?.title || movie?.name || movie?.original_name}
                </h1>
              </div>
              <div className='desc'>
                <p>
                  {truncate(
                    movie?.overview,  150
                  )}
                </p>
              </div>
    
              <div className="buttons flex">
                <button className='flex j-center a-center' onClick={() => navigate('/player')}>
                  <FaPlay />Play
                </button>
                <button className='flex j-center a-center'>
                  <AiOutlineInfoCircle />More Info
                </button>
              </div>
            </div>
            
            <div className="banner--fadeBottom" />
          </header>
          <div className='flex pb-5 px-5 overflow-x-auto'>
            {movies.map((movie,index)=>{
              return <MovieCard key = {index} {...movie} />
            })}
          </div>
        </Container>
      )
    }
const Container = styled.div`


background-color: #000000;
  .banner{
    position: relative;
    height: 758px;
    filter: brightness(80%);
    object-fit: contain;
  }
  .container{
    position: absolute;
    margin-left: 60px;
    padding-top: 385px;
    height: 190px;
    }
  .banner_title{
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
  }
  /* .logo{
      img{
      width: 25vw;
      height: 15vh;
      object-fit: contain;
    }
    } */
    .desc{
      /* margin: 0.1rem; */
      object-fit: contain;
      p{
        width: 45rem;
        line-height: 1.3;
        font-size: 0.8rem;
        padding-top: 1rem;
        max-width: 360px;
        height: 80px;
      }
    }
    
    .buttons{
      margin-top: 0.4rem;
      gap: 2rem;
      object-fit: contain;
      button{
       font-size: 1rem;
       gap: 1rem;
       border-radius: 0.3rem;
       padding: 0.5rem;
       padding-left: 1rem;
       padding-right: 2rem;
       border: none;
       cursor: pointer;
       transition: 0.3s ease-in-out;
       &:hover{
        opacity: 0.8;
      }
       &:nth-of-type(2){
       background-color: rgb(109, 109, 110, 0.7);
       color: white;
       svg{
         font-size: 1.8rem;
       }
      } 
    }
  }
  .banner--fadeBottom{
    height: 7.4rem;
    background-image: linear-gradient(
      360deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }


`;