import { ObjectId, Schema, createCollection } from "../Config/mongoose.config";

const panelAnswerSchema = new Schema({
  panel: { type: ObjectId, ref: "Panel" },
  project: { type: ObjectId, ref: "Project" },
  initiator: { type: ObjectId, ref: "User" },
  panelResponse: [
    {
      question: String,
      answer: String,
    },
  ],
});

const PanelAnswer = createCollection("PanelAnwer", panelAnswerSchema);

export default PanelAnswer;
