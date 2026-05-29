export default function StartScreen(props) {
    return (
        <div>
            <h1>Quizzical</h1>
            <p>Test your knowledge with 5 random trivia questions!</p>
            <button onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}