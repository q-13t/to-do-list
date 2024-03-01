import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact to='\'></Route>
                    <Route to='\:user'></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;