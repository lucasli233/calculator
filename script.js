class Calculator {
  constructor(prevText, currText) {
    this.prevText = prevText
    this.currText = currText
    this.clear()
  }

  clear() {
    this.currOperand = ""
    this.prevOperand = ""
    this.operation = undefined
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1)
  }

  append(number) {
    if (number === "." && this.currOperand.includes(".")) return
    this.currOperand = this.currOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currOperand === "") return
    if (this.prevOperand !== "") {
      this.compute()
    }
    this.operation = operation
    this.prevOperand = this.currOperand
    this.currOperand = ""
  }

  compute() {
    let res
    const prev = parseFloat(this.prevOperand)
    const curr = parseFloat(this.currOperand)
    if (isNaN(prev) || isNaN(curr)) return
    switch (this.operation) {
      case "+":
        res = prev + curr
        break
      case "-":
        res = prev - curr
        break
      case "÷":
        res = prev / curr
        break
      case "*":
        res = prev * curr
        break
      default:
        return
    }
    this.currOperand = res
    this.operation = undefined
    this.prevOperand = ""
  }

  getDisplayNumber(number) {
    const strNum = number.toString()
    const intDigits = parseFloat(strNum.split(".")[0])
    const decDigits = strNum.split(".")[1]
    let integerDisplay
    if (isNaN(intDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      })
    }
    if (decDigits != null) {
      return `${integerDisplay}.${decDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currText.innerText = this.getDisplayNumber(this.currOperand)
    if (this.operation != null) {
      this.prevText.innerText = `${this.getDisplayNumber(this.prevOperand)} ${
        this.operation
      }`
    } else {
      this.prevText.innerText = ""
    }
  }
}

const numberButton = document.querySelectorAll("[dataNumber]")
const operationButton = document.querySelectorAll("[dataOperation]")
const equalsButton = document.querySelector("[dataEquals]")
const delButton = document.querySelector("[dataDel]")
const acButton = document.querySelector("[dataAc]")
const prevText = document.querySelector("[dataPrev]")
const currText = document.querySelector("[dataCurr]")

const calculator = new Calculator(prevText, currText)

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.append(button.innerText)
    calculator.updateDisplay()
  })
})

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener("click", (button) => {
  calculator.compute()
  calculator.updateDisplay()
})

acButton.addEventListener("click", (button) => {
  calculator.clear()
  calculator.updateDisplay()
})

delButton.addEventListener("click", (button) => {
  calculator.delete()
  calculator.updateDisplay()
})
