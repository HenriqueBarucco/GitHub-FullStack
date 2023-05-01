export const optionsSwagger = {
    definition: {
        info: {
            title: "Shaw and Partners Test API",
            version: "1.0.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            contact: {
                name: "Henrique Barucco",
                url: "https://henriquebarucco.com.br",
                email: "contato@henriquebarucco.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
};
