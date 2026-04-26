interface TrackInfoProps {
  artist: string
  album: string
  title: string
}
const TrackInfo = ({ artist, album, title }: TrackInfoProps) => {
  return (
    <div className="text-[10px] font-bold text-white/90 ">
       <div className="flex flex-col gap-1">
          <div className="text-[20px] font-bold flex gap-1"> 
               <span className="text-[11px] font-medium  text-[#ffffff98]">EP1 </span>
               <span className="text-[12px] font-bold">:  &nbsp; Azmayeshgah</span>
          </div>
           <div className="flex">
               <span className="text-white/80 text-[8px]">Farshad 4 Life & Nima DW</span >
            </div>
          </div>
          
          <div className="w-25 h-10 flex pt-5 justify-between items-center"
                        
          >
            <div className="w-15.5 rounded-[40px] h-4 items-center  bg-linear-to-r
            shadow-xl justify-center   glassmorphism-preview
            flex    ">
              <div className="flex items-center justify-between w-15 h-4 rounded-[40px]  px-1.75">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 14 15" fill="none"
             className="w-1.5 h-2"
            >
            <path
              d="M1.87154 3.38792H5.6033L8.68989 0.178025C8.91866 -0.0580677 9.28882 -0.0599729 9.51742 0.17612C9.63382 0.292452 9.69093 0.447443 9.69093 0.604311H9.69277V2.58101L1.35845 11.3014C1.27745 11.3861 1.21499 11.4878 1.17529 11.5996C0.941318 11.502 0.728793 11.3568 0.550402 11.1725C0.210795 10.8237 0 10.3404 0 9.80908V5.31945C0 4.78812 0.210795 4.3048 0.548726 3.95615C0.900459 3.59297 1.37348 3.38792 1.87154 3.38792ZM12.7886 1.73624C13.0645 1.44973 13.5134 1.44844 13.791 1.73322C14.0686 2.01797 14.0698 2.48133 13.7939 2.76784L9.69277 7.04353V13.8731C9.69277 14.207 9.43007 14.48 9.10458 14.48C8.94015 14.48 8.79183 14.4099 8.68452 14.2973L5.63368 11.7389H5.18906L2.26797 14.7843C1.99206 15.0708 1.54315 15.072 1.26557 14.7873C0.98798 14.5025 0.986759 14.0391 1.26264 13.7526L9.28944 5.38426L9.69277 4.96225V4.96383L12.7886 1.73624Z"
              fill="white"
              fillOpacity="0.76"
            />
            </svg>
             <p className="text-[5px]">preview episode</p>
             </div>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="3" viewBox="0 0 15 3" fill="none">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white"/>
              <circle cx="7.5" cy="1.5" r="1.5" fill="white"/>
              <circle cx="13.5" cy="1.5" r="1.5" fill="white"/>
              </svg>
            </div>
          </div>
        
   </div>
  )
}

export default TrackInfo