import React, { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import axios from 'axios';
import { MdLightMode, MdDarkMode } from "react-icons/md"; // Import Theme Icons
import './User.css';

function UserManagement() {
  // 1. Declare State Variables correctly at the top
  const [theme, setTheme] = useState("light");
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Currency Symbols Map
  const currencySymbols = {
    USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$", 
    CAD: "C$", SGD: "S$", AED: "د.إ", SAR: "﷼", 
    CNY: "¥", MYR: "RM", THB: "฿", RUB: "₽"
  };

  // 2. Fetch Live Rates Effect
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true); 
        
        // Fetching based on USD
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const rates = response.data.rates;
        const usdToInr = rates.INR;

        // List of currencies to show
        const targetCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'AED', 'SGD', 'SAR', 'CNY', 'MYR', 'THB', 'RUB'];

        // Convert logic
        const formattedData = targetCurrencies.map(code => {
          const rateAgainstUsd = rates[code]; 
          // Formula: 1 Unit of Target Currency = (USD to INR) / (USD to Target)
          const valueInInr = usdToInr / rateAgainstUsd; 
          
          return {
            code: code,
            symbol: currencySymbols[code] || code,
            value: valueInInr.toFixed(2),
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
    
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);

  }, []); // Empty dependency array ensures this runs once on mount

  return (
    // Apply 'dark' class based on state
    <div className={`user-dashboard-container ${theme}`}>
      
      {/* 1. Page Header with Theme Toggle */}
      <div className="page-header">
        <div className="brand-title">arralore</div>
        
        <button className="theme-toggle-btn" onClick={toggleTheme}>
           {theme === "light" ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
           {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* 2. Currency Strip */}
      <div className="currency-strip">
        <h3 className="currency-title">Current Value of 1 $ (Global Rates to INR)</h3>
        
        <div className="marquee-wrapper">
          <Marquee gradient={false} speed={45} pauseOnHover={true}>
            {!loading && currencyData.length > 0 ? (
              currencyData.map((item, index) => (
                <div className="marquee-item" key={index}>
                  {/* Symbol & Value */}
                  <span style={{fontWeight:'700', color: theme === 'dark' ? '#fff' : '#000'}}>
                    @ {item.symbol} {item.value}
                  </span>
                  
                  {/* Change */}
                  <span className={item.isUp ? "rate-up" : "rate-down"} style={{margin:'0 8px'}}>
                    {item.isUp ? '▲' : '▼'} {item.change}%
                  </span>
                  
                  {/* High Value */}
                  <span style={{color: theme === 'dark' ? '#aaa' : '#555', fontWeight:'600'}}>
                    # {item.high}
                  </span>
                  
                  {/* Separator */}
                  <span style={{marginLeft:'30px', color: theme === 'dark' ? '#444' : '#ddd'}}>|</span>
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
            <div className="chart-header-row">
            <select className="currency-select">
              <option>Dollar ($)</option>
              <option>Euro (€)</option>
            </select>
          </div>
        {/* Middle Card: Chart */}
        <div className="dash-card">
          

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
        <p>No current Requests</p>
        
        {/* <div className="status-row">
          <div style={{display:'flex', alignItems:'center'}}>
            <span className="req-name">Withdrawal Request</span>
            <span className="req-amount">$ 250</span>
            <span className="req-date">25 Dec 25'</span>
          </div>
          
          <div style={{display:'flex', alignItems:'center'}}>
            <span className="req-badge">Pending</span>
            <span className="cancel-link">Cancel Request</span>
          </div>
        </div> */}
      </div>

    </div>
  );
}

export default UserManagement;