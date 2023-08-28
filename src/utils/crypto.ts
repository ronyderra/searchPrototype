import crypto from "crypto";

const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);

export function encrypt(cmpId: string, ts: string) {
  const message = `${cmpId}-${ts}`;
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(message, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  
  return encryptedData;
}

export function decrypt(encryptedData: string) {
  try {
    const decipher = crypto.createDecipheriv(
      algorithm,
      Securitykey,
      initVector
    );
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
  } catch (error) {
    console.log(error.message);
  }
}
