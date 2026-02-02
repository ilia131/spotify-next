interface SectionTitleProps {
    title?: string
  }
  
  const SectionTitle = ({ title }: SectionTitleProps) => {
    const marginTopClass = title ? 'mt-0' : 'hidden'
  
    return (
      <h1
        className={`text-[rgba(255_255_255/0.92)] text-[21px] font-bold  ${marginTopClass}`}
      >
        {title}
      </h1>
    )
  }
  
  export default SectionTitle
  