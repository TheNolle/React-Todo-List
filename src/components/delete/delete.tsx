import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa6'

import './delete.scss'

// Interfaces
import { TaskComponentProps } from '../task/task'
interface DeleteComponentProps {
    id: String
    tasks?: TaskComponentProps[]
    setTasks?: React.Dispatch<React.SetStateAction<TaskComponentProps[]>>
}

export default function DeleteComponent({ id, tasks, setTasks }: DeleteComponentProps): JSX.Element {
    function handleDelete() {
        const task = tasks?.find((task: TaskComponentProps) => task.id === id)
        if (tasks && setTasks && task) {
            const tasksFiltered = tasks.filter((task: TaskComponentProps) => task.id !== id)
            localStorage.setItem('tasks', JSON.stringify(tasksFiltered))
            setTasks(tasksFiltered)
        }
    }

    return (
        <div className="delete-component" onClick={handleDelete}>
            <FaTrash />
        </div>
    )
}
