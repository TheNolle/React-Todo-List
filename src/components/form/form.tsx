import React, { FormEvent, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import './form.scss'

// Interfaces
interface FormProps {
    onAdd: (name: String) => void
}

export default function FormComponent({ onAdd }: FormProps): JSX.Element {
    const [taskName, setTaskName] = useState('')

    function handleOnAdd(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onAdd(taskName)
        setTaskName('')
    }

    return (
        <form className="form-component" onSubmit={handleOnAdd}>
            <button type="submit" disabled={!taskName || taskName.trim() === ''}><FaPlus /></button>
            <input type="text" placeholder="Your next task..." value={taskName} onChange={event => setTaskName(event.target.value)} />
        </form>
    )
}
