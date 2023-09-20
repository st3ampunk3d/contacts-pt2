const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts Api',
        description: 'Contacts Api',
    },
    host: 'https://cse-314-week-2-contacts-api-part-2.onrender.com',
    schemes: ['https','http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);