// ErrorPage.tsx

import {
  DigiNotificationErrorPage,
  DigiLinkButton,
} from '@digi/arbetsformedlingen-react';
import {
  ErrorPageStatusCodes,
  LinkButtonSize,
  LinkButtonVariation,
} from '@digi/arbetsformedlingen';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/ErrorPage.css';

export const ErrorPage = () => {
  const navigate = useNavigate();

  // Go back from error page
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="error-page">
      <DigiNotificationErrorPage
        afHttpStatusCode={ErrorPageStatusCodes.NOT_FOUND}
      >
        <p slot="bodytext">
          Det kan bero på att länken är felaktig eller att sidan inte finns
          kvar. Du kan prova att ladda om sidan eller använda länkarna för att
          komma vidare.
        </p>

        <ul slot="links">
          <li>
            <DigiLinkButton
              afHref="#"
              afSize={LinkButtonSize.MEDIUM}
              afVariation={LinkButtonVariation.PRIMARY}
              onClick={(e) => {
                e.preventDefault();
                handleGoBack();
              }}
            >
              Till föregående sida
            </DigiLinkButton>
          </li>
          <li>
            <DigiLinkButton
              afHref="/"
              afSize={LinkButtonSize.MEDIUM}
              afVariation={LinkButtonVariation.PRIMARY}
            >
              Till startsidan
            </DigiLinkButton>
          </li>
        </ul>
      </DigiNotificationErrorPage>
    </div>
  );
};
