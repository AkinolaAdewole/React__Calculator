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

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // Handle adding a digit to the current operand
      if (state.overwrite) {
        // If the overwrite flag is set, start a new operand
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        // Prevent leading zeros
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        // Prevent duplicate decimal points
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // Handle choosing an operation
      if (state.currentOperand == null && state.previousOperand == null) {
        return state; // No action if there are no operands
      }
      if (state.currentOperand == null) {
        // When no current operand exists, set the operation
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        // If no previous operand, store the current operand and set the operation
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state), // Evaluate the expression
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      // Handle clearing the calculator
      return {};

    case ACTIONS.DELETE_DIGIT:
      // Handle deleting a digit
      if (state.overwrite) {
        // If overwriting, clear the current operand
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state; // No action if no current operand
      if (state.currentOperand.length === 1) {
        // If only one character, clear the current operand
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1), // Remove the last character
      };

    case ACTIONS.EVALUATE:
      // Handle evaluating the expression
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state; // No action if operands are missing
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state), // Evaluate and store the result
      };
  }
}


const Calculator = () => {
  return (
    <div>Calculator</div>
  )
}

export default Calculator