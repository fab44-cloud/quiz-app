import { useState, useEffect } from "react"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import he from "he"

export default function App() {
    // State variables
    const [quizStarted, setQuizStarted] = useState(false)
    const [questions, setQuestions] = useState([])
    const [checkedAnswers, setCheckedAnswers] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(() => {
        if (quizStarted) {
            fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => {
                const formattedQuestions = data.results.map(question => {

                    // Combine choices into one list
                    const choices = [
                        ...question.incorrect_answers,
                        question.correct_answer
                    ]

                    // Shuffle the list so a correct answer moves to a random spot
                    const shuffledChoices = choices.sort(() => Math.random() - 0.5)

                    const answerObjects = shuffledChoices.map(choice => {
                        return {
                            id: crypto.randomUUID(),
                            text: he.decode(choice),
                            isSelected: false,
                            isCorrect: choice === question.correct_answer 
                        }
                    })

                    return {
                        id: crypto.randomUUID(),
                        questionText: he.decode(question.question),
                        all_answers: answerObjects,
                    }
                })

                setQuestions(formattedQuestions)
            })
        }
    }, [quizStarted])

    function startQuiz() {
        setQuizStarted(true)
    }

    function selectAnswer(questionId, answerId) {
        setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                if (question.id !== questionId) {
                    return question
                }

                const updatedAnswers = question.all_answers.map(answer => {
                    return {
                        ...answer,
                        isSelected: answer.id === answerId
                    }
                })

                return {
                    ...question,
                    all_answers: updatedAnswers
                }
            })
        })
    }

    function checkAnswers() {
        let finalScore = 0

        questions.forEach(question => {
            question.all_answers.forEach(answer => {
                if (answer.isSelected && answer.isCorrect) {
                    finalScore++
                }
            })
        })

        setScore(finalScore)
        setCheckedAnswers(true)
        console.log(finalScore)
    }

    return (
        <main>
            {!quizStarted ? (
                <StartScreen handleClick={startQuiz}/>
            ) : (
                <div>
                    {questions.map((item) => {
                        return (
                            <Question 
                                key={item.id}
                                id={item.id}
                                question={item.questionText}
                                answers={item.all_answers}
                                handleSelect={selectAnswer}
                            />
                        )
                    })}
                    <div className="footer-container">
                        {checkedAnswers ? (
                            <div className="score-box">
                                <span>You scored {score}/5 correct answers</span>
                                <button onClick={() => window.location.reload()} className="play-again-btn">
                                    Play Again
                                </button>
                            </div>
                        ) : (
                            <button onClick={checkAnswers} className="check-btn">
                                Check Answers
                            </button>
                        )}
                    </div>
                </div>
            )}
        </main>
    )
}