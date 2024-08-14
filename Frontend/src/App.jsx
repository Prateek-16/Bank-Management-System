import { Routes , Route } from "react-router-dom";

import { Dashboard } from './dashboard/dashboard.jsx'
import { NewCustomer } from './new-customer/new-customer.jsx'
import { Deposit } from './deposit/deposit.jsx'
import { Withdraw } from './withdraw/withdraw.jsx'
import { Transfer } from './transfer/transfer.jsx'
import { Balance } from './balance/balance.jsx'
import { Customers } from './Customers/Customers.jsx'
import './App.css'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/new" element={<NewCustomer />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/balance" element={<Balance />} />
      <Route path="/Customers" element={<Customers />} />

    </Routes>
    </>
  )
}

export default App
