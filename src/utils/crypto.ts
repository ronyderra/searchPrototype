import crypto, { Cipher, Decipher } from "crypto";

const algorithm: string = "aes-256-cbc";
const secretKey: Buffer = Buffer.from("MySecretKey12345MySecretKey12345");

interface EncryptedData {
  iv: string;
  encryptedData: string;
}

// Function to combine and encrypt two UUIDs
export function combineUUIDs(uuid1: string, uuid2: string): EncryptedData {
  const iv: Buffer = crypto.randomBytes(16); // Initialization vector
  const combined: string = `${uuid1}-${uuid2}`;
  const cipher: Cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted: Buffer = Buffer.concat([
    cipher.update(combined),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };
}

// Function to decrypt and split the combined UUIDs
export function splitCombinedUUIDs(
  iv: string,
  encryptedData: string
): { uuid1: string; uuid2: string } {
  const decipher: Decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  const decrypted: string = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, "hex")),
    decipher.final(),
  ]).toString();

  const uuids: string[] = decrypted.split("-");
  const uuid1: string = uuids.slice(0, 5).join("-");
  const uuid2: string = uuids.slice(5).join("-");

  return { uuid1, uuid2 };
}
