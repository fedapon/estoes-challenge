const path = require("path")

const configSwagger = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "estoes-challenge",
            description: "This API is an backend challenge for EstoEs",
            contact: {
                name: "Fernando Pons",
                email: "fedapon@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Server Local",
            },
        ],
    },
    apis: [`${path.join(__dirname, "../documentation/*.yml")}`],
}
module.exports = { configSwagger }
