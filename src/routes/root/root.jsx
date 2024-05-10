import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import classes from './root.module.scss';

const telegram = window.Telegram.WebApp;

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    telegram.ready();
    navigate('/general');
  }, [navigate]);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.h1}>
          <Link to='/general'>All About NFTs</Link>
        </h1>
        {/* <w3m-button /> */}
      </header>
      <section className={classes.menu}>
        <Link to='/general'>General Trends</Link>
        {/* <Link to='/personal'>Personal</Link> */}
        <Link to='/search'>Search</Link>
      </section>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
