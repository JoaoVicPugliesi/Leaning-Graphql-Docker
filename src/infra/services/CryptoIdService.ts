import { IIdService } from '@domain/services/IIdService';
import { randomUUID, UUID } from 'crypto';

class CryptoIdService implements IIdService {
  v4(): UUID {
    return randomUUID();
  }
}

const iCryptoIdService = new CryptoIdService();

export { iCryptoIdService };