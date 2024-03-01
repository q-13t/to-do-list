import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    let navigate = useNavigate();

    let handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="not-found">
            <h3>Not Found</h3>
            <h4>This page is missing</h4>
            <button onClick={() => handleGoHome()}>Home</button>
        </div>
    );
}

export default NotFound;