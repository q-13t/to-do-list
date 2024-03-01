import { useNavigate } from 'react-router-dom';
// REMEMBER: Add Styling to the page
const HomePage = () => {
    let navigate = useNavigate();


    let handleStart = () => {
        navigate('/login');
    }

    return (
        <div className="home-page">
            <h2>Welcome</h2>
            <p>Using this too ou can organize your day with simple todo-list!</p>
            <button onClick={() => handleStart()}>Begin!</button>
        </div>
    );
}

export default HomePage;