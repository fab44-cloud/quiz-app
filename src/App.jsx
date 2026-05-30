import { useState, useEffect } from "react"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"

export default function App() {
    // State variables
    const [quizStarted, setQuizStarted] = useState(false)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (quizStarted) {
            fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => {
                const formattedQuestions = data.results.map(question => {
                    const choices = [
                        ...question.incorrect_answers,
                        question.correct_answer
                    ]
                    return {
                        ...question,
                        all_answers: choices
                    }
                })
                setQuestions(formattedQuestions)
            })
        }
    }, [quizStarted])

    function startQuiz() {
        setQuizStarted(true)
    }

    console.log("Current questions:", questions)
    return (
        <main>
            {!quizStarted ? (
                <StartScreen handleClick={startQuiz}/>
            ) : (
                <div>
                    {questions.map((item) => {
                        return (
                            <Question 
                                key={item.question} 
                                question={item.question}
                                answers={item.all_answers}
                            />
                        )
                    })}
                    <button>Check Answers</button>
                </div>
            )}
        </main>
    )
}