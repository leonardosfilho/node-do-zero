//import {createServer} from 'node:http'
//request trás informações, response usado para devolver respostas
//const server = createServer((request, response) => {
//    response.write('Hello World')
//    return response.end()
//})

//server.listen(3333)


// POST localhost:3333/videos
// DELETE localhost:3333/videos/1
// GET localhost:3333/videos/

// npm install fastify  
// framework
//npm run dev 

// node --watch serve para que o servido reinicie automáticamente quando sofrer alguma alteração no código

// node --watch --no-warnings server para retirar o aviso de experimental
//localhost:3333


import {fastify} from 'fastify'

//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

// PEGAR,ENVIAR,EDITAR, DELETAR, ALTERAR INFOR, 
// GET, POST, PUT, DELETE, PATCH, HEAD, OPTION

// POST http://localhost:3333/videos

// Route Parameter

// navegador só roda na rota get

// Request Body

server.post('/videos',async (request, reply) => {

const {title, description, duration} = request.body

   await  database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})



server.get('/videos',async (request, reply) => {

    const search = request.query.search

    console.log(search)

    const videos = await database.list(search)

    return videos
})


server.put('/videos/:id', async (request, reply) => {
   const videoId = request.params.id
   const {title, description, duration} = request.body

 await  database.update(videoId, {
    title,
    description,
    duration,
   })

   // resposta com sucesso mais sem conteudo
   return reply.status(204).send()
})


server.delete('/videos/:id',async (request, reply) => {
    const videoId = request.params.id
    

   await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    host: '0.0.0.0',
    port:process.env.PORT ?? 3333,
})


//rotas com o framework com o fastify
// ( Create,Read,Update,Delete)