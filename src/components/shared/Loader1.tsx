import './Loader1.css';

const Loader1 = () => {
    return (
        <div className="card">
            <h1>Welcome To Pictify!</h1>
            <p >please wait...</p>
            <p>While We Fetch Your Work</p>
            <div className='camera-loader'>
                <div className='camera'>
                    <div className='lens'></div>
                    <div className='loader-circle'></div>
                    <div className='loader-circle' style={{ animationDelay: '0.3s' }}></div>
                    <div className='loader-circle' style={{ animationDelay: '0.6s' }}></div>

                </div>
            </div>
        </div>
    );
}

export default Loader1;

