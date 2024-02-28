import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MonthlyPaymentVerification.css';

function MonthlyPaymentVerification() {
    const [paymentInfo, setPaymentInfo] = useState({
        soldier_id: '',
        date: '',
        amount: '',
        paymentMethod: {
            Cash: false,
            Credit: false,
            Check: false,
        }
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (['Cash', 'Credit', 'Check'].includes(e.target.name)) {
            setPaymentInfo({
                ...paymentInfo,
                paymentMethod: {
                    ...paymentInfo.paymentMethod,
                    [e.target.name]: e.target.checked,
                },
            });
        } else {
            setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^\d{9}$/.test(paymentInfo.soldier_id)) {
            alert('Soldier ID must be exactly 9 digits.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (paymentInfo.date < today) {
            alert('Date cannot be in the past.');
            return;
        }

        if (!(parseFloat(paymentInfo.amount) > 0)) {
            alert('Amount must be a positive number greater than 0.');
            return;
        }

        const selectedPaymentMethods = Object.entries(paymentInfo.paymentMethod)
            .filter(([method, isSelected]) => isSelected)
            .map(([method]) => method)
            .join(', ');

        if (selectedPaymentMethods.length === 0) {
            alert('Please select at least one payment method.');
            return;
        }

        fetch('http://localhost:5000/verify-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...paymentInfo,
                paymentMethod: selectedPaymentMethods,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Payment verified successfully. A message with the payment amount was sent to the soldier and the coordinator.');
            setPaymentInfo({
                soldier_id: '',
                date: '',
                amount: '',
                paymentMethod: {
                    Cash: false,
                    Credit: false,
                    Check: false,
                },
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error: Unable to verify payment.');
        });
    };

    return (
        <div className="monthly-payment-verification-container">
            <h2>Monthly Payment Verification</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="soldier_id"
                    value={paymentInfo.soldier_id}
                    onChange={handleChange}
                    placeholder="Soldier ID"
                    type="text"
                    required
                />
                <input
                    name="date"
                    value={paymentInfo.date}
                    onChange={handleChange}
                    placeholder="Date (YYYY-MM-DD)"
                    type="date"
                    required
                />
                <input
                    name="amount"
                    value={paymentInfo.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    type="number"
                    step="0.01"
                    required
                />
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="Cash"
                            checked={paymentInfo.paymentMethod.Cash}
                            onChange={handleChange}
                        /> Cash
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="Credit"
                            checked={paymentInfo.paymentMethod.Credit}
                            onChange={handleChange}
                        /> Credit
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="Check"
                            checked={paymentInfo.paymentMethod.Check}
                            onChange={handleChange}
                        /> Check
                    </label>
                </div>
                <button type="submit">Verify Payment</button>
            </form>
            <button onClick={() => navigate('/remove-colleague')} className="navigate-button">
                Go to Remove Colleague
            </button>
        </div>
    );
}

export default MonthlyPaymentVerification;
