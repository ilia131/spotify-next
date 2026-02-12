interface SubmitButtonProps {
    children: React.ReactNode;
    isLoading: boolean;
  
  }
  
  export const SubmitButton = ({ children  , isLoading}: SubmitButtonProps) => (
    <button  className='text-[rgba(0,0,0,0.9)] w-full py-3 text-[15px] focus:outline-none
       rounded-[34px] bg-[rgba(30,215,96,1)] font-bold 
       max-[360]:text-[13px]' 
       type="submit">

           {isLoading ? 'Loading...' : children}
       </button>

  );
  