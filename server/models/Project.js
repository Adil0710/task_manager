import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    notices: [{ type: Schema.Types.ObjectId, ref: "Notice" }],
    isArchived: { type: Boolean, default: false },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
