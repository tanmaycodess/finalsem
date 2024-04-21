import './Loader1.css';

const Loader1 = () => {
    return (
        <div className="card">
            <h1>Welcome To Pictify!</h1>
            <p >please wait...</p>
            <p>While We Fetch Your Work</p>
            <div className='loader'>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default Loader1;
