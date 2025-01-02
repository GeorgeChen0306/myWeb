import { useState } from "react"
import Nav from "../components/Nav.jsx"
import "../styles/calculator.css"

const Calculator = () => {
    
    const [output, setOutput] = useState("0");
    const [expression, setExpression] = useState("");
    const [existOperator, setExistOperator] = useState(false);
    const [isLastClickedOperator, setIsLastClickedOpeartor] = useState(false);
    const [evaluate, setEvaluate] = useState(false);
    const [clickedEqual, setClickedEqual] = useState(false);
    const [lastNum, setLastNum] = useState("");
    const [isDecimalDisable, setIsDecimalDisable] = useState(false);
    //const [operator, setOperator] = useState("");

    function allClearBtn(){
        setOutput("0")
        setExpression("");
        setExistOperator(false);
        setIsLastClickedOpeartor(false);
        setEvaluate(false);
        setClickedEqual(false);
        setIsDecimalDisable(false);
    }

    function operatorBtn(e){
        var operator = e.target.dataset.op;

        if (clickedEqual){
            setClickedEqual(false);
            setExpression(`${eval(expression)} ${operator}`);
            setIsLastClickedOpeartor(true);
            return;
        }

        if (existOperator && isLastClickedOperator){
            var regex = /[+\-\*/]/g;
            setExpression(`${expression.replace(regex, operator)}`);
            return;
        }
        else if (evaluate){
            setOutput(eval(expression + output))
            setExpression(`${eval(expression + output)} ${operator}`)
            setIsLastClickedOpeartor(true);
            setEvaluate(false);
        }
        else {
            setExpression(`${output} ${operator}`);
        }
        setExistOperator(true);
        setIsLastClickedOpeartor(true);
    }

    function numBtn(e){
        var value = e.target.dataset.num;

        if (clickedEqual){
            allClearBtn();
            setOutput(value);
            return;
        }

        if (isLastClickedOperator){
            setIsLastClickedOpeartor(false);
            setOutput(value);
            setEvaluate(true);
            return;
        }

        if (output[0] === "0"){
            if (value !== "0"){
                setOutput(value);
                return;
            }
            return;
        }


        setOutput(output + value);
        
        if (value === "."){
            setIsDecimalDisable(true);
        }
    }

    function equalBtn(){
        if (clickedEqual){
            setOutput(eval(expression.substring(0,expression.length-1)))
            return;
        }

        setOutput(eval(expression + output))
        setExpression(expression + " " + output);
        
        setClickedEqual(true);
    }

    function decimalBtn(){

    }

    return (
        <>
            <Nav />
            <div className="cal-grid-background">
                <div className="cal-grid-container">
                    <div className="cal-grid-output">
                        <input
                              className="expression" 
                              value={expression}
                              readOnly
                        />
                        <input 
                              value={output}
                              readOnly
                        />
                    </div>
                    <div className="cal-grid">
                        
                        {/* Row 1 */}
                        {/* <button data-val="C" onClick={clearBtn}>C</button> */}
                        <button></button>
                        <button></button>
                        <button data-val="AC" onClick={allClearBtn}>AC</button>
                        <button className="operator" data-op="/" onClick={operatorBtn}>/</button>                        
                    
                        {/* Row 2 */}
                        <button data-num="7" onClick={numBtn}>7</button>
                        <button data-num="8" onClick={numBtn}>8</button>
                        <button data-num="9" onClick={numBtn}>9</button>
                        <button className="operator" data-op="*" onClick={operatorBtn}>X</button>
                                            
                        {/* Row 3 */}
                        <button data-num="4" onClick={numBtn}>4</button>
                        <button data-num="5" onClick={numBtn}>5</button>
                        <button data-num="6" onClick={numBtn}>6</button>
                        <button className="operator" data-op="-" onClick={operatorBtn}>-</button>
                                 
                        {/* Row 4 */}
                        <button data-num="1" onClick={numBtn}>1</button>
                        <button data-num="2" onClick={numBtn}>2</button>
                        <button data-num="3" onClick={numBtn}>3</button>
                        <button data-op="+" className="cal-grid-expand" onClick={operatorBtn}>+</button>
                        
                        {/* Row 5 */}
                        <button data-num="0" onClick={numBtn}>0</button>
                        <button data-num="." onClick={numBtn}>.</button>
                        <button onClick={equalBtn}>=</button>

                    </div>
                </div>  
            </div>
        </>
    )
}

export default Calculator;