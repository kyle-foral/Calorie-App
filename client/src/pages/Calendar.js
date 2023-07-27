import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteFood from './Delete-Food';

export default function Calendar() {
  const [dayId, setDayId] = useState('Sunday');
  const [displayed, setDisplayed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`/api/day/${dayId}`);
        if (!res.ok) {
          throw new Error('Network respose was not ok', res.status);
        }
        const meal = await res.json();
        setDisplayed(meal);
      } catch (error) {
        console.error('Error', error);
      }
    }
    getData();
  }, [dayId]);

  const show = displayed.map((a) => (
    <li key={a.foodId} className="row-meal">
      {a.mealDescription}
      <div className="mealEdit">
        <button className="delete-item" onClick={() => deleteFood(a.foodId)}>
          Delete
        </button>
      </div>
    </li>
  ));

  const dayButton = [
    <button key="Sunday" onClick={() => setDayId('Sunday')}>
      {' '}
      Sunday{' '}
    </button>,
    <button key="Monday" onClick={() => setDayId('Monday')}>
      {' '}
      Monday{' '}
    </button>,
    <button key="Tuesday" onClick={() => setDayId('Tuesday')}>
      {' '}
      Tuesday{' '}
    </button>,
    <button key="Wednesday" onClick={() => setDayId('Wednesday')}>
      {' '}
      Wednesday{' '}
    </button>,
    <button key="Thursday" onClick={() => setDayId('Thursday')}>
      {' '}
      Thursday{' '}
    </button>,
    <button key="Friday" onClick={() => setDayId('Friday')}>
      {' '}
      Friday{' '}
    </button>,
    <button key="Saturday" onClick={() => setDayId('Saturday')}>
      {' '}
      Saturday{' '}
    </button>,
  ];

  return (
    <main>
      <div className="column-full bmr"> </div>
      <div className="days-buttons">{dayButton}</div>
      <ul className="row">
        <div className="column-full">
          <h3> Food for {dayId} </h3>
          {show}
        </div>
      </ul>
    </main>
  );
}
