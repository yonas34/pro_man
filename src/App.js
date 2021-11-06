import './App.css';
import Routes from './Routes';
import {useSelector} from "react-redux"
import Login from "./pages/Login"
import Sidebar from './component/Sidebar';


function App() {

  const isLoggedin = useSelector(state =>state.isLoggedin);
  return (
    <div>
     {isLoggedin? <Sidebar router={<Routes/>}/> :<Login/>}
    </div>
  );
}

export default App;
