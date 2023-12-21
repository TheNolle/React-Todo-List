import React from 'react'
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa'

import './checkbox.scss'

// Interface
interface CheckboxProps {
    isChecked?: boolean
    onClick: () => void
}

export default function CheckboxComponent({ isChecked = false, onClick }: CheckboxProps): JSX.Element {
    if (isChecked) return <div className="checkbox-component checked" onClick={onClick}><FaCheckSquare /></div>
    else return <div className="checkbox-component unchecked" onClick={onClick}><FaRegSquare /></div>
}
