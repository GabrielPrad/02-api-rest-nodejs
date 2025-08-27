import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import request  from 'supertest'
import { app } from '../src/app'

describe ('Transactions routes', () =>{
  beforeAll(async () => {
    await app.ready()
  })


afterAll(async() => {
  await app.close()
})

// Todo teste deve ser independente. Se abster de contexto

  it('Should be able to create a new transaction', async() => {
    const response = await request(app.server)
      .post('/transaction')
      .send({
        title: "New transaction",
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
      console.log(response.headers); // Isso ou response.get('Set-Cookie') / Nome do header
      
  })

  it('Should be able to list all transactions', async() => {
    const createTransactionResponse = await request(app.server)
      .post('/transaction')
      .send({
        title: "New transaction",
        amount: 5000,
        type: 'credit',
      })
      const rawSetCookie = createTransactionResponse.get('Set-Cookie') as string[]
      const cookies = rawSetCookie[0].split(';')[0] 

      console.log("Cookies recebido: ", cookies);
      
      const listTransactionResponse = await request(app.server)
      .get('/transaction')
      .set('Cookie', cookies)
      .expect(200)

     expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: "New transaction",
        amount: 5000,
      })
     ]) 
  })
})
