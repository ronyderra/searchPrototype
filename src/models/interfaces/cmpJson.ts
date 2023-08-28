import { Document, Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface ICMP {
  cmpId: string;
  advertiserId: number;
  targetLink: string;
  totalCap: number;
  active: boolean;
  distribution: distribution[];
}

export interface distribution {
  arId: string;
  affiliateId: number;
  rules: rules;
}

export interface rules {
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
  findCmp(username: string, password: string): Promise<ICMPDocument>;
}
