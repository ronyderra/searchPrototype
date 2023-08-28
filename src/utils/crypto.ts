import crypto from "crypto";

const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);

export function encrypt(cmpId: string, ts: string) {
  const message = `${cmpId}-${ts}`;
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  console.log("Encrypted message: " + encryptedData);
  return encryptedData;
}

// Function to decrypt and split the combined UUIDs
export function decrypt(encryptedData: string) {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  console.log("Decrypted message: " + decryptedData);
  return decryptedData;
}