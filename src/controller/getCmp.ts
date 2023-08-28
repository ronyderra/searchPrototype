import CMP from "../models/cmpJson";
import { ICMPDocument } from "../models/interfaces/cmpJson";
import { elegantUnpair } from "../utils/crypto";

export const getCmp = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const dataStr = elegantUnpair(id);
    const result: ICMPDocument = await CMP.getByCmpIdAndArId(
      dataStr[0],
      dataStr[1]
    );
    res.status(200).json({ result });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.toString() });
  }
};
