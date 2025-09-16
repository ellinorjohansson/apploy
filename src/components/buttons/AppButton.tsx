// AppButton.tsx
// Wrapper component for DigiButton from Arbetsförmedlingen design system
// Provides consistent styling and behavior across the application

import { DigiButton } from "@digi/arbetsformedlingen-react";
import { ButtonSize, ButtonVariation } from "@digi/arbetsformedlingen";

interface AppButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

/**
 * Custom button component that wraps DigiButton
 * @param onClick - Function to call when button is clicked
 * @param children - Content to display inside the button
 * @param variant - Button style variant (primary or secondary)
 * @param disabled - Whether the button is disabled
 */
export const AppButton = ({ onClick, children, variant = 'primary', disabled = false }: AppButtonProps) => {
  /**
   * Handles button click, only executes if button is not disabled
   */
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
