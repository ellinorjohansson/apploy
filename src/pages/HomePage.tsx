// HomePage.tsx

import {
  LayoutBlockVariation,
  LayoutColumnsElement,
  LayoutColumnsVariation,
  TypographyVariation,
} from '@digi/arbetsformedlingen';
import {
  DigiLayoutBlock,
  DigiMediaImage,
  DigiLayoutContainer,
  DigiIconChevronDown,
} from '@digi/arbetsformedlingen-react/src/lib/stencil-generated/components';
import { useNavigate } from 'react-router-dom';
import { AppButton } from '../components/buttons/AppButton';
import { Chart } from '../components/Chart';

import '../components/css/Homepage.css';
import { DigiLayoutColumns } from '@digi/arbetsformedlingen-react/src/lib/stencil-generated/components';
import { DigiTypography } from '@digi/arbetsformedlingen-react/src/lib/stencil-generated/components';
export const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/jobs');
  };

  return (
    <>
      <div className="body-wrapper">
        <DigiLayoutBlock afVariation={LayoutBlockVariation.SECONDARY}>
          <div className="intro-wrapper">
            <DigiLayoutContainer afVerticalPadding afNoGutter>
              <h2>Hitta ditt drömjobb</h2>
              <p>
                Upptäck tusentals aktuella jobbannonser från hela landet –
                anpassade efter dina intressen och mål.
              </p>
              <p>
                Oavsett om du är ny i arbetslivet eller vill ta nästa steg i
                karriären finns möjligheten här. Din framtid börjar idag!
              </p>
            </DigiLayoutContainer>
            <AppButton onClick={handleClick} children={'Hitta nu'}></AppButton>
          </div>
          <figure className="hero-container">
            <DigiMediaImage
              afUnlazy
              afFullwidth
              afSrc="/images/Hero-image AF.png"
              afAlt="Hero image for Apploys homepage"
            ></DigiMediaImage>
            <a className="chevron-container" href="#chart-container">
              <DigiIconChevronDown></DigiIconChevronDown>
            </a>
          </figure>
          {/* <NavLink to={"/user"}>Till din sida</NavLink> */}
        </DigiLayoutBlock>
        <div id="chart-container">
          <DigiLayoutBlock>
            <DigiLayoutColumns
              afElement={LayoutColumnsElement.DIV}
              afVariation={LayoutColumnsVariation.TWO}
            >
              <div>
                <DigiTypography
                  afVariation={TypographyVariation.SMALL}
                >
                  <h2>Diagram</h2>
                  <p>blablabla</p>
                </DigiTypography>
              </div>
              <div>
                <Chart></Chart>
              </div>
            </DigiLayoutColumns>
          </DigiLayoutBlock>
        </div>
      </div>
    </>
  );
};
