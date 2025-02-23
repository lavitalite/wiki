


interface DNSResourceRecord {
  type: string;
  ttl: number;
  rdlength: number;
  rdata: Buffer;
}


export class DNSQuestion {
  static encodeName(domain: string): Buffer {
    const buffer = Buffer.alloc(512)
    let offset = 0
    const labels = domain.split('.')
    for (const label of labels) {
      // write label length
      buffer.writeUInt8(label.length, offset++)
      // write label chars
      buffer.write(label, offset)
      offset += label.length
    }
    buffer.writeUInt8(0, offset++)
    return buffer.slice(0, offset)
  }
  static createQuestion(domain: string, type: number = 1, cls: number = 1): Buffer {
    const nameBuffer = this.encodeName(domain)
    const buffer = Buffer.alloc(nameBuffer.length + 4)
    // 编码后的域名放入缓冲区
    nameBuffer.copy(buffer, 0)
    let offset = nameBuffer.length
    // 写入QTYPE (2字节，大端序)
    buffer.writeUInt16BE(type, offset)
    offset += 2
    // 写入QCLASS (2字节，大端序)
    buffer.writeUInt16BE(cls, offset)

    return buffer
  }
}

interface CacheEntry {
  answers: DohAnswer[];
  timestamp: number;
  ttl: number;
}






export interface DohAnswer {
  name: string;
  ttl: number;
  type: number;
  data: string;
}

export interface DohError {
  code: "UrlParameterError" | "NoPermission" | "UrlPathError" | "NoResponse"
}

export class DnsCache {

  private cache: Map<string, CacheEntry> = new Map();
  private cleanupInterval: NodeJS.Timer;

  constructor(private cleanupIntervalMs: number = 60000) {
    this.cleanupInterval = setInterval(() => this.cleanup(), cleanupIntervalMs);
  }

  set(key: string, answers: DohAnswer[], ttl: number): void {
    this.cache.set(key, {
      answers,
      timestamp: Date.now(),
      // enforce ttl bounds
      ttl: Math.max(60, Math.min(ttl, 600))
    })
  }


  get(key: string): DohAnswer[] | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const age = (Date.now() - entry.timestamp) / 1000
    if (age > entry.ttl) {
      this.cache.delete(key)
      return null
    }
    return entry.answers
  }


  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      const age = (now - entry.timestamp) / 1000
      if (age > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval)
    this.cache.clear()
  }
}