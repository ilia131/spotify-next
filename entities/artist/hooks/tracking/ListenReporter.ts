interface ListenPayload {
    id: string;
    seconds: number;
    session_id: string;
  }
  
  type ListenRequest = (
    payload: ListenPayload
  ) => void;
  
  export class ListenReporter {
    private lastSentSeconds = 0;
  
    constructor(
      private readonly sendRequest: ListenRequest
    ) {}
  
    shouldSend(
      seconds: number
    ): boolean {
      return (
        seconds > 0 &&
        seconds >
          this.lastSentSeconds
      );
    }
  
    send(
      payload: ListenPayload
    ): void {
      if (
        !this.shouldSend(
          payload.seconds
        )
      ) {
        return;
      }
  
      this.lastSentSeconds =
        payload.seconds;
  
      this.sendRequest(payload);
    }
  
    markSent(
      seconds: number
    ): void {
      if (
        seconds >
        this.lastSentSeconds
      ) {
        this.lastSentSeconds =
          seconds;
      }
    }
  
    getLastSentSeconds(): number {
      return this.lastSentSeconds;
    }
  
    reset(): void {
      this.lastSentSeconds = 0;
    }
  }