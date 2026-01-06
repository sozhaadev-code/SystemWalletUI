import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

function Header({ isMobile }) {
  const username = "Vishnu AnandKannan";
  const [showCard, setShowCard] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowCard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const handleLogout = () => {
    localStorage.clear();     
    navigate("/");            
  };

  return (
    <>
      {/* HEADER */}
      <div style={styles.headerContainer}>
        <div style={styles.leftTitle}>SYSTEM WALLET</div>

       
        <div style={{ position: "relative" }}>
          <div
            style={styles.profile}
            onClick={() => setShowCard(!showCard)}
          >
            <div style={styles.avatarContainer}>
              <div style={styles.avatar}>{username.charAt(0)}</div>
              <div style={styles.statusIndicator} />
            </div>

            {!isMobile && (
              <div style={styles.profileInfo}>
                <div style={styles.name}>
                  {username.length > 20 ? username.substring(0, 17) + "..." : username}
                </div>
                <div style={styles.role}>Admin</div>
              </div>
            )}

            <span style={styles.dropdownIcon}>⌄</span>
          </div>

        
          {showCard && (
            <div ref={cardRef} style={styles.dropdownCard}>
              <h4 style={{ marginBottom: "6px" }}>Profile</h4>
              <p><b>Name:</b> {username}</p>
              <p><b>Role:</b> Admin</p>
              <p><b>Email:</b> example@gmail.com</p>

              <button
                style={styles.logoutBtn}
                onClick={() => setConfirmLogout(true)}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONFIRM LOGOUT POPUP */}
      {confirmLogout && (
        <div style={styles.confirmOverlay}>
          <div style={styles.confirmBox}>
            <p style={{ fontWeight: "600" }}>
              Are you sure you want to logout?
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button style={styles.confirmYes} onClick={handleLogout}>Yes</button>
              <button
                style={styles.confirmNo}
                onClick={() => setConfirmLogout(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


/* ---------- STYLES ---------- */
const styles = {
  headerContainer: {
    width: "100%",
    height: "60px",
    padding: "0 20px",
    backgroundColor: "#AF28FF",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    //borderBottom: "1px solid #2d2d40",
    boxSizing: "border-box",
  },
  leftTitle: {
    fontSize: "18px",
    fontWeight: "600",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "8px",
  },
  avatarContainer: {
    position: "relative",
    marginRight: "8px",
  },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    backgroundColor: "#4c0675ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "14px",
    color: "white",
  },
  statusIndicator: {
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "8px",
    height: "8px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
  },
  profileInfo: { marginRight: "8px" },
  name: { fontSize: "14px", fontWeight: "600" },
  role: { fontSize: "11px", color: "#bbbbbb" },
  dropdownIcon: { marginLeft: "6px" },

  dropdownCard: {
    position: "absolute",
    top: "55px",
    right: "0",
    width: "250px",
    backgroundColor: "white",
    color: "#333",
    padding: "18px",
    borderRadius: "10px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.20)",
    zIndex: 999,
  },

  logoutBtn: {
    marginTop: "18px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#AF28FF",
    border: "none",
    color: "white",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },

confirmOverlay: {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.6)", 
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2500,
},
 confirmBox: {
  background: "white",
  color: "#000",          
  padding: "25px",
  borderRadius: "10px",
  width: "280px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.20)",
  zIndex: 3000,           
},

  confirmYes: {
    flex: 1,
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "9px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  confirmNo: {
    flex: 1,
    backgroundColor: "#ddd",
    border: "none",
    padding: "9px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Header;
