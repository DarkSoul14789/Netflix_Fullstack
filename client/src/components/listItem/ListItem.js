import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import './listItem.scss'

const ListItem = ({index , item}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  
  useEffect(() => {
    let abortController = new AbortController();
    const getMovie = async ()=>{
      try {
        const res = await axios.get("/movie/find/"+item,{
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzY1YTZlZjBhYTlhNjRmNmFlODYwYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQwNTY2NiwiZXhwIjoxNjU1ODM3NjY2fQ.vKDDaZhM_Eyle9kOlYmjCOxyQgr9WZFS1lK8NzwvEcE"
          }
        });
        // console.log(res.data[0])
        setMovie(res.data[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovie();
    return () => {
      abortController.abort();
    }
  }, [item]);
  
  return (
    <Link to='/watch' state={{movie:movie}}>

    <div className='ListItem' 
    style={{left: isHovered && index * 225-50 + index*2.5}}
    onMouseEnter={()=>setIsHovered(true)} 
    onMouseLeave={()=>setIsHovered(false)}
    >
      <img src={movie.img}
        alt="" />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay loop/>
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className='icon'/>
              <Add className='icon'/>
              <ThumbUpAltOutlined className='icon'/>
              <ThumbDownOutlined className='icon'/>
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className='limit'>+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="description">
              {movie.desc} 
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  )
}

export default ListItem