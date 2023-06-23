import React from 'react';
import './layout.css';
import './styles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Calculator() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [bmr, setBmr] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();

    let bmr1 = 0;

    if (gender === 'default') {
      throw new Error('Please select a valid gender');
    }

    if (gender === 'Male') {
      bmr1 =
        66.47 +
        13.75 * (Number(weight) / 2.205) +
        5.003 * (Number(height) * 2.54) -
        6.755 * Number(age);
    } else if (gender === 'Female') {
      bmr1 =
        655.1 +
        9.563 * (Number(weight) / 2.205) +
        1.85 * (Number(height) * 2.54) -
        4.676 * Number(age);
    }

    if (activityLevel === 'sedentary') {
      bmr1 = bmr1 * 1.2;
    } else if (activityLevel === 'lightly active') {
      bmr1 = bmr1 * 1.375;
    } else if (activityLevel === 'moderately active') {
      bmr1 = bmr1 * 1.55;
    } else if (activityLevel === 'active') {
      bmr1 = bmr1 * 1.725;
    } else {
      bmr1 = bmr1 * 1.9;
    }
    bmr1 = bmr1.toFixed(0);
    setBmr(bmr1);
  }

  return (
    <main className="calorie-calculator">
      <h2> Calorie Calculator </h2>
      <h3>
        {' '}
        Fill out the form and submit to calculate your daily calorie needs
      </h3>
      <h4> You need : {bmr} calories</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label> Gender </label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}>
            <option value="default"> Select a gender </option>
            <option value="Male"> Male </option>
            <option value="Female"> Female </option>
          </select>
        </div>
        <div className="row">
          <label> Age </label>
          <input
            required
            type="text"
            placeholder="Please enter your age"
            value={age}
            id="age"
            name="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="row">
          <label> Weight </label>
          <input
            required
            type="text"
            placeholder="Please enter your weight in lbs"
            value={weight}
            id="weight"
            name="weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="row">
          <label> Height </label>
          <input
            required
            type="text"
            placeholder="Please enter your height in inches"
            value={height}
            id="height"
            name="height"
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="row">
          <label> Activity Level </label>
          <select
            name="activityLevel"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="sedentary"> Sedentary</option>
            <option value="lightly active">
              {' '}
              Lightly Active (1-3 days a week){' '}
            </option>
            <option value="moderately active">
              {' '}
              Moderately Active (3-5 days a week){' '}
            </option>
            <option value="active"> Active (6-7 days a week) </option>
            <option value="very active"> Very Active (7 days a week) </option>
          </select>
        </div>
        <span className="meal-exercise-cancel-submit-calorie-calc">
          <Link to="/"> Cancel </Link>
          <button className="calorie-calculator-submit" type="submit">
            {' '}
            Submit{' '}
          </button>
        </span>
      </form>
    </main>
  );
}
