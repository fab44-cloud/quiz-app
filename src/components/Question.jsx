import clsx from 'clsx'

export default function Question(props) {
    return (
        <div className="question-container">
            <h3>{props.question}</h3>
            <div className="choices-container">
                {props.answers.map((choice) => {
                    const buttonClass = clsx("choice-btn", {
                        selected: !props.quizOver && choice.isSelected,
                        correct: props.quizOver && choice.isCorrect,
                        incorrect: props.quizOver && (choice.isSelected && !choice.isCorrect),
                        faded: props.quizOver && (!choice.isSelected && !choice.isCorrect)
                    })

                    return (
                        <button
                            key={choice.id} 
                            className={buttonClass}
                            onClick={() => !props.quizOver && props.handleSelect(props.id, choice.id)}
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