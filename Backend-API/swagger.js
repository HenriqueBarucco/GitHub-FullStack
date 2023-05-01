import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.js"];

const doc = {
    info: {
        title: "Backend API",
        description: "Shaw and Partners Test API",
        version: "1.0.0",
    },
    host: "localhost:8080",
    basePath: "/",
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("./server.js");
});
