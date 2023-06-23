import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Addmeal() {
  const [dayId, setDayId] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newMeal = { mealDescription, dayId };
      if (dayId === 'default') {
        throw new Error(400, 'Please enter a valid day.');
      }
      if (mealDescription === '') {
        throw new Error(400, 'Please enter a meal description.');
      }
      const res = await fetch('/api/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeal),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok', res.status);
      }
      const jsonData = await res.json();
      setMealDescription(jsonData);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <main className="create-new-meal">
      <h2> Add a Meal </h2>
      <form className="create-new-meal-form" onSubmit={handleSubmit}>
        <select
          className="day-select"
          name="dayId"
          value={dayId}
          onChange={(e) => setDayId(e.target.value)}>
          <option value="default"> Day of Week </option>
          <option value="Sunday"> Sunday </option>
          <option value="Monday"> Monday </option>
          <option value="Tuesday"> Tuesday </option>
          <option value="Wednesday"> Wednesday </option>
          <option value="Thursday"> Thursday </option>
          <option value="Friday"> Friday </option>
          <option value="Saturday"> Saturday </option>
        </select>

        <textarea
          required
          rows="10"
          placeholder="Please enter a meal description."
          className="meal-description"
          id="mealDescription"
          name="mealDescription"
          type="text"
          onChange={(e) => setMealDescription(e.target.value)}
          value={mealDescription}></textarea>
        <div className="meal-exercise-cancel-submit">
          <Link to="/">Cancel</Link>
          <button type="submit"> Save </button>
        </div>
      </form>
    </main>
  );
}
