import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './NotFound';
import HomePage from './HomePage';
import ToDo from './ToDo';
import Login from './Login';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route exact path='/login' element={<Login />}></Route>// TODO: Implement login page
                    {/* <Route exact path='/todo' element={<ToDo />}></Route> */}
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;

// Important RUN: npm install

// To start react server do: npm start
// To start json server do: npx json-server --watch data-base/db.json -p 8000

// NOTE: press Ctrl + C to cancel both or simply close the terminal