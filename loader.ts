interface LoaderProps {
    src: string;
    width?: number;
    quality?: number;
  }
  
 export default function myImageLoader({ src, width, quality }: LoaderProps): string {
  
  
    return `${src}`;
}