import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setAuth, finishInitialLoad, logout } from '@/redux/features/authSlice';
import { useVerifyMutation } from '@/redux/services/authApiSlice';

export default function useVerify() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();
  const { isAuthenticated, initialLoadFinished } = useAppSelector((state) => state.auth);
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current || isAuthenticated || initialLoadFinished) return;
    hasVerified.current = true;

    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    if (!access || !refresh) {
      dispatch(finishInitialLoad());
      return;
    }

    const runVerify = async () => {
      try {
        await verify({ token: access }).unwrap();
        dispatch(setAuth({ access, refresh }));
      } catch {
        dispatch(logout());
      } finally {
        dispatch(finishInitialLoad());
      }
    };

    runVerify();
  }, [dispatch, verify, isAuthenticated, initialLoadFinished]);
}
