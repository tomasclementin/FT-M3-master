const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  })
})

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  let result = req.body.array.reduce((pValue, cValue) => pValue + cValue);
  if (result === req.body.num) {
    return res.send({
      result: true,
    })
  };
  return res.send({result: false});
});

app.post('/numString', (req, res) => {
  let {str} = req.body;
  if (str !== undefined) {
    if(typeof str === 'number' || str === null) {
      return res.sendStatus(400);
    }
    return res.send({
      str: req.body.str.length,
    });
  }
  return res.send('0');
});

app.post('/pluck', (req, res) => {
  let arr = req.body.array;
  let str = req.body.prop;
  if (arr !== undefined && str !== undefined) {
    if(!Array.isArray(arr) || str === null) {
      return res.sendStatus(400);
    }
    return res.send({
      result: [arr.filter(obj => obj[str])[0][str]],
    });
  }
  return res.send('0');
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
