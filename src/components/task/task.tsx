import React, { Dispatch, SetStateAction, useState } from 'react'

import './task.scss'

// Components
import CheckboxComponent from '../checkbox/checkbox'
import DeleteComponent from '../delete/delete'

// Interfaces
export interface TaskComponentProps {
    id: String
    taskName: String
    done: boolean
    setTasksCompleted?: Dispatch<SetStateAction<TaskComponentProps[]>>
    getMessage?: () => void
    tasks?: TaskComponentProps[]
    setTasks?: Dispatch<SetStateAction<TaskComponentProps[]>>
}

export default function TaskComponent({ id, taskName, done = false, setTasksCompleted, getMessage, tasks, setTasks }: TaskComponentProps): JSX.Element {
    const [finished, setFinished] = useState(done)

    function handleCheckboxClick() {
        setFinished(!finished)
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        const taskIndex = tasks.findIndex((task: TaskComponentProps) => task.id === id)
        tasks[taskIndex].done = !finished
        localStorage.setItem('tasks', JSON.stringify(tasks))
        if (setTasksCompleted) setTasksCompleted(tasks.filter((task: TaskComponentProps) => task.done === true))
        if (getMessage) getMessage()
    }

    return (
        <div className={`task-component ${finished ? 'finished' : ''}`}>
            <CheckboxComponent isChecked={finished} onClick={handleCheckboxClick} />
            <span>{taskName}</span>
            <DeleteComponent id={id} tasks={tasks} setTasks={setTasks} />
        </div>
    )
}
