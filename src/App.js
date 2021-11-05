
import './App.css';
import Routes from './Routes';
import {useSelector} from "react-redux"
import Login from "./pages/Login"

function App() {

  const isLoggedin = useSelector(state =>state.isLoggedin);
  return (
    <div className="App">
     {isLoggedin? <Routes/>:<Login/>}
    </div>
  );
}

export default App;
