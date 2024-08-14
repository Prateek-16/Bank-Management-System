import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import './deposit.css'

export function Deposit() {

    const [Dep, setDep] = useState("");
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    const onDeposit = (e) => {
        e.preventDefault()

        const acId = e.target.acId.value
        const amount = e.target.amount.value

        console.log(`Id ${acId} Amount ${amount}`)

        fetch('http://localhost:3100/deposit', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ acId, amount })
        }).then(res => res.json())
            .then(json => setDep(json.msg))
    }

    return (
        <div className="depCont">
            <h1> Deposit Amount </h1>
            <form onSubmit={onDeposit}>
                <input type='number' placeholder='Account Id' name='acId' />
                <input type='number' placeholder='Amount' name='amount' />
                <input type='submit' value='Deposit' />
            </form>
            <h2>{Dep}</h2>
            <button onClick={goBack}>Go Back</button>
        </div>
    )
}