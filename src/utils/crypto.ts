import crypto, { Cipher, Decipher } from "crypto";
import { v4 as uuidv4 } from "uuid";

const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const message = "1-1693218184";
const Securitykey = crypto.randomBytes(32);

export function combineUUIDs(uuid1: string, uuid2: string) {
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  console.log("Encrypted message: " + encryptedData);
  splitCombinedUUIDs(encryptedData);
}

// Function to decrypt and split the combined UUIDs
export function splitCombinedUUIDs(encryptedData: any) {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  console.log("Decrypted message: " + decryptedData);
}
