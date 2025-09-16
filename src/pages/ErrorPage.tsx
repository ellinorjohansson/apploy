// ErrorPage.tsx

import { DigiMediaImage, DigiTypography } from "@digi/arbetsformedlingen-react";
import { TypographyVariation } from "@digi/arbetsformedlingen";
import { AppButton } from "../components/buttons/AppButton";
import { useNavigate } from "react-router-dom";
import "../styles/pages/ErrorPage.css"

export const ErrorPage = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }
    return (
    <>
     <DigiTypography afVariation={TypographyVariation.SMALL}>
        <div className="error-wrapper">
            <DigiMediaImage
            afUnlazy
            afSrc='/images/Error-image.png'
            afAlt="Error image for Apploy"
            >
            </DigiMediaImage>
            <h2>Tyvärr kunde inte denna sida hittas...</h2>
            <p>Men låt inte det stoppa dig!</p>
            <AppButton onClick={handleClick} children="Hitta tillbaka"></AppButton>
        </div>
     </DigiTypography>
    </>
    )
}