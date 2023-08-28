import CMP from "../models/cmpJson";
import { ICMPDocument } from "../models/interfaces/cmpJson";

export const getCmp = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    let result: ICMPDocument;

    return;
  } catch (error: any) {
    res.status(500).json({ message: error.toString() });
  }
};
