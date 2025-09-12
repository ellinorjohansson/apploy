// components/AppButton.tsx

import { DigiButton } from "@digi/arbetsformedlingen-react";
import { ButtonSize, ButtonVariation } from "@digi/arbetsformedlingen";

interface AppButtonProps {
  onClick: () => void;
  children: React.ReactNode; // Says the component can recieve anything inside the tag
}

export const AppButton = ({ onClick, children }: AppButtonProps) => {
  return (
    <DigiButton
      className="app-button"
      onClick={onClick}
      afSize={ButtonSize.MEDIUM}
      afVariation={ButtonVariation.PRIMARY}
      afColor="primary"
      afFullWidth={false}
    >
      {children}
    </DigiButton>
  );
};
