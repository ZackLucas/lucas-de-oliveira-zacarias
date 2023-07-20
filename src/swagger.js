import swaggerAutogen from 'swagger-autogen'
swaggerAutogen()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./core/protocols/configure.routes.js']

swaggerAutogen(outputFile, endpointsFiles)
