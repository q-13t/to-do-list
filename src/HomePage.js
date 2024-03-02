import { useNavigate } from 'react-router-dom';
// REMEMBER: Add Styling to the page
const HomePage = () => {
    let navigate = useNavigate();

    // TODO: Redirect user to to-do list if logged in
    console.log("username", sessionStorage.getItem("username"));
    console.log("user logged in? ", sessionStorage.getItem("username") !== null);

    let handleStart = () => {
        navigate('/login');
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