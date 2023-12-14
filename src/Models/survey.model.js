import { Schema, createCollection } from "../Config/mongoose.config";

const surveySchema = new Schema({
  surveyName: {
    type: String,
    required: [true, "Survey name required"],
  },
  surveyDescription: {
    type: String,
    required: [true, "Survey description required"],
  },
  surveyQuestions: [
    {
      questionTitle: {
        type: String,
        required: [true, "Question title required"],
      },
      questionType: {
        type: String,
        required: [true, "Question type required"],
        // enum: { value: []}
      },
      questionAnswers: [{ type: String }],
    },
  ],
});

const Survey = createCollection("Survey", surveySchema);

export default Survey;
