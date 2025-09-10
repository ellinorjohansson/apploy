// ErrorPage.tsx

import { DigiTypography } from "@digi/arbetsformedlingen-react";
import { TypographyVariation } from "@digi/arbetsformedlingen";

export const ErrorPage = () => {
    return (
    <>
     <DigiTypography afVariation={TypographyVariation.SMALL}>
        <h2>Something went wrong...</h2>
     </DigiTypography>
    </>
    )
}