// CustomLinkButton.tsx
// Wrapper component for DigiLinkButton with custom styling
// Provides consistent yellow/green color scheme across the application

import { DigiLinkButton } from "@digi/arbetsformedlingen-react";
import { LinkButtonSize, LinkButtonVariation } from "@digi/arbetsformedlingen";
import "../../styles/components/CustomLinkButton.css";

interface CustomLinkButtonProps {
  afHref: string;
  children: React.ReactNode;
  afSize?: LinkButtonSize;
  afVariation?: LinkButtonVariation;
  afHideIcon?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Custom link button component with yellow/green color scheme
 * @param afHref - URL for the link
 * @param children - Content to display inside the button
 * @param afSize - Button size (default: MEDIUM)
 * @param afVariation - Button variation (default: PRIMARY)
 * @param afHideIcon - Whether to hide the icon (default: true)
 * @param onClick - Function to call when button is clicked
 * @param className - Additional CSS classes
 */
export const CustomLinkButton = ({ 
  afHref, 
  children, 
  afSize = LinkButtonSize.MEDIUM,
  afVariation = LinkButtonVariation.PRIMARY,
  afHideIcon = true,
  onClick,
  className = ""
}: CustomLinkButtonProps) => {
  return (
    <DigiLinkButton
      afHref={afHref}
      afSize={afSize}
      afVariation={afVariation}
      af-hide-icon={afHideIcon}
      onClick={onClick}
      className={`custom-link-button ${className}`}
    >
      {children}
    </DigiLinkButton>
  );
};
