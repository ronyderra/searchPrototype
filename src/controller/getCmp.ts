import CMP from "../models/cmpJson";
import { ICMPDocument } from "../models/interfaces/cmpJson";
import { decrypt } from "../utils/crypto";

export const getCmp = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    console.log(id);
    
    const dataStr = decrypt(id);
    console.log(dataStr);
    const cmpId = dataStr.split("-")[0];
    const arId = dataStr.split("-")[1];
    const result: ICMPDocument = await CMP.getByCmpIdAndArId(cmpId, arId);
    console.log(result);
    res.status(200).json({ result });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.toString() });
  }
};