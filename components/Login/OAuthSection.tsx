import { OAuthButton } from '@/components/common/OAuthButton/OAuthButton';

const OAuthSection = () => {
  return (
        <div className='flex flex-col'>
                <p className='text-[rgba(255,255,255,0.8)] text-center mt-3 font-medium text-[15px]'>or</p>
                <OAuthButton provider="Google" />
                <OAuthButton provider="Facebook" />
                <OAuthButton provider="Apple" />
            </div>
  )
}

export default OAuthSection