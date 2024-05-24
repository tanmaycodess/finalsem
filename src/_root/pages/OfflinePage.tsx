import React, { useState, useEffect } from 'react';

// Define OfflinePage component
const OfflinePage: React.FC = () => {
    // State variables
    const [secretNumber, setSecretNumber] = useState<number | null>(null);
    const [score, setScore] = useState<number>(6);
    const [highscore, setHighscore] = useState<number>(0);
    const [guess, setGuess] = useState<string>('');
    const [message, setMessage] = useState<string>('Start guessing...');
    const [gameWon, setGameWon] = useState<boolean>(false);

    // Function to generate random secret number
    const generateSecretNumber = () => {
        return Math.trunc(Math.random() * 20) + 1;
    };

    // Function to check the user's guess
    const checkGuess = () => {
        const guessNumber = parseInt(guess);
        if (isNaN(guessNumber)) {
            setMessage('⛔️ No number!');
        } else if (guessNumber === secretNumber) {
            setMessage('🎉 Correct Number!');
            setGameWon(true); // Set gameWon to true when the correct number is guessed
            if (score > highscore) {
                setHighscore(score);
            }
            setSecretNumber(guessNumber); // Display the guessed number
        } else if (guessNumber !== secretNumber) {
            if (score > 1) {
                setMessage(guessNumber > secretNumber ? '📈 Too high!' : '📉 Too low!');
                setScore(score - 1);
            } else {
                setMessage('💥 You lost the game!');
                setScore(0);
                setSecretNumber(secretNumber); // Display the secret number after losing
            }
        }
    };

    // Function to initialize the game
    const init = () => {
        setSecretNumber(generateSecretNumber());
        setScore(6);
        setMessage('Start guessing...');
        setGuess('');
        setGameWon(false); // Reset gameWon when the game is initialized
    };

    // Initialize the game on component mount
    useEffect(() => {
        init();
    }, []);

    // Render JSX
    return (
        <div className="flex min-h-screen bg-gray-800 text-gray-100">
            {/* Left section */}
            <div className="left bg-gray-900 flex flex-col justify-center items-center px-6 w-1/2">
                <svg
                    className="w-16 h-16 mb-4 text-gray-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79z"></path>
                    <path d="M21 12.79l-4.24-4.24M21 12.79l-1.79 1.79M21 12.79l-4.24 4.24M12 8v.01M12 16v.01"></path>
                </svg>
                <h1 className="text-3xl font-semibold mb-2">!Pictify</h1>
                <p className="text-lg mb-4 text-center">Oops! It seems you're offline.</p>
                <p className="text-gray-400 text-center">Please check your internet connection and try again.</p>
            </div>

            {/* Right section */}
            <div className={`right flex flex-col justify-center items-center px-6 w-1/2 ${gameWon ? 'bg-green-500' : 'bg-gray-800'}`}>
                <header className="text-center mb-8">
                    <h3 id="heading" className="text-2xl font-semibold mb-2 text-gray-500">Until you get connected..</h3>
                    <h1 id="heading" className="text-3xl font-semibold mb-2">Guess My Number!</h1>
                    <p className="between">(Between 1 and 20)</p>
                    <button className="btn again bg-primary-500 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded mt-4" onClick={init}>
                        Again!
                    </button>
                    <div className="number bg-gray-00 text-3xl font-bold p-4 rounded-md mt-4">
                        {secretNumber === null || message === '🎉 Correct Number!' ? secretNumber : '?'}
                    </div>
                </header>
                <main className="text-center">
                    <section className="mb-8">
                        <input
                            type="number"
                            className="guess border rounded py-2 px-3 mr-2 text-black"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                        />
                        <button className="btn check bg-primary-500 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded mt-5" onClick={checkGuess}>
                            Check!
                        </button>
                    </section>
                    <section>
                        <p className="message text-xl mb-4">{message}</p>
                        <p className="label-score text-lg">❤️ Lives: <span className="score">{score}</span></p>
                        <p className="label-highscore text-lg">🥇 Highscore: <span className="highscore">{highscore}</span></p>
                    </section>
                </main>
            </div>
        </div>
    );
};

// Export OfflinePage component
export default OfflinePage;
