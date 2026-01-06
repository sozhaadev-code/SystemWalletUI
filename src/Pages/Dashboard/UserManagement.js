import React, { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import axios from 'axios';
import './User.css';

function UserManagement() {
  const [currencyData, setCurrencyData] = useState([]);
  const [ setLoading] = useState(true);

  // Currency Symbols Mapping
  const currencySymbols = {
    USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$", 
    CAD: "C$", SGD: "S$", AED: "د.إ", SAR: "﷼", 
    CNY: "¥", MYR: "RM", THB: "฿", RUB: "₽"
  };

  // Fetch Live Rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Fetching based on USD
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const rates = response.data.rates;
        const usdToInr = rates.INR;

        // List of currencies
        const targetCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'AED', 'SGD', 'SAR', 'CNY', 'MYR', 'THB', 'RUB'];

        // Convert each currency to INR
        const formattedData = targetCurrencies.map(code => {
          const rateAgainstUsd = rates[code]; 
          const valueInInr = usdToInr / rateAgainstUsd; // (1 USD to INR) / (1 USD to Target)
          
          return {
            code: code,
            symbol: currencySymbols[code] || code,
            value: valueInInr.toFixed(2),
            // Mocking fluctuation for UI visual
            change: (Math.random() * 0.5 + 0.1).toFixed(2), 
            high: (valueInInr + (Math.random() * 0.5)).toFixed(2),
            isUp: Math.random() > 0.4 
          };
        });

        setCurrencyData(formattedData);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching currency:", error);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="user-dashboard-container">
      
      {/* 1. Page Header */}
      <div className="page-header">
        <div className="brand-title">arralore</div>
      </div>

      {/* 2. Currency Strip with Multi-Currency Marquee */}
      <div className="currency-strip">
        <h3 className="currency-title">Current Value of 1 $</h3>
        
        <div className="marquee-wrapper">
          <Marquee gradient={false} speed={45} pauseOnHover={true}>
            {currencyData.length > 0 ? (
              currencyData.map((item, index) => (
                <div className="marquee-item" key={index}>
                  {/* Symbol & Value */}
                  <span style={{fontWeight:'700', color:'#000'}}>
                    @ {item.symbol} {item.value}
                  </span>
                  
                  {/* Percentage Change */}
                  <span className={item.isUp ? "rate-up" : "rate-down"} style={{margin:'0 8px'}}>
                    {item.isUp ? '▲' : '▼'} {item.change}%
                  </span>
                  
                  {/* High Value */}
                  <span style={{color:'#555', fontWeight:'600'}}>
                    # {item.high}
                  </span>
                  
                  {/* Separator */}
                  <span style={{marginLeft:'30px', color:'#ddd'}}>|</span>
                </div>
              ))
            ) : (
              <span style={{marginLeft:'20px'}}>Loading live rates...</span>
            )}
          </Marquee>
        </div>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Left Card: Balance */}
        <div className="dash-card">
          <div>
            <div className="balance-label">Currency Balance</div>
            <h1 className="balance-amount">$ 100,000</h1>
          </div>
          
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8634/8634075.png" 
            alt="Wallet" 
            className="wallet-3d-icon" 
          />
          
          <button className="withdraw-btn">Request for Withdrawal</button>
        </div>

        {/* Middle Card: Chart */}
        <div className="dash-card">
          <div className="chart-header-row">
            <select className="currency-select">
              <option>Dollar ($)</option>
              <option>Euro (€)</option>
            </select>
          </div>

          <div className="chart-area">
            <div className="chart-tooltip-floating">
              $1,223.72
            </div>
            
            <svg viewBox="0 0 500 150" width="100%" height="160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path 
                d="M0,100 C150,180 350,20 500,100 L500,150 L0,150 Z" 
                fill="url(#chartFill)" 
              />
              <path 
                d="M0,100 C150,180 350,20 500,100" 
                fill="none" 
                stroke="#a855f7" 
                strokeWidth="4" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Right Card: Stats */}
        <div className="dash-card" style={{justifyContent: 'center'}}>
          <div className="stat-row">
            <span className="stat-label">Total Deposit USD</span>
            <span className="stat-value">$1000</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Profit</span>
            <span className="stat-value profit-val">
              0.5% <span>↓</span>
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total Standing</span>
            <span className="stat-value">$981</span>
          </div>
        </div>

      </div>

      {/* 4. Request Status Section */}
      <div className="request-status-container">
        <h3 className="section-title">Request Status</h3>
        
        <div className="status-row">
          <div style={{display:'flex', alignItems:'center'}}>
            <span className="req-name">Withdrawal Request</span>
            <span className="req-amount">$ 250</span>
            <span className="req-date">25 Dec 25'</span>
          </div>
          
          <div style={{display:'flex', alignItems:'center'}}>
            <span className="req-badge">Pending</span>
            <span className="cancel-link">Cancel Request</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserManagement;