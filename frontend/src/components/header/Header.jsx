import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { accountService } from '../../utils/AccountService';
import HeaderComponent from './HeaderComponent';

const Header = () => {

  const location = useLocation();
  const [isLogged, setIsLogged] = useState(accountService.isLogged());

  useEffect(() => {
    setIsLogged(accountService.isLogged());
  }, [location.pathname]);

  return (
    <>
      <HeaderComponent isLogged={isLogged} />
    </>
  );
};

export default Header;