// components/withAuth.js
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from './context/context';
import Unauthorized from './Unauthorized/page';
import { useCookie } from './hooks/useCookie.hook';

const withAuth = (WrappedComponent) => {
  return (props) => {
    // const user = useAuth();
    const router = useRouter();
    const cookieStorage = useCookie()
    let user = cookieStorage.get("username")
    console.log(user);

    useEffect(() => {
        console.log("esta es la pagina = dashboard");
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : <Unauthorized/>;
  };
};

export default withAuth;
