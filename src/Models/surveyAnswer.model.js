import { ObjectId, Schema, createCollection } from "../Config/mongoose.config";

const surveyAnswerSchema = new Schema({
  survey: { type: ObjectId, ref: "Survey" },
  project: { type: ObjectId, ref: "Project" },
  initiator: { type: ObjectId, ref: "User" },
  surveyResponse: [
    {
      question: String,
      answer: String,
    },
  ],
});

const SurveyAnswer = createCollection("SurveyAnswer", surveyAnswerSchema);

export default SurveyAnswer;
