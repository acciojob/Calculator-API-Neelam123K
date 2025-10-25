// Add the Calculator APIs

const express = require('express');
const { stat } = require('fs');
const path = require('path');

const app = express();

app.use(express.static(__dirname))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

function validateInputs(num1, num2) {
  if(typeof num1 !== 'number' || typeof num2 !== 'number') {
    return { status: false, message: "Invalid data types" };
  }
  if(num1 < -1000000 || num2 < -1000000) {
    return { status: false, message: "Underflow" };
  }
  if(num1 > 1000000 || num2 > 1000000) {
    return { status: false, message: "Overflow" };
  }
  return null;
}

app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    const validation = validateInput(num1, num2);
    if (validation.status === 'error') {
        return res.status(400).json(validation);
    }

    const sum = num1 + num2;
    if (sum > 1000000) {
        return res.status(400).json({ status: 'error', message: 'Overflow' });
    }

    res.json({
        status: 'success',
        message: 'the sum of given two numbers',
        sum: sum
    });
});

app.post('/sub', (req, res) => {
    const { num1, num2 } = req.body;
    const validation = validateInput(num1, num2);
    if (validation.status === 'error') {
        return res.status(400).json(validation);
    }

    const difference = num1 - num2;
    if (difference < -1000000) {
        return res.status(400).json({ status: 'error', message: 'Underflow' });
    }

    res.json({
        status: 'success',
        message: 'the difference of given two numbers',
        difference: difference
    });
});

app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    const validation = validateInput(num1, num2);
    if (validation.status === 'error') {
        return res.status(400).json(validation);
    }

    const result = num1 * num2;
    if (result > 1000000) {
        return res.status(400).json({ status: 'error', message: 'Overflow' });
    }
    if (result < -1000000) {
        return res.status(400).json({ status: 'error', message: 'Underflow' });
    }

    res.json({
        status: 'success',
        message: 'The product of given numbers',
        result: result
    });
});

app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;
    const validation = validateInput(num1, num2);
    if (validation.status === 'error') {
        return res.status(400).json(validation);
    }

    if (num2 === 0) {
        return res.status(400).json({ status: 'error', message: 'Cannot divide by zero' });
    }

    const result = num1 / num2;
    if (result > 1000000) {
        return res.status(400).json({ status: 'error', message: 'Overflow' });
    }
    if (result < -1000000) {
        return res.status(400).json({ status: 'error', message: 'Underflow' });
    }

    res.json({
        status: 'success',
        message: 'The division of given numbers',
        result: result
    });
});
//your code here
module.exports = app;
