import './App.css';
import Routes from './Routes';
import {useSelector} from "react-redux"
import Login from "./pages/Login"
import Sidebar from './component/Sidebar';
import {Container,Col,Row} from 'react-bootstrap'
import Navbar from './component/Navbar';

function App() {

  const isLoggedin = useSelector(state =>state.isLoggedin);
  return (
    <div>
     {isLoggedin? <Sidebar router={<Routes/>}/> :<Login/>}
    </div>
  );
}

export default App;
