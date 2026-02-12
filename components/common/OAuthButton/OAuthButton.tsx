import FacebookIcon from '@/public/Icons/FacebookIcon';
import GoogleIcon from '@/public/Icons/GoogleIcon';
import { cn } from '@/utils/cn';
import  AppleIcon2  from '@/public/Icons/AppleIcon2';
import { JSX } from 'react';

type Provider = 'Google' | 'Facebook' | 'Apple';


interface OAuthButtonProps {
  readonly provider: 'Google' | 'Facebook' | 'Apple';
  onClick?: () => void;
}

const PROVIDER_CONFIG: Record<Provider, { icon: JSX.Element; className?: string }> = {
    Google: {
      icon: <GoogleIcon />,
      className: ' ',
    },
    Facebook: {
      icon: <FacebookIcon />,
      className: ''    
    },
    Apple: {
      icon: <AppleIcon2 />,
      className: '',
    },
};

export const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, onClick }) => {
  const { icon, className =''} = PROVIDER_CONFIG[provider];

  const baseClasses = 'relative text-[rgba(255,255,255,0.9)] justify-center  flex   py-[12.5px] mt-2 rounded-[34px] focus:outline-none  border border-[rgba(255,255,255,0.44)] text-[14px] w-full font-bold transform transition-transform duration-200 ease-in-out  hover:scale-105   max-[360]:text-[12px] items-center';



  return (
    <button className={cn(baseClasses, className)} onClick={onClick} type="button">
       <div className="absolute left-[32.5px] flex items-center">{icon}</div>
        <span className={provider === 'Facebook' ? 'mr-0' : ''}>
            Continue with {provider}
        </span>
    </button>
  );
};
