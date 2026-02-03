import SectionTitle from "../SectionTitle/SectionTitle"
import CardSlider from "../CardSlider/CardSlider"
import { StaticImageData } from "next/image"

export interface CardSectionProps {
    title: string
    items: { picture: string | StaticImageData ; desc:string }[]
}
  
const CardSection = ({ title, items }: CardSectionProps) => {
    return (
      <section className="pt-5.75 grid gap-3 relative overflow-hidden">
        <SectionTitle title={title} />
        <CardSlider cardimages={items} title={title} />
      </section>
    )
}

export default CardSection