import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './NotFound';
import HomePage from './HomePage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route exact path='/login' element={<p>login page</p>}></Route>// TODO: Implement login page
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;