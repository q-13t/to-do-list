import { useNavigate } from 'react-router-dom';
// REMEMBER: Add Styling to the page
const HomePage = () => {
    let navigate = useNavigate();


    let handleStart = () => {
        navigate('/todo');
    }

    return (
        <div className="home-page">
            <h2>Welcome</h2>
            <p>Using this tool you can organize your day with simple To-Do list!</p>
            <button onClick={() => handleStart()}>Begin!</button>
        </div>
    );
}

export default HomePage;