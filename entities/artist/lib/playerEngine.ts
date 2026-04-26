class PlayerEngine {

    audio: HTMLAudioElement | null = null
  
    load(url: string) {
      if (this.audio) {
        this.audio.pause()
      }
  
      this.audio = new Audio(url)
    }
  
    play() {
      this.audio?.play()
    }
  
    pause() {
      this.audio?.pause()
    }
  
    getCurrentTime() {
      return this.audio?.currentTime || 0
    }
  
  }
  
  export const playerEngine = new PlayerEngine()
  