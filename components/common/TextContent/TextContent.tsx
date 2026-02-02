

interface TextContentProps {
    label: string
    subtitle?: string
}

const TextContent = ({subtitle , label}:TextContentProps) => {
  return (
    <div className="w-41 h-13.75 grid">
        {subtitle && (

    <p className="text-[13px] text-[rgba(255_255_255/0.5)]">{subtitle}</p> 
    )}
    <p className="text-[23px] text-[rgba(255_255_255/0.83)] font-600">{label}</p>
    </div>
  )
}

export default TextContent