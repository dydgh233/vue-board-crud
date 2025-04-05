// backend/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vue 게시판 API',
      version: '1.0.0',
      description: 'Vue + Node 게시판 프로젝트의 Swagger 문서',
    },
    servers: [
      {
        url: 'http://localhost:5000', // 배포 후에는 배포 주소로 변경
      },
    ],
  },
  apis: ['./routes/*.js'], // 주석 기반 API 정의 경로
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
