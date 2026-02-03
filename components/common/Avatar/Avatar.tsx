import Image , { StaticImageData } from "next/image"

interface AvatarProps {
    images: string | StaticImageData
  }

const Avatar = ({images}: AvatarProps) => {
  return (
    <div className="w-12.5 h-12.5  overflow-hidden rounded-full">
            <Image
                src={images}
                width={50}
                height={50}
                alt="Cover"
                unoptimized
                />
     </div>
  )
}

export default Avatar