
const Preview = () => {
  return (
     <div className="w-38.25 h-7.5 flex items-center justify-center rounded-[14px] backdrop-blur-[2px] bg-linear-to-br from-white/15 via-white/5 to-black/40 shadow-[inset_-1px_-1px_-3px_rgba(255,255,255,0.7),inset_1px_1px_4px_rgba(0,0,0,0.3)]">
            <div className="w-32.5 h-7.5 flex items-center  gap-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <path d="M1.87154 3.38792H5.6033L8.68989 0.178025C8.91866 -0.0580677 9.28882 -0.0599729 9.51742 0.17612C9.63382 0.292452 9.69093 0.447443 9.69093 0.604311H9.69277V2.58101L1.35845 11.3014C1.27745 11.3861 1.21499 11.4878 1.17529 11.5996C0.941318 11.502 0.728793 11.3568 0.550402 11.1725C0.210795 10.8237 0 10.3404 0 9.80908V5.31945C0 4.78812 0.210795 4.3048 0.548726 3.95615C0.900459 3.59297 1.37348 3.38792 1.87154 3.38792ZM12.7886 1.73624C13.0645 1.44973 13.5134 1.44844 13.791 1.73322C14.0686 2.01797 14.0698 2.48133 13.7939 2.76784L9.69277 7.04353V13.8731C9.69277 14.207 9.43007 14.48 9.10458 14.48C8.94015 14.48 8.79183 14.4099 8.68452 14.2973L5.63368 11.7389H5.18906L2.26797 14.7843C1.99206 15.0708 1.54315 15.072 1.26557 14.7873C0.98798 14.5025 0.986759 14.0391 1.26264 13.7526L9.28944 5.38426L9.69277 4.96225V4.96383L12.7886 1.73624Z" fill="white" fill-opacity="0.76"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                <g clip-path="url(#clip0_156_23)">
                <rect width="12" height="10" rx="1" fill="white" fill-opacity="0.76"/>
                <path d="M5.672 3.32V4.72H7.552V5.608H5.672V7.088H7.792V8H4.552V2.408H7.792V3.32H5.672Z" fill="black" fill-opacity="0.81"/>
                </g>
                <defs>
                <clipPath id="clip0_156_23">
                <rect width="12" height="10" rx="1" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <p className="text-[12px] text-[rgba(255_255_255/0.77)] font-normal">Preview playlist</p>
            </div>
        </div>
  )
}

export default Preview