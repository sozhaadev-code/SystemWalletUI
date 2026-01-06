import React from 'react'

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div style={styles.footerContainer}>
      <div style={styles.footerContent}>
        <p style={styles.copyright}>
          © {getCurrentYear()} System Wallet. All rights reserved.
        </p>
      </div>
    </div>
  )
}

const styles = {
  footerContainer: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#AF28FF",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    marginTop: "auto",
  },
  footerContent: {
    textAlign: "center",
  },
  copyright: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "500",
  },
};

export default Footer