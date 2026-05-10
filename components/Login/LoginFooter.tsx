import React from 'react'
import { useRouter } from 'next/navigation'
const LoginFooter = () => {
  const router = useRouter()
  return (
    <section>
           <div className='h-16 flex flex-col justify-center  text-center w-full mt-6.25 gap-5.5'>
            <p className='text-[rgba(255,255,255,0.61)] text-[14px]'>Don’t have an account ?</p>
            <p onClick={() => router.push('/auth/register')} className='text-[rgba(255,255,255,1)] text-[14px] cursor-pointer'>Sign up</p>
          </div>
          <p className='text-[rgba(255,255,255,0.70)] text-center text-[10px] mt-41.5 mb-2'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
    </section>
    )
}

export default LoginFooter