import React, { useEffect } from 'react';
import Authentication from '../components/Authentication/Authentication';

const Home = () => {
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     props.history.push('/login');
  //   }
  // });

  // try {
  //   window.herpderp = history;
  // } catch {}

  return (
    <>
      <Authentication />
    </>
  );
};

export default Home;
