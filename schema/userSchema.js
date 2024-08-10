import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true}
});

export default mongoose.model("userSchema",userSchema);