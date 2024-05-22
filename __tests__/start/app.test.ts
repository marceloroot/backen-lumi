import request from 'supertest'
import app from '../../src/infra/http/expres-adapter'

describe('Route testing', () => {
  jest.setTimeout(15000); // Aumenta o limite de tempo para 15 segundos

  it('Deveria retorar HTTP 200', async () => {
    const res = await request(app).get('/')
    expect(res.status).toEqual(200)
  })
});
