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
  arId: Number,
  affiliateId: Number,
  rules: RulesSchema,
});

const CMPSchema = new Schema({
  cmpId: Number,
  advertiserId: Number,
  targetLink: String,
  totalCap: Number,
  active: Boolean,
  distribution: [DistributionSchema],
});

export const schema = CustomDocumentBuild(CMPSchema, "cmps");

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
schema.statics.getByCmpIdAndArId = async function getById(
  cmpId: string,
  arId: string
) {
  try {
    const query = this.aggregate([
      { $match: { cmpId } },
      { $unwind: "$distribution" },
      { $match: { "distribution.arId": arId } },
      { $replaceRoot: { newRoot: "$distribution" } },
    ]);
    return query.exec().then((doc: any) => doc);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
};
const CMP: ICMPModel = model<ICMPDocument, ICMPModel>("cmps", schema);
export default CMP;
export { ICMP, ICMPModel };
