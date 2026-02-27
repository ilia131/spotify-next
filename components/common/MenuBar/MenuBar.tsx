interface Props {
    isOpen: boolean
}

const MenuBar = ({isOpen}:Props) => {
  return (
    <div className={`fixed top-0 left-0 h-screen w-[85%] bg-[#242424] z-50 transition-transform duration-500 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
    </div>
  )
}

export default MenuBar