import React from 'react';
import PublicHeader from './PublicHeader';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { accountService } from '../../utils/AccountService';
import LoggedHeader from './LoggedHeader';

const Header = () => {

    const location = useLocation();
    const [isLogged, setIsLogged] = useState(accountService.isLogged());
  
    useEffect(() => {
      setIsLogged(accountService.isLogged());
    }, [location.pathname]);
  
    return (
      <>
        {isLogged ? <LoggedHeader /> : <PublicHeader />}
      </>
    );
  };

export default Header;