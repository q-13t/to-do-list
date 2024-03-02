import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './NotFound';
import HomePage from './HomePage';
import ToDo from './ToDo';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route exact path='/todo' element={<ToDo></ToDo>}></Route>// TODO: Implement login page
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;