import { Schema, createCollection } from "../Config/mongoose.config.js";

const panelSchema = new Schema({
  panelName: {
    type: String,
    required: [true, "Panel's name required"],
  },
  panelDescritpion: {
    type: String,
    required: [true, "Panel description required"],
  },
  panelQuestions: [
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

const Panel = createCollection("Panel", panelSchema);

export default Panel;
