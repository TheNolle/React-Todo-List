import React, { useEffect, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

import './App.scss'

// Components
import FormComponent from './components/form/form'
import TaskComponent, { TaskComponentProps } from './components/task/task'

export default function App() {
    const [tasks, setTasks] = useState<TaskComponentProps[]>([])
    const [tasksCompleted, setTasksCompleted] = useState<TaskComponentProps[]>([])
    const [message, setMessage] = useState<String>('')

    function handleAddTask(name: String) {
        setTasks([...tasks, { id: uuidV4(), taskName: name, done: false }])
    }

    useEffect(() => {
        if (tasks.length === 0) return
        localStorage.setItem('tasks', JSON.stringify(tasks))
        setTasksCompleted(tasks.filter((task: TaskComponentProps) => task.done === true))
        getMessage()
    }, [tasks])

    useEffect(() => {
        const localStorageTasks = localStorage.getItem('tasks')
        const tasks = localStorageTasks ? JSON.parse(localStorageTasks) : []
        setTasks(tasks)
    }, [])

    function getMessage() {
        const messages = {
            NO_TASKS: 'Add some tasks! 📝',
            DONE_NONE: [
                'You should do something! 🤔',
                'Try to do at least one! 🤞',
                'Once you start, it gets easier! 🤞',
                'You are not going to do anything? 🤨',
                'Come on, just one! 🤞',
                'You need to do something! 😕',
                'I know you can do it! 🥰',
                'I believe in you! 😘',
            ],
            DONE_ALL: 'Nice job for today! 🏝️',
            DOING: [
                'Keep it going 💪',
                'Almost there! 🥳',
                'Keep it up! 🤩',
                'You can do it! 🙌',
                'You are doing great! 🤟',
                'You are almost done! 🤙',
                'Just a few more! 🤘',
                'You are awesome! 👏',
                'You are the best! 👍',
                'You are doing it! 🤜🤛',
                'You are killing it! 🤙',
                'You are a beast! 🐱‍👤',
                'You are a machine! 🤖',
                'You are a ninja! 🥷',
                'You are a rockstar! 🤟',
            ]
        }
        const percentage = (tasksCompleted.length / tasks.length) * 100
        if (tasks.length === 0) return setMessage(messages.NO_TASKS)
        else {
            if (percentage === 0) return setMessage(messages.DONE_NONE[Math.floor(Math.random() * messages.DONE_NONE.length)])
            else if (percentage >= 1 && percentage < 100) return setMessage(messages.DOING[Math.floor(Math.random() * messages.DOING.length)])
            else if (percentage === 100) return setMessage(messages.DONE_ALL)
        }
        setMessage('Keep it going 💪')
    }

    useEffect(() => {
        getMessage()
    }, [tasksCompleted])

    return (
        <main className="app-container">
            <h1>{tasksCompleted.length}/{tasks.length} completed</h1>
            <h2>{message}</h2>
            <FormComponent onAdd={handleAddTask} />
            {tasks.map((task, index) => (
                <TaskComponent
                    key={index}
                    id={task.id}
                    taskName={task.taskName}
                    done={task.done}
                    setTasksCompleted={setTasksCompleted}
                    getMessage={getMessage}
                    tasks={tasks}
                    setTasks={setTasks}
                />
            ))}
        </main>
    )
}
