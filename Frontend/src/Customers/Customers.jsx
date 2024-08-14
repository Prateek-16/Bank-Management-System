import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Customer.css'
export function Customers() {


  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };

  useEffect(() => {
    fetch('http://localhost:3100/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);


  const sortById = () => {
    const sortedCustomers = [...customers].sort((a, b) => {
      return a.ac_id - b.ac_id;
    })
    setCustomers(sortedCustomers);
  }

  return (
    <div className='wrapper'>
      <h1>All Customers</h1>
      <table>
        <thead>
          <tr>
            <th onClick={sortById} style={{ cursor: 'pointer' }}>ID ▲</th>
            <th>Name</th>
            <th>balance</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.customer_id}>
              <td>{customer.ac_id}</td>
              <td>{customer.ac_nm}</td>
              <td>{customer.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={goBack}>Go Back</button>
    </div>

  );
}