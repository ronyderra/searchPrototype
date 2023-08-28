import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import { CustomDocumentBuild } from "../mongodb/documentDefaults";
import { ICMPDocument, ICMPModel, ICMP } from "./interfaces/cmpJson";

const RulesSchema = new Schema({
  device: [String],
  geo: [String],
  os: [String],
  browser: [String],
  cap: Number,
  active: Boolean,
});

const DistributionSchema = new Schema({
  arId: String,
  affiliateId: Number,
  rules: RulesSchema,
});

const CMPSchema = new Schema({
  cmpId: String,
  advertiserId: Number,
  targetLink: String,
  totalCap: Number,
  active: Boolean,
  distribution: [DistributionSchema],
});

export const schema = CustomDocumentBuild(CMPSchema, "CMPs");

schema.statics.createNew = async function createNew(newDocument: ICMP) {
  try {
    return new this(newDocument).save();
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};
schema.statics.updateById = async function updateById(
  _id: ObjectId,
  updatedDocument: ICMP
) {
  return new Promise((res, rej) => {
    const query = this.findByIdAndUpdate({ _id }, updatedDocument, {
      new: true,
    });
    query.exec().then((r: any, err: any) => {
      if (err || !r) rej();
      else res(r);
    });
  });
};
const CMP: ICMPModel = model<ICMPDocument, ICMPModel>("CMPs", schema);
export default CMP;
export { ICMP, ICMPModel };
