import AccountButton from "../NavSlider/AccountButton"
interface Props {
    isOpen: boolean
}

const MenuBar = ({isOpen}:Props) => {
  return (
    <div className={`fixed top-0 left-0 h-screen w-[85%] bg-[#242424] z-200 transition-transform duration-500 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="w-45 h-13 border-amber-500 border">
          <AccountButton />
        </div>
    </div>
  )
}

export default MenuBar