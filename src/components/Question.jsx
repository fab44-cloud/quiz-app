export default function Question(props) {

    return (
        <div className="question-container">
            <h3>{props.question}</h3>
            <div className="choices-container">
                {props.answers.map((choice) => {
                    const buttonClass = choice.isSelected ? "choice-btn selected" : "choice-btn"

                    return (
                        <button
                            key={choice.id} 
                            className={buttonClass}
                            onClick={() => props.handleSelect(props.id, choice.id)}
                            >
                                {choice.text}
                        </button>
                    ) 
                })}
            </div>
            <hr />
        </div>
    )
}