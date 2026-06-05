import { useState, useEffect } from "react"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import he from "he"

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

                    // Combine choices into one list
                    const choices = [
                        ...question.incorrect_answers,
                        question.correct_answer
                    ]

                    // Shuffle the list so a correct answer moves to a random spot
                    const shuffledChoices = choices.sort(() => Math.random() - 0.5)
                    console.log(shuffledChoices)

                    // Clean up the scrambled answers
                    const cleanChoices = shuffledChoices.map(choice => he.decode(choice))
                    console.log(cleanChoices)

                    return {
                        id: crypto.randomUUID(),
                        questionText: he.decode(question.question),
                        all_answers: cleanChoices,
                        correctAnswer: question.correct_answer
                    }
                })

                setQuestions(formattedQuestions)
            })
        }
    }, [quizStarted])

    function startQuiz() {
        setQuizStarted(true)
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
                                question={item.questionText}
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