export class ListenSession {
    private sessionId: string;
  
    constructor() {
      this.sessionId =
        crypto.randomUUID();
    }
  
    getId(): string {
      return this.sessionId;
    }
  
    reset(): void {
      this.sessionId =
        crypto.randomUUID();
    }
  }