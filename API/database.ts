import "reflect-metadata";
import { createConnection } from "typeorm";

export const connectToDatabase = () => {
    createConnection().then(async _ => {
        console.log("Connected to the database!");
    }).catch(error => console.log(error));
};
