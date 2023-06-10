import {app} from "./app.js";
import {connection} from "./data/database.js"  

connection();

app.listen(process.env.port,() => {
    console.log(`Server is working on port: ${process.env.port} in ${process.env.NODE_ENV} Mode`);
});