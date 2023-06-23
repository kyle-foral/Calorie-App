import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import authMiddleware from './lib/authorization-middleware.js';
import pg from 'pg';
import ClientError from './lib/client-error.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning *
      `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/sign-in', authMiddleware, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
    select "userId",
            "hashedPassword"
    from "users"
    where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (error) {
    next(error);
  }
});

app.post('/api/food', async (req, res, next) => {
  try {
    const { mealDescription, dayId } = req.body;
    if (mealDescription === '') {
      throw new ClientError(400, 'Please enter a meal description.');
    }
    if (dayId === 'default') {
      throw new ClientError(400, 'Please select a valid day.');
    }
    const sql = `
      insert into "food" ("mealDescription", "dayId")
      values ($1, $2)
      returning *
      `;
    const params = [mealDescription, dayId];
    const result = await db.query(sql, params);
    const [newMeal] = result.rows;
    res.status(201).json(newMeal);
  } catch (err) {
    next(err);
  }
});

app.get('/api/food/', async (req, res) => {
  try {
    const sql = `
        select "foodId", "mealDescription", "dayId"
        from "food"
        order by "dayId"
        `;
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'an unexpected error occured' });
  }
});

app.get('/api/day/:dayId', async (req, res) => {
  try {
    const { dayId } = req.params;
    const sql = `
        select "foodId", "mealDescription", "dayId"
        from "food"
        where "dayId" = $1
        `;
    const params = [dayId];
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'an unexpected error occured' });
  }
});

app.get('/api/meal/:foodId', async (req, res) => {
  try {
    const { foodId } = req.params;
    const sql = `
        select "foodId", "mealDescription", "dayId"
        from  "food"
        where "foodId" = $1
        `;
    const params = [foodId];
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'an unexpected error occured' });
  }
});

app.patch('/api/meal/:foodId', async (req, res) => {
  try {
    const foodId = req.params;
    if (foodId < 1) {
      res.status(400).json({ error: 'foodId must be a positive integer' });
      return;
    }
    const { dayId, mealDescription } = req.body;
    const sql = `
      update  "food"
        set   "updatedAt" = now(),
              "dayId" = $1,
              "mealDescription" = $2
        where "foodId" = $3
        returning *
    `;
    const params = [dayId, mealDescription, foodId];
    const result = await db.query(sql, params);
    const [item] = result.rows;
    if (!item) {
      res.status(404).json({ error: `cannot find item with foodId ${foodId}` });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.delete('/api/meal/:foodId', async (req, res) => {
  try {
    const { foodId } = req.params;
    const sql = `
                DELETE FROM "food"
                where "foodId"=$1
                returning *
                `;
    const params = [foodId];
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).send({ error: 'database querying failed.' });
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
