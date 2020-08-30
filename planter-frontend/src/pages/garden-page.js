import React from 'react';
import NavBar from '../components/Navigation/NavBar';
import Authentication from '../components/Authentication/Authentication';
import Garden from '../components/Garden/Garden';
const GardenPage = () => {
  return (
    <>
      <NavBar />
      {/* <Garden /> */}
      <Authentication />
    </>
  );
};

export default GardenPage;
