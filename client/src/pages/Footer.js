import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-display">
          <div className="calendar">
            <Link to="/"> Home </Link>
          </div>
          <div className="calculator">
            <Link to="calculator"> Calculator </Link>
          </div>
          <div className="add-icon">
            <Link to="add-meal"> Add Meal </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
