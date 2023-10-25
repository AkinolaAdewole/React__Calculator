import React,{useReducer} from 'react'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import "../style.css"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

const Calculator = () => {
  return (
    <div>Calculator</div>
  )
}

export default Calculator