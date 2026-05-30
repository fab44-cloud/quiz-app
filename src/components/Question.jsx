export default function Question(props) {
    console.log("Props:", props)

    return (
        <div className="question-container">
            <h3>{props.question}</h3>
            <div className="choices-container">
                {props.answers.map((choice) => {
                    return <button key={choice}>{choice}</button>
                })}
            </div>
            <hr />
        </div>
    )
}