import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import './new-customer.css'

export function NewCustomer() {

    const [Cust, setCust] = useState("");
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    const onNewCustomer = (e) => {
        e.preventDefault()

        const acId = e.target.acId.value
        const acNm = e.target.acNm.value
        const balance = e.target.balance.value

        console.log(`Id ${acId} Name ${acNm} Bal ${balance}`)

        fetch('http://localhost:3100/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ acId, acNm, balance })
        }).then(res => res.json())
            .then(json => setCust(json.msg))

    }

    return (
        <div className="custCont">
            <h1> Create New Customer </h1>
            <form onSubmit={onNewCustomer}>
                <input type='number' placeholder='Account Id' name='acId' />
                <input type='text' placeholder='Account Name' name='acNm' />
                <input type='number' placeholder='Balance' name='balance' />
                <input type='submit' value='Create' />
            </form>
            <h2>{Cust}</h2>
            <button onClick={goBack}>Go Back</button>
        </div>
    )
}