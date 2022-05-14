import CustomNavbar from './components/navbar';
import SignIn from './pages/signin';
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import SignUp from './pages/signup';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar />
      
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
