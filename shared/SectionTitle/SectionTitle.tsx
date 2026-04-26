interface SectionTitleProps {
    title?: string
  }
  
  const SectionTitle = ({ title }: SectionTitleProps) => {
  
    return (
      <h1
        className={`text-[rgba(255_255_255/0.92)] text-[21px] font-bold`}
      >
        {title}
      </h1>
    )
  }
  
  export default SectionTitle
  