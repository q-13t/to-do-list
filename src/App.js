import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './NotFound';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={<p>main page</p>}></Route>// TODO: Implement main page
                    <Route exact path='/login' element={<p>login page</p>}></Route>// TODO: Implement login page
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;