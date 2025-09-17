// Header.tsx

import {
  /*DigiHeader, DigiHeaderAvatar, */ DigiHeaderNavigation,
  DigiHeaderNavigationItem,
  DigiIconGlobe,
  DigiIconUserAlt,
  DigiMediaImage,
} from '@digi/arbetsformedlingen-react';
import '../styles/components/Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To tell navigation which page so the component can show clearly what page user are on

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      {/* 
            <DigiHeader
                afSystemName="Apploy"
                afHideSystemName={false}
                afMenuButtonText="Meny"
            >
                <a aria-label="Designsystemets startsida" href="/"></a> */}
      <section className="header-wrapper">
        <div className="header-container" slot="header-content">
          <div onClick={handleClick}>
            <DigiMediaImage
              afUnlazy
              afSrc="/svg/Logotyp.svg"
              afAlt="Hero image for Apploys homepage"
            ></DigiMediaImage>
          </div>
          <h1>Utforska aktuella jobbannonser från hela Sverige</h1>
          <div>
            <DigiIconGlobe></DigiIconGlobe>
            <DigiIconUserAlt>
              {/*                          <DigiHeaderAvatar            
                        afName="Linda Karlsson"
                        afSignature="KALIA"
                        afIsLoggedIn={true}
                        afHideSignature={true}
                        ></DigiHeaderAvatar> */}
            </DigiIconUserAlt>
          </div>
        </div>
        <div slot="header-navigation">
          <DigiHeaderNavigation
            afCloseButtonText="Stäng"
            afCloseButtonAriaLabel="Stäng meny"
            afNavAriaLabel="Huvudmeny"
          >
            <DigiHeaderNavigationItem afCurrentPage={location.pathname === '/'}>
              {' '}
              {/* Connected to useLocation() */}
              <Link to="/">Välkommen</Link>
            </DigiHeaderNavigationItem>
            <DigiHeaderNavigationItem
              afCurrentPage={location.pathname === '/jobs'}
            >
              <Link to="/jobs">Utforska jobbannonser</Link>
            </DigiHeaderNavigationItem>
            <DigiHeaderNavigationItem
              afCurrentPage={location.pathname === '/user'}
            >
              <Link to="/user">Mina sparade jobb</Link>
            </DigiHeaderNavigationItem>
            <DigiHeaderNavigationItem>
              <a href="/">Tips för CV & ansökan</a>
            </DigiHeaderNavigationItem>
            <DigiHeaderNavigationItem>
              <a href="/">Karriärguide</a>
            </DigiHeaderNavigationItem>
            <DigiHeaderNavigationItem>
              <a href="/">Lär dig mer om branscher</a>
            </DigiHeaderNavigationItem>
          </DigiHeaderNavigation>
        </div>
      </section>
      {/*  </DigiHeader> */}
    </>
  );
};
