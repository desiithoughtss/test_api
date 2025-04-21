// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API Docs",
    version: "1.0.0",
    description: "A simple Express API with Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
    },
  ],
};

export const options = {
  swaggerDefinition,
  //   apis: ["../routes/auth.route.js"], // path to the API docs (JSDoc)
//   apis: ["/Users/akshit./Desktop/test_api/src/routes/auth.route.js"],
apis: ["./src/routes/*.js"],
};
