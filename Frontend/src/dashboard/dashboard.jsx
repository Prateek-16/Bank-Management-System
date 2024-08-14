import './dashboard.css'
import { useNavigate } from 'react-router-dom'

export function Dashboard() {

    const navigate = useNavigate()

    return (
        <>
            <h1>Welcome To The Bank !</h1>
            <div className="dashCont">
                <div onClick={() => navigate('/new')}>
                    New Customer
                </div>
                <div onClick={() => navigate('/customers')}>
                    Customer details
                </div>
                <div onClick={() => navigate('/deposit')}>
                    Deposit
                </div>
                <div onClick={() => navigate('/withdraw')} >
                    Withdraw
                </div>
                <div onClick={() => navigate('/transfer')}>
                    Transfer
                </div>
                <div onClick={() => navigate('/balance')}>
                    Balance
                </div>
            </div>
        </>
    )
}