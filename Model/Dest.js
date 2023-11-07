import mongoose from "mongoose";
const DestSchema = new mongoose.Schema(
  {
    name: { type: String },
    coverimage:  { type: String },
    maintype: { type: String },
    over: [String],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trek' }],
    blogname1:{ type: String },
    blogpara1: { type: String },
    blogbutton1: { type: String },
    blogimage1: { type: String },
    blogalt1:{ type: String },
    blogname2: { type: String },
    blogpara2: { type: String },
    blogbutton2:{ type: String },
    blogimage2: { type: String },
    blogalt2:{ type: String },
    blogname3 : { type: String },
    blogpara3 : { type: String },
    blogbutton3 : { type: String },
    blogimage3: { type: String },
    blogalt3:{ type: String },

  },
  { timestamps: true }
)
export default mongoose.model("Dest", DestSchema);
