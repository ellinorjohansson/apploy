// UserPage.tsx

import { DigiTypography } from '@digi/arbetsformedlingen-react';
import { TypographyVariation } from '@digi/arbetsformedlingen';
import { useJobs } from '../hooks/useJobs';
import { JobActionTypes } from '../reducers/SaveJobReducer';
import { AppButton } from '../components/buttons/AppButton';

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
  const { jobs, dispatch } = useJobs();

  const savedJobs = jobs.filter((job) => !job.applied);

  const appliedJobs = jobs.filter((job) => job.applied);

  const handleRemoveJob = (id: string) => {
    dispatch({ type: JobActionTypes.REMOVED, payload: id });
  };

  const handleToggleApplied = (id: string) => {
    dispatch({ type: JobActionTypes.TOGGLED, payload: id });
  };

  return (
    <>
      <section>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h2>Sparade jobb</h2>
        </DigiTypography>
        {savedJobs.length === 0 ? (
          <DigiTypography afVariation={TypographyVariation.SMALL}>
            <p>Inga sparade jobb än.</p>
          </DigiTypography>
        ) : (
          savedJobs.map((job) => (
            <div key={job.id}>
              <DigiTypography afVariation={TypographyVariation.SMALL}>
                <h3>{job.headline}</h3>
                <p>{job.workplace_address?.region}</p>
              </DigiTypography>

              <AppButton onClick={() => handleRemoveJob(job.id)}>
                Ta bort
              </AppButton>
              <AppButton onClick={() => handleToggleApplied(job.id)}>
                Markera som sökt
              </AppButton>
            </div>
          ))
        )}
      </section>
      <section>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h2>Sökta jobb</h2>
        </DigiTypography>
        {appliedJobs.length === 0 ? (
          <DigiTypography afVariation={TypographyVariation.SMALL}>
            <p>Inga sökta jobb än.</p>
          </DigiTypography>
        ) : (
          appliedJobs.map((job) => (
            <div key={job.id}>
              <DigiTypography afVariation={TypographyVariation.SMALL}>
                <h3>{job.headline}</h3>
                <p>{job.workplace_address?.region}</p>
              </DigiTypography>
              <AppButton onClick={() => handleRemoveJob(job.id)}>
                Ta bort
              </AppButton>
            </div>
          ))
        )}
      </section>
    </>
  );
};
