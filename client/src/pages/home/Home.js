import './Home.scss'
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured.js';
import List from '../../components/list/List.js';
import { useState,useEffect } from 'react';
import axios from 'axios';

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async ()=>{
      try{
        const res = await axios.get(
          `lists${type ? "?type="+type : ""}${genre ? '&genre=' + genre:""}`,{
            headers:{
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzY1YTZlZjBhYTlhNjRmNmFlODYwYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQwNTY2NiwiZXhwIjoxNjU1ODM3NjY2fQ.vKDDaZhM_Eyle9kOlYmjCOxyQgr9WZFS1lK8NzwvEcE"
            }
          }
        );
        setLists(res.data);
      }catch(error){
        console.log(error.message);
      }
    }
    getRandomLists();
  }, [type,genre])
  
  return (

    <div className='home'>
      <Navbar />
      <Featured type={type}/>
      {lists.map((list,i) => (
        <List list={list} key={i}/>
      ))}
    </div>

  )
}
export default Home