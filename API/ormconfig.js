module.exports = {
    type: "mysql",
    host: "aws.connect.psdb.cloud",
    port: 3306,
    username: "53krloeb2hfykzpf8wmx",
    password: "pscale_pw_NxaI9HVw1fv6CMWO2Su5fLQ8rsEIhLZCAtu3uwilA2M",
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
