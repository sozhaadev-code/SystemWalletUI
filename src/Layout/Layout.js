import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
      }}
    >
      {/* MAIN CONTENT - FULL WIDTH */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          width: "100%",
        }}
      >
        {/* Header */}
        <div
          style={{
            height: isMobile ? "60px" : "70px",
            backgroundColor: "#AF28FF",
            color: "white",
            display: "flex",
            alignItems: "center",
            padding: isMobile ? "0 15px" : "0 30px",
            position: "sticky",
            top: 0,
            zIndex: 900,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Header isMobile={isMobile} />
        </div>

        {/* Page Content */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? "15px" : "25px 30px",
            backgroundColor: "#f8fafc",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>

        {/* Footer */}
        <div
          style={{
            height: isMobile ? "50px" : "60px",
            backgroundColor: "#AF28FF",
            color: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? "12px" : "14px",
            borderTop: "1px solid #34495e",
          }}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
