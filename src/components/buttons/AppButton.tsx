// components/AppButton.tsx

import { DigiButton } from "@digi/arbetsformedlingen-react";
import { ButtonSize, ButtonVariation } from "@digi/arbetsformedlingen";

interface AppButtonProps {
  onClick: () => void;
  children: React.ReactNode; // Says the component can recieve anything inside the tag
  variant?: 'primary' | 'secondary'; // Optional variant prop
  disabled?: boolean; // Optional disabled prop
}

export const AppButton = ({ onClick, children, variant = 'primary', disabled = false }: AppButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <DigiButton
      className={`app-button ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      afSize={ButtonSize.MEDIUM}
      afVariation={variant === 'secondary' ? ButtonVariation.SECONDARY : ButtonVariation.PRIMARY}
      afFullWidth={false}
    >
      {children}
    </DigiButton>
  );
};
