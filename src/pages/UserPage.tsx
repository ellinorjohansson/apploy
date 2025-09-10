// UserPage.tsx

import { DigiTypography } from '@digi/arbetsformedlingen-react';
import { TypographyVariation } from '@digi/arbetsformedlingen';



// TA BORT

// När man klickar på spara knappen i detailpage så ska det id läggas till i denna filen
// Klickar man i checkboxen ska jobbet flyttas ned till "sökta jobb" och utgråas
// Detta ska sparas i localhost
// Lägg till datum som man klickar i checkboxen för att spara när det var man sökte arbetet
// Fallback om någon av listorna är tomma
// Ta bort sparade arbeten

// Sparade jobb
// Sökta jobb




export const UserPage = () => {
  return (
    <>
      <section>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h2>Sparade jobb</h2>
        </DigiTypography>
      </section>
      <section>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h2>Sökta jobb</h2>
        </DigiTypography>
      </section>
    </>
  );
};
