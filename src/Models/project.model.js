import { ObjectId, Schema, createCollection } from "../Config/mongoose.config.js";

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: [true, "Project name required"],
  },
  projectDescription: {
    type: String,
    required: [true, "Project description required"],
  },
  projectPanel: { type: ObjectId, ref: "Panel" },
  projectSurvey: { type: ObjectId, ref: "Survey" },
  endDate: String,
  createdBy: { type: ObjectId, ref: "User" },
  projectSurveyAnswers: [{ type: ObjectId, ref: "SurveyAnswer" }],
  projectPanelAnswers: [{ type: ObjectId, ref: "PanelAnswer" }],
});

const Project = createCollection("Project", projectSchema);

export default Project;
