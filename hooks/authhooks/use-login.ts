import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { useLoginMutation } from "@/redux/services/authApiSlice";
import { setAuth } from "@/redux/features/authSlice"; 
import { toast } from 'react-toastify';

interface LoginFormData {
  email: string;
  password: string;
}

const setCookie = (name: string, value: string, days = 1) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: LoginFormData) => {
    const { email, password } = values;

    try {
      const result = await login({ email, password }).unwrap();

      const access = result.access;
      const refresh = result.refresh;

      if (!access || !refresh) {
        throw new Error("توکن دریافت نشد");
      }

      // localStorage
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      // cookies (for Next middleware)
      setCookie('access', access);
      setCookie('refresh', refresh);

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

    } catch (err: unknown) {

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
