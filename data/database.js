import mongoose from "mongoose";
export const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendapi",
    }).then((c) => console.log(`yDatabase Connected with ${c.connection.host}`)).catch((e) => console.log(e));
}