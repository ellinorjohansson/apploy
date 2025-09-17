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
import { Chart } from '../components/Chart';
import { CustomLinkButton } from '../components/buttons/CustomLinkButton';

import '../styles/pages/Homepage.css';
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
        <div className="first-container">
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
              <CustomLinkButton
                afHref="#"
                afHideIcon={false}
                onClick={handleClick}
                className="intro-link-button"
              >
                Hitta nu
              </CustomLinkButton>
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
          </DigiLayoutBlock>
        </div>
        <div id="chart-container" className="chart-wrapper">
          <DigiLayoutBlock afVariation={LayoutBlockVariation.TRANSPARENT}>
            <DigiLayoutColumns
              afElement={LayoutColumnsElement.DIV}
              afVariation={LayoutColumnsVariation.TWO}
              className="chart-columns"
            >
              <div className="chart-text">
                <DigiTypography afVariation={TypographyVariation.SMALL}>
                  <h2>Dagens jobb per region</h2>
                  <p>
                    Diagrammet visar hur många jobbannonser som har publicerats
                    de senaste 24 timmarna, uppdelat per region. Staplarna
                    representerar antal jobb i varje län, vilket gör det enkelt
                    att se var flest jobb är tillgängliga just idag.
                  </p>
                </DigiTypography>
              </div>
              <div className="chart-wrapper chart">
                <Chart></Chart>
              </div>
            </DigiLayoutColumns>
          </DigiLayoutBlock>
        </div>
      </div>
    </>
  );
};
