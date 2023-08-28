import { Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface ICMP {
  cmpId: number;
  advertiserId: number;
  targetLink: string;
  totalCap: number;
  active: boolean;
  distribution: IDistribution[];
}

export interface IDistribution {
  arId: number;
  affiliateId: number;
  rules: IRules;
}

export interface IRules {
  device: string[];
  geo: string[];
  os: string[];
  browser: string[];
  cap: number;
  active: boolean;
}

export interface ICMPDocument extends ICMP, Document {
  toJSON(): ICMPDocument;
}

export interface ICMPModel extends Model<ICMPDocument> {
  getByCmpIdAndArId(cmpId: number, arId: number): Promise<ICMPDocument>;
}
