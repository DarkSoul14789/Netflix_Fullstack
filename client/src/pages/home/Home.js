import './Home.scss'
// import { AcUnit } from '@mui/icons-material';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured.js';
import List from '../../components/list/List.js';
const Home = () => {
  return (

    <div className='home'>
      <Navbar />
      <Featured type="movie"/>
      <List />
      <List />
      <List />
      <List />
      <List />
    </div>

  )
}
export default Home