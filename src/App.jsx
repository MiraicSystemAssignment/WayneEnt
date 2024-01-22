import mainLayout from "./layouts/admin/mainLayout";
import NewClub from "./Views/admin/NewClub";
import Login from "../src/Views/admin/Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" Component={Login}/>
      <Route path="/home" Component={mainLayout}>
        <Route index path="/home/new" Component={NewClub}/>
      </Route>
    </Routes>
    <Route exact path="/clubs" Component={Clubs} />
    </Router>
  )
}

export default App
