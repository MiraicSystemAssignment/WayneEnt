import mainLayout from "./layouts/admin/mainLayout";
import NewClub from "./Views/admin/NewClub";
import Login from "../src/Views/admin/Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Clubs } from "./Views/admin/Clubs";


function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" Component={Login}/>
      <Route path="/home" Component={mainLayout}>
        <Route index path="/home/new" Component={NewClub}/>
        <Route exact path="/home/clubs" Component={Clubs} />
      </Route>
    </Routes>
    </Router>
    </div>
  )
}

export default App
