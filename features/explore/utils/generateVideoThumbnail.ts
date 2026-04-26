export const generateVideoThumbnail = (videoUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
  
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.currentTime = 1;
  
      video.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        const image = canvas.toDataURL("image/png");
        resolve(image);
      });
    });
  };
  