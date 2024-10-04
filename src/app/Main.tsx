import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { getToken } from '@/utils/localStorage/token';
function Main() {
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);
  const searchParams = useSearchParams();
  const sendBird = searchParams.get('sendBird');
  const sendbirdUrl = searchParams.get('sendbirdUrl');
  useEffect(() => {
    // if (
    //   getToken().access == '' ||
    //   getToken().access == undefined ||
    //   getToken().access == null
    // ) {
    //   router.replace('/login');
    // } else {

    console.log('sendBird', sendBird);
    if (sendBird) {
      router.push(`/orderList?sendbirdUrl=${sendbirdUrl}`);
    } else {
      router.push('/orderList');
    }
    // router.push('/orderList');
    // }
  }, []);
  return <main className={styles.main}></main>;
}

export default Main;
