const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with false if the num given is not equal to the sum', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));
    it('responds with true if the num given is equal to the sum', () => 
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 70})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
    // it('does not repeat the sum if the array was already given', () => 
    //   agent.post('/sumArray')
    //       .send({array: [2,5,7,10,11,15,20], num: 70})
    //       .then((res) => {
    //         expect(res.body.result).toEqual(true);
    //   }));
  });

  describe('STRING /numString', () => {
    it('responds with 200', () => agent.post('/numString').expect(200));
    it('responds with the length of the string given', () => 
    agent.post('/numString')
      .send({str: 'hola'})
      .then((res) => {
        expect(res.body.str).toBe(4);
      }));
    it('responds with status 400 (bad request) if str is a number', () => 
    agent.post('/numString')
      .send({str: 4})
      .then((res) => {
        expect(res.status).toEqual(400);
      }));
    it('responds with status 400 (bad request) if str is empty', () => 
    agent.post('/numString')
      .send({str: null})
      .then((res) => {
        expect(res.status).toEqual(400);
      }));
  });

  describe('PLUCK /pluck', () => {
    it('responds with 200', () => agent.post('/pluck').expect(200));
    it('responds to pluck objective', () =>
      agent.post('/pluck')
        .send({array: [{p1: 1}, {p2: 2}, {p3: 3}], prop: 'p2'})
        .then((res) => {
          expect(res.body.result).toEqual([2]);
        }));
    it('responds with status 400 (bad request) si array no es un arreglo', () =>
      agent.post('/pluck')
        .send({array: 'hola', prop: 'p2'})
        .then((res) => {
          expect(res.status).toEqual(400);
        }));
    it('responds with status 400 (bad request) si array no es un arreglo', () =>
      agent.post('/pluck')
        .send({array: [{p1: 1},{p2: 2}, {p3: 3}], prop: null})
        .then((res) => {
          expect(res.status).toEqual(400);
        }));
  });
});

