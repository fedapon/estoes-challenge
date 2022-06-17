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
                url:
                    process.env.SWAGGER_SERVER ||
                    `http://localhost:${process.env.PORT}/api/`,
                description: "Server",
            },
            {
                url: `http://localhost:${process.env.PORT}/api/`,
                description: "Local Server",
            },
        ],
    },
    apis: [`${path.join(__dirname, "../documentation/*.yml")}`],
}
module.exports = { configSwagger }
