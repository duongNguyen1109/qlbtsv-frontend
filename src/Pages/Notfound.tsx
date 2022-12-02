import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface NotfoundProps {

}

const Notfound: FunctionComponent<NotfoundProps> = () => {
    const navigate = useNavigate();

    return (
        <div style={{ height: '100vh' }} className='text-center'>
            <div className="position-absolute top-50 start-50 translate-middle pb-5">
                <div className="notfound-text-img text-center">Oops!!</div>
                <h3 className="fw-bolder">404 - PAGE NOT FOUND</h3>
                <p className="text-secondary mb-4 px-5">
                    The page you are looking for might been removed had its name changed or
                    is temporarily unavailable
                </p>
                <button className="btn btn-lg text-white rounded-pill px-4" style={{ backgroundColor: 'rgb(24, 74, 148)' }} onClick = {() => navigate('/')}>
                    Go to homepage
                </button>
            </div>
        </div>
    );
}

export default Notfound;