import axios from "axios";

test("Deve testar a API (GET /)", async function(){
   const response = await axios({
    url:"http://localhost:3001",
    method:"get",
   })
   expect(response.status).toBe(200)
})

test("Deve testar a API (GET /api/employees)", async function(){
   const response = await axios({
    url:"http://localhost:3001/api/employees?page=1&size=20&sortorder=asc",
    method:"get",
   })
   expect(response.status).toBe(200)
})

test("Deve testar a API (POST /api/employees)", async function(){
   const response = await axios({
    url:"http://localhost:3001/api/employees?page=3&size=2",
    method:"post",
    data: {
      date: '2022-01-02',
      department: 'Administrativo',
      id:"5555",
      name:"Pedro Santos",
      role:"Administrador",
    }
   })
   expect(response.status).toBe(200)
})

test("Deve testar a API (GET /api/employees/:id)", async function(){
   const response = await axios({
    url:"http://localhost:3001/api/employees/66476d7c51eda272e8ca1017",
    method:"get",
   })
   expect(response.status).toBe(200)
})


test("Deve testar a API (PUT /api/employees/:id)", async function(){
   const response = await axios({
    url:"http://localhost:3001/api/employees/6647b571f106870002beccfa",
    method:"put",
    data: {
      date: '2022-01-02',
      department: 'Administrativo',
      id:"6647b571f106870002beccfa",
      name:"Pedro Lara Dodo",
      role:"Administrador",
    }
   })
   expect(response.status).toBe(200)
})

test("Deve testar a API (DELETE /api/employees/:id)", async function(){
   const response = await axios({
    url:"http://localhost:3001/api/employees/6647d0d277d9964e889eec46",
    method:"delete",
   })
   expect(response.status).toBe(200)
})

