import React, { useEffect, useState } from 'react'
import "./Home.scss";
import axios from 'axios';
import {BsPlusLg} from 'react-icons/bs'
import {AiFillPlayCircle} from 'react-icons/ai'
//import { Link } from 'react-router-dom';

const apiKey="70bd301f6c01c0b4d8b2c31cecf9b9b1";
const url ="https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming ="upcoming";
const nowPlaying ="now_playing";
const popular="popular";
const topRated="top_rated";


const Card =({img})=>(
<img className='card' src={img} alt="cover"/>
)

const Row =({title,
  arr=[]
})=>(
<div className='row'>
<h2>{title}</h2>

<div>
{
  arr.map((item,index)=> (
<Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
))
  }
</div>
</div>
)

const Home = () => {

const [upcomingMovies,setUpcomingMovies] = useState([])
const [nowPlayingMovies,setnowPlayingMovies] = useState([])
const [popularMovies,setpopularMovies] = useState([])
const [topRatedMovies,settopRatedMovies] = useState([])
//  const [genre,setGeners] = useState([])
 useEffect(() => {
  const fetchUpcoming=async()=>{
   const {data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=1`);
   setUpcomingMovies(results)
  }
  const fetchNowplaying=async()=>{
    const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&language=en-US&page=1`);
    setnowPlayingMovies(results)
   }
   const fetchPopular=async()=>{
    const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}&language=en-US&page=1`);
    setpopularMovies(results)
   }
   const fetchToprated=async()=>{
    const {data:{results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}&language=en-US&page=1`);
    settopRatedMovies(results)
   }
    //  const fetchGeneres=async()=>{
    //   const {genres} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
    //   setGeners(genres)
    //  }
    //  fetchGeneres()

   fetchUpcoming()
   fetchNowplaying()
   fetchPopular()
   fetchToprated()
}, []);
 
 



  return (
<section className='home'>

<div className="banner" style={{
  backgroundImage:popularMovies[0] ?`url(${`${imgUrl}/${popularMovies[0].poster_path}`})` :"none"
}}>

{
  popularMovies[0] &&
 (
  <h1>{popularMovies[0].original_title}</h1> 

 ) 
}
{
  popularMovies[0] &&
 (
  <p>{popularMovies[0].overview}</p>

 ) 
}
 <div>
  <button>Play <AiFillPlayCircle/></button>
  <button>My List <BsPlusLg/></button>
  </div>
</div>
  
  <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
  <Row title={"Now Playing Movies"} arr={nowPlayingMovies}/>
  <Row title={"Popular Movies"} arr={popularMovies}/>
  <Row title={"Top Rated Movies"} arr={topRatedMovies}/>
  
   {/* <div className="genreBox">
    {
      genre.map((item,index)=>(
        <Link key={index} to={`/genre/${item.id}`}>{item.name}</Link>
      ))
    }
  </div> */}
</section>  )
}

export default Home;