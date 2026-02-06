interface TitleProps {
    title : string
}


const TitleMusic = ({title}:TitleProps) => {
  return (
    <h1  className="text-[rgba(255,255,255,1)] text-[18px] font-semibold">{title}</h1> 

  )
}

export default TitleMusic