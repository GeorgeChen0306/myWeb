import { useState } from "react"
import Nav from "../components/Nav"
import "../styles/calculator.css"

const Calculator = () => {
    
    const [input, setInput] = useState("")
    
    return (
        <>
            <Nav />
            <div className="calculator-background">
                <div className="calculator-container">
                    <div className="calculator-input-display">
                        <input 
                              value={input}
                              readOnly
                        />
                    </div>
                    <div className="calculator-row">
                        <button>C</button>
                        <button>AC</button>
                        <button>%</button>
                        <button>/</button>
                    </div>
                    <div className="calculator-row">
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button>x</button>
                    </div>
                    <div className="calculator-row">
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>-</button>    
                    </div>
                    <div className="calculator-row">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button className="expand">+</button>
                    </div>
                    <div className="calculator-row">
                        <button>0</button>
                        <button>.</button>
                        <button>=</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calculator