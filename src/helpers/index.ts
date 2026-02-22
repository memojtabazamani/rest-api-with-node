import * as crypto from "node:crypto";
const SECRET = 'CRAZY-REST-API';

export const random = () => crypto.randomBytes(
    128
).toString("base64");
export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac('sha256', SECRET)  // Create HMAC with SECRET as the key
        .update([salt, password].join('/'))  // Update with the data
        .digest('hex');  // Get the hash
};