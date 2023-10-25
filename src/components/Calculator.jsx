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
         // Evaluate the expression
        previousOperand: evaluate(state),
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
       // No action if no current operand
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        // If only one character, clear the current operand
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        // Remove the last character
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      // Handle evaluating the expression
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
         // No action if operands are missing
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
         // Evaluate and store the result
        currentOperand: evaluate(state),
      };
  }
}


function evaluate({ currentOperand, previousOperand, operation }) {
  // Convert operands to floating-point numbers
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // Check if either operand is not a valid number, return an empty string
  if (isNaN(prev) || isNaN(current)) return "";

  // Initialize the computation result
  let computation = "";

  // Perform the arithmetic operation based on the provided operation
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  // Convert the result to a string and return it
  return computation.toString();
}



// Create a number formatter for formatting integers (whole numbers).
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

// Define a function to format the operand.
function formatOperand(operand) {
  // Check if the operand is null or undefined. If so, return early.
  if (operand == null) return;

  // Split the operand into its integer and decimal parts using the dot as a separator.
  const [integer, decimal] = operand.split(".");

  // If there is no decimal part (i.e., it's a whole number), format the integer using INTEGER_FORMATTER.
  if (decimal == null) return INTEGER_FORMATTER.format(integer);

  // If there is a decimal part, format both the integer and decimal parts and combine them.
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}



const Calculator = () => {
  return (
    <div>Calculator</div>
  )
}

export default Calculator