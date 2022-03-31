import Bcrypt, { compare } from 'bcryptjs';

export const Encryptor = async (unique_id: string) => {
  return await Bcrypt.hash(unique_id, 12);
};

export const EncryptionCompare = async (unique_id: string, verification_uid: string) => {
  const isValid = await compare(unique_id, verification_uid);
  return isValid;
};
