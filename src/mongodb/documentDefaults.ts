import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export const CustomDocumentBuild = (custDoc: any, collection?: string) => {
  var schema: Schema = new Schema(custDoc, {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      currentTime: () => new Date(),
    },
    versionKey: false,
    collation: { locale: "he", strength: 1 },
    collection,
  });

  schema.statics.getById = async function getById(_id: ObjectId) {
    try {
      const query = this.findOne({ _id });
      return query.exec().then((doc: any) => (doc ? doc.toJSON() : undefined));
    } catch (error: any) {
      console.log(error.message);
      return undefined;
    }
  };
  schema.statics.removeById = async function removeById(_id: ObjectId) {
    return new Promise(async (res, rej) => {
      const query = this.findOneAndRemove({ _id });
      query.exec().then((r: any) => {
        if (!r) rej();
        else res(true);
      });
    });
  };

  return schema;
};
