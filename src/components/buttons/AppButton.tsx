// components/AppButton.tsx

import { DigiButton } from "@digi/arbetsformedlingen-react";
import { ButtonSize, ButtonVariation } from "@digi/arbetsformedlingen";

interface AppButtonProps {
  onClick: () => void;
  children: React.ReactNode; // Says the component can recieve anything inside the tag
  variant?: 'primary' | 'secondary'; // Optional variant prop
}

export const AppButton = ({ onClick, children, variant = 'primary' }: AppButtonProps) => {
  return (
    <DigiButton
      className="app-button"
      onClick={onClick}
      afSize={ButtonSize.MEDIUM}
      afVariation={variant === 'secondary' ? ButtonVariation.SECONDARY : ButtonVariation.PRIMARY}
      afFullWidth={false}
    >
      {children}
    </DigiButton>
  );
};
