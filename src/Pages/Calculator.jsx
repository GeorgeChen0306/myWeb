import { useState } from "react"
import Nav from "../components/Nav.jsx"
import "../styles/calculator.css"

const Calculator = () => {
    
    const [output, setOutput] = useState("0");
    const [firstNum, setFirstNum] = useState("0");
    const [secondNum, setSecondNum] = useState("");

    const [operator, setOperator] = useState(null);
    const [useSecondOperand, setUseSecondOperand] = useState(false);
    const [newInput, setNewInput] = useState(false);
    const [lastInput, setLastInput] = useState("");

    const [isDecimal, setIsDecimal] = useState(false);

    function allClearBtnClicked(e){
        setOutput("0");
        setFirstNum("0");
        setSecondNum("");

        setOperator(null);
        setUseSecondOperand(false);
        setNewInput(false);
        setLastInput("");

        setIsDecimal(false);
    }

    function clearBtn(e){
        setOutput(0);
        setSecondNum("");
    }

    function btnClicked(e){
        var btnValue = e.target;
    }

    function numBtnClicked(e){
        var btnValue = e.target;
        var num = btnValue.dataset.num;
        if (!newInput){
            if (output === "0"){
                setOutput(num);
            }
            else {
                if (useSecondOperand){
                    setOutput(output+num);
                    setSecondNum(output+num);
                }
                else {
                    if (output[0] === "0"){
                        if (num === "0"){
                            return;
                        }
                    }
                    setOutput(output+num);
                }
            } 
        }
        if (newInput){
            if (isDecimal){
                setOutput(output+num);
                setSecondNum(output+num);
            }
            else {
                setOutput(num);
                setSecondNum(num);    
            }
            setNewInput(false);
        }

    }

    function addBtn(e){
        if (operator === "/") {
            divBtn(null);
            setOperator("+");
            return;
        }
        else if (operator === "-"){
            subBtn(null);
            setOperator("+")
            return;
        }
        else if (operator === "*"){
            multBtn(null);
            setOperator("+")
            return;
        }

        setOperator("+");
        if (firstNum === "0") {
            setFirstNum(output);
            setUseSecondOperand(true);
            setNewInput(true);
            return;
        }
        if (secondNum.length < 1){
            return;
        }
        let sum = Number(firstNum) + Number(secondNum);
        setFirstNum(sum);
        setOutput(sum);
        setSecondNum("");
        setNewInput(true);
    }

    function subBtn(e){
        if (operator === "+") {
            addBtn(null);
            setOperator("-");
            return;
        }
        else if (operator === "/"){
            divBtn(null);
            setOperator("-")
            return;
        }
        else if (operator === "*"){
            multBtn(null);
            setOperator("-")
            return;
        }

        setOperator("-");
        if (firstNum === "0") {
            setFirstNum(output);
            setUseSecondOperand(true);
            setNewInput(true);
            return;
        }
        if (secondNum.length < 1){
            return;
        }
        let difference = Number(firstNum) - Number(secondNum);
        setFirstNum(difference);
        setOutput(difference);
        setSecondNum("");
        setNewInput(true);
    }

    function multBtn(e){
        if (operator === "+") {
            addBtn(null);
            setOperator("*");
            return;
        }
        else if (operator === "-"){
            subBtn(null);
            setOperator("*")
            return;
        }
        else if (operator === "/"){
            divBtn(null);
            setOperator("*")
            return;
        }
        
        setOperator("*");
        if (firstNum === "0") {
            setFirstNum(output);
            setUseSecondOperand(true);
            setNewInput(true);
            return;
        }
        if (secondNum.length < 1){
            return;
        }
        let product = Number(firstNum) * Number(secondNum);
        setFirstNum(product);
        setOutput(product);
        setSecondNum("");
        setNewInput(true);
    }

    function divBtn(e){
        if (operator === "+") {
            addBtn(null);
            setOperator("/");
            return;
        }
        else if (operator === "-"){
            subBtn(null);
            setOperator("/")
            return;
        }
        else if (operator === "*"){
            multBtn(null);
            setOperator("/")
            return;
        }

        setOperator("/");
        if (firstNum === "0") {
            setFirstNum(output);
            setUseSecondOperand(true);
            setNewInput(true);
            return;
        }
        if (secondNum.length < 1){
            return;
        }
        let dividend = Number(firstNum) / Number(secondNum);
        setFirstNum(dividend);
        setOutput(dividend);
        setSecondNum("");
        setNewInput(true);
    }

    function equalBtnClicked(e){
        if (operator === "+"){
            var sum = 0;
            if (secondNum === "") {
                sum = Number(firstNum) + Number(lastInput);
            }
            else {
                sum = Number(firstNum) + Number(secondNum);
                setLastInput(secondNum);
            }
            
            setFirstNum(sum);
            setOutput(sum);
            setSecondNum("");
            setNewInput(true);    
        }
        else if (operator === "-"){
            var diff = 0;
            if (secondNum === "") {
                diff = Number(firstNum) - Number(lastInput);
            }
            else {
                diff = Number(firstNum) - Number(secondNum);
                setLastInput(secondNum);
            }
            
            setFirstNum(diff);
            setOutput(diff);
            setSecondNum("");
            setNewInput(true);    
        }
        else if (operator === "*"){
            var prod = 0;
            if (secondNum === "") {
                prod = Number(firstNum) * Number(lastInput);
            }
            else {
                prod = Number(firstNum) * Number(secondNum);
                setLastInput(secondNum);
            }
            
            setFirstNum(prod);
            setOutput(prod);
            setSecondNum("");
            setNewInput(true);    
        }
        else if (operator === "/"){
            var divd = 0;
            if (secondNum === "") {
                divd = Number(firstNum) / Number(lastInput);
            }
            else {
                divd = Number(firstNum) / Number(secondNum);
                setLastInput(secondNum);
            }

            
            setFirstNum(divd);
            setOutput(divd);
            setSecondNum("");
            setNewInput(true);    
        }
    }

    function decimalBtn(e){
        if (useSecondOperand){
            setSecondNum(secondNum + ".");
            setOutput(secondNum+".");
            setIsDecimal(true);
        }
        else {
            setOutput(output+".");
        }
    }
    
    return (
        <>
            <Nav />
            <div className="cal-grid-background">
                <div className="cal-grid-container">
                    <div className="cal-grid-output">
                        <input 
                              value={output}
                              readOnly
                        />
                    </div>
                    <div className="cal-grid">
                        
                        {/* Row 1 */}
                        <button data-val="C" onClick={clearBtn}>C</button>
                        <button data-val="AC" onClick={allClearBtnClicked}>AC</button>
                        <button data-val="%" onClick={btnClicked}>%</button>
                        <button onClick={divBtn}>/</button>
                    
                        {/* Row 2 */}
                        <button data-num="7" onClick={numBtnClicked}>7</button>
                        <button data-num="8" onClick={numBtnClicked}>8</button>
                        <button data-num="9" onClick={numBtnClicked}>9</button>
                        <button onClick={multBtn}>X</button>
                    
                        {/* Row 3 */}
                        <button data-num="4" onClick={numBtnClicked}>4</button>
                        <button data-num="5" onClick={numBtnClicked}>5</button>
                        <button data-num="6" onClick={numBtnClicked}>6</button>
                        <button onClick={subBtn}>-</button>
                    
                        {/* Row 4 */}
                        <button data-num="1" onClick={numBtnClicked}>1</button>
                        <button data-num="2" onClick={numBtnClicked}>2</button>
                        <button data-num="3" onClick={numBtnClicked}>3</button>
                        <button className="cal-grid-expand" onClick={addBtn}>+</button>

                        {/* Row 5 */}
                        <button data-num="0" onClick={numBtnClicked}>0</button>
                        <button onClick={decimalBtn}>.</button>
                        <button onClick={equalBtnClicked}>=</button>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Calculator;