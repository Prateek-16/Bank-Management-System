import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import './balance.css'

export function Balance() {

    const [bal, setBal] = useState("")
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    const onBalance = (e) => {
        e.preventDefault()

        const acId = e.target.acId.value

        console.log(`Id ${acId} `)

        fetch(`http://localhost:3100/balance/${acId}`)
            .then(res => res.json())
            .then(json => setBal(`Balance is ${json.bal}`))
    }

    return (
        <div className="balCont">
            <h1>Check Balance</h1>
            <form onSubmit={onBalance}>
                <input type='number' placeholder='Account Id' name='acId' />
                <input type='submit' value='Balance' />
            </form>
            <h2>{bal}</h2>
            <button onClick={goBack}>Go Back</button>
        </div>
    )
}