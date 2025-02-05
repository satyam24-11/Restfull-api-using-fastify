const fastify = require('fastify')({ logger: true })
const routes = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fastify')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

//routes
fastify.get('/', async (request, reply) => {
    return { visiter: "LearnCodeOnline.in" }
})

routes.forEach((route, index) => {
    fastify.route(route)
})

//start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    }
    catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()