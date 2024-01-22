import mainLayout from "./layouts/admin/mainLayout";
import NewClub from "./Views/admin/NewClub";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" Component={mainLayout}>
        <Route index path="/new" Component={NewClub}/>
      </Route>
    </Routes>
    <Route exact path="/clubs" Component={Clubs} />
    </Router>
  )
}

export default App
