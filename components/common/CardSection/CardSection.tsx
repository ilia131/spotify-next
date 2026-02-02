import SectionTitle from "../SectionTitle/SectionTitle"
import CardSlider from "../CardSlider/CardSlider"
import { StaticImageData } from "next/image"
interface CardSectionProps {
    title: string
    items: { picture: string | StaticImageData }[]
}
  
const CardSection = ({ title, items }: CardSectionProps) => {
    return (
      <section className="pt-5.75 grid gap-3 relative overflow-hidden">
        <SectionTitle title={title} />
        <CardSlider cardimages={items} />
      </section>
    )
}

export default CardSection