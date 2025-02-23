/**
 * For certificate management: auto-renewal tls cert generation and distribution
 * attempt to renew  start at the auto renewal period and continue up until 24 hours before expiration
 * If a certificate fails to renew and another valid certificate exists for the hostname, deploy
 * the valid certificate within the last 24 hours before expiration
 */

export interface Certificate {
  id: string
  domain: string
  issuedAt: Date;
  expiresAt: Date;
  status: CertStatus
  type: CertType
  serialNumber: string
}



export enum CertStatus {
  Valid = "Valid",
  Expired = "Expired",
  Revoked = "Revoked",
  Pending = "Pending"
}


export enum CertificateType {
  DV = 'domain-validation',
  OV = 'organization-validation',
  EV = 'extended-validation'
}



