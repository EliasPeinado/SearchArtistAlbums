module.exports = {
    type: "mysql",
    host: "aws.connect.psdb.cloud",
    port: 3306,
    username: "tdwopurxv5vsnyyr721q",
    password: "pscale_pw_rGLGvRHVYemkHzBDhOXbQYqR2AIcIZsEe7aCJMSFMbq",
    database: "admantest",
    synchronize: true,
    logging: false,
    entities: [
        "src/entities/*.ts"
    ],
    cli: {
        entitiesDir: "src/entities"
    },
    ssl: {
        rejectUnauthorized: true
    }
};
