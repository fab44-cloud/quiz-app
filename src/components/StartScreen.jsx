export default function StartScreen(props) {
    return (
        <div className="quiz-container">
            <h1>Quizzical</h1>
            <p>Test your knowledge with 5 random trivia questions!</p>
            <button className="btn" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}