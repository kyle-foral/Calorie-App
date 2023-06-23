import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="header-row">
        <h1> Meal Planner & Calorie Calculator </h1>
        <Link to="sign-in">
          {' '}
          <button> Sign In </button>{' '}
        </Link>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
