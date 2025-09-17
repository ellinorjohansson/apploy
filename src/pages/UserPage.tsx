// UserPage.tsx

import { useJobs } from '../hooks/useJobs';
import { JobActionTypes } from '../reducers/SaveJobReducer';
import { AppButton } from '../components/buttons/AppButton';
import '../styles/pages/saveJob.css';
import {
  DigiFormCheckbox,
  DigiLayoutBlock,
  DigiLayoutColumns,
  DigiTypography,
} from '@digi/arbetsformedlingen-react';
import {
  FormCheckboxVariation,
  LayoutBlockVariation,
  LayoutColumnsElement,
  TypographyVariation,
} from '@digi/arbetsformedlingen';
import { useNavigate } from 'react-router-dom';

export const UserPage = () => {
  const navigate = useNavigate();

  const handleGoToDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  // Retrieve jobs and dispatch function from custom hook
  const { jobs, dispatch } = useJobs();

  // Separate jobs into saved and applied lists
  const savedJobs = jobs.filter((job) => !job.applied);
  const appliedJobs = jobs.filter((job) => job.applied);

  const handleRemoveJob = (id: string) => {
    dispatch({ type: JobActionTypes.REMOVED, payload: id });
  };

  const handleToggleApplied = (id: string) => {
    dispatch({ type: JobActionTypes.TOGGLED, payload: id });
  };

  // Function to render a single job row with checkbox, text, and button
  const renderJob = (job: (typeof jobs)[0], listType: 'saved' | 'applied') => (
    <DigiLayoutColumns
      afElement={LayoutColumnsElement.DIV}
      key={`${listType}-${job.id}`}
      className={`job-row ${listType}`}
    >
      <div>
        <label>
          <DigiFormCheckbox
            afLabel={
              listType === 'saved' ? 'Markera som sökt' : 'Avmarkera som sökt'
            }
            afVariation={FormCheckboxVariation.SECONDARY}
            checked={job.applied}
            onChange={() => handleToggleApplied(job.id)}
          />
        </label>
      </div>

      <div>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h3>{job.headline}</h3>
          <p>{job.employer?.name}</p>
        </DigiTypography>
      </div>

      <div>
        <AppButton onClick={() => handleRemoveJob(job.id)}>Ta bort</AppButton>
        <AppButton onClick={() => handleGoToDetails(job.id)}>
          Visa detaljer
        </AppButton>
      </div>
    </DigiLayoutColumns>
  );

  return (
    // Wrapper for all saved and applied jobs
    <div className="save-job-body">
      <DigiLayoutBlock
        afVariation={LayoutBlockVariation.TRANSPARENT}
        className="save-job-wrapper"
      >
        <section>
          <DigiTypography afVariation={TypographyVariation.SMALL}>
            <h2 className="saved-title">Sparade jobb</h2>
          </DigiTypography>

          {savedJobs.length === 0 ? (
            <DigiTypography afVariation={TypographyVariation.SMALL}>
              <p>Inga sparade jobb än.</p>
            </DigiTypography>
          ) : (
            savedJobs.map((job) => renderJob(job, 'saved'))
          )}
        </section>

        <section className="applied-section">
          <DigiTypography afVariation={TypographyVariation.SMALL}>
            <h2 className="applied-title">Sökta jobb</h2>
          </DigiTypography>

          {appliedJobs.length === 0 ? (
            <DigiTypography afVariation={TypographyVariation.SMALL}>
              <p>Inga sökta jobb än.</p>
            </DigiTypography>
          ) : (
            appliedJobs.map((job) => renderJob(job, 'applied'))
          )}
        </section>
      </DigiLayoutBlock>
    </div>
  );
};
