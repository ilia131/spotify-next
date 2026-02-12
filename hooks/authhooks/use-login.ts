import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { useLoginMutation } from "@/redux/services/authApiSlice";
import { setAuth } from "@/redux/features/authSlice"; 
import { toast } from 'react-toastify';

interface LoginFormData {
  email: string;
  password: string;
}

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();


  const onSubmit = async (values: LoginFormData) => {
    const { email, password } = values;
    console.log(values)
    try {
      const result = await login({ email, password }).unwrap();

      const access = result.access;
      const refresh = result.refresh;

      if (!access || !refresh) {
        throw new Error("توکن دریافت نشد");
      }

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      dispatch(setAuth({ access, refresh })); 

      toast.success('Your Login is SuccessFull', {
        progressClassName: 'my-custom-progress-bar',
        style: {
          backgroundColor: '#121212',
          color: 'white',
          direction: 'ltr',
          fontFamily: 'monospace',
        },
      });

      router.push('/');
    }  catch (err: unknown) {
      let errorMsg = 'Login failed';
  
      if (err instanceof Error) {
        errorMsg = err.message;
      } else if (typeof err === 'object' && err !== null && 'data' in err) {
        const e = err as { data?: { detail?: string } };
        errorMsg = e.data?.detail ?? errorMsg;
      }
  
      toast.error(errorMsg);
    
    }
  };

  return {
    onSubmit,
    isLoading,
  };
}
