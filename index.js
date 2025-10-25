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

app.get("/add", (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateInputs(num1, num2);
  if(error) return res.json(error)
  const sum = num1 + num2;
  if(sum < -1000000) {
    return res.json({ message: "Underflow" });
  }
  if(sum > 1000000) {
    return res.json({ message: "Overflow" });
  }
  res.json({ 
    status: success, 
    message: "the sum of the two numbers", 
    sum, 
  });
});
// subtraction 
app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateInputs(num1, num2);
  if(error) return res.json(error);
  const difference = num1 - num2;
  if(difference < -1000000) {
    return res.json({ message: "Underflow" });
  }
  if(difference > 1000000) {
    return res.json({ message: "Overflow" });
  }
  res.json({ 
    status: "success", 
    message: "the difference of the two numbers", 
    difference, 
  });
});
// multiplication
app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateInputs(num1, num2);
  if(error) return res.json(error);
  const product = num1 * num2;
  if(product < -1000000) {
    return res.json({ message: "Underflow" });
  }
  if(product > 1000000) {
    return res.json({ message: "Overflow" });
  }
  res.json({ 
    status: "success", 
    message: "the product of the two numbers", 
    product, 
  });
});
// division
app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateInputs(num1, num2);
  if(error) return res.json(error);
  if(num2 === 0) {
    return res.json({ message: "Cannot divide by zero" });
  }
  const quotient = num1 / num2;
  if(quotient < -1000000) {
    return res.json({ message: "Underflow" });
  }
  if(quotient > 1000000) {
    return res.json({ message: "Overflow" });
  }
  res.json({ 
    status: "success", 
    message: "the division of the two numbers", 
    quotient, 
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/main.html'));
});

//your code here
module.exports = app;
