import axios from "axios";

test.skip("Deve testar a API (GET /)", async function(){
   const response = await axios({
    url:"http://localhost:3001",
    method:"get",
   })
   expect(response.status).toBe(200)
})

test("Deve testar a API (GET /api/invoice)", async function(){
   const response = await axios({
    url:"http://localhost:3001/api/invoice",
    method:"get",
   })
   expect(response.status).toBe(200)
},20000)

test("Deve testar a API (POST /api/user)", async function(){
   const response = await axios({
    url:"http://localhost:3001/api/user",
    method:"GET",
   })
   expect(response.status).toBe(200)
},20000)

test("Deve testar a API (GET /api/invoice/fetchall?id=&skip=4&take=20)", async function(){
   const response = await axios({
    url:"http://localhost:3001/api/invoice/fetchall",
    method:"get",
   })
   expect(response.status).toBe(200)
},20000)

