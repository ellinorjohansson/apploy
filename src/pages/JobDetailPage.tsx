// JobDetailPage.tsx
import { DigiIconEnvelope, DigiLayoutBlock, DigiList } from "@digi/arbetsformedlingen-react";
import { DigiIconChevronDown, DigiIconChevronUp } from "@digi/arbetsformedlingen-react/src/lib/stencil-generated/components";
import { LayoutBlockVariation, ListType } from "@digi/arbetsformedlingen";
import { useParams } from "react-router-dom";
import "../styles/pages/JobsDetailPage.css"
import { useEffect, useState } from "react";
import type { JobAd } from "../types/jobs";
import { AppButton } from "../components/buttons/AppButton";
import { useJobs } from "../hooks/useJobs";
import { JobActionTypes } from "../reducers/SaveJobReducer";


export const JobsDetailPage = () => {

  const { jobId } = useParams(); // Hämtar jobId från URL
  
  const [job, setJob] = useState<JobAd | null> (null) // State för enskilt jobb

  const [loading, setLoading] = useState(false) // Loading state

  const [expanded, setExpanded] = useState(false) // Expander boolean för text 

  const { dispatch } = useJobs();

  const handleSaveJob = (job: JobAd) => {
  dispatch({ type: JobActionTypes.ADDED, payload: job });
};

  const shouldShow = (value: string | undefined | null): boolean => {
    return !!value && 
          value.toString().trim() !== "";
  };

  // Hjälpfunktion för att kontrollera om adress är komplett
  const hasCompleteAddress = (address: JobAd['workplace_address']): boolean => {
    return !!address && 
          shouldShow(address.street) && 
          shouldShow(address.postcode) && 
          shouldShow(address.municipality);
  };
 // Hjälpfunktion för att kontrollera om region är komplett
  const hasCompleteRegionInfo = (address: JobAd['workplace_address']): boolean => {
    return !!address && 
          shouldShow(address.region) && 
          shouldShow(address.country);
  };


  const getDaysUntilDeadline = (deadline: string | undefined): string | null => {
  if (!deadline) return null;
  
  const today = new Date();
  const deadlineDate = new Date(deadline);
  
  // Sätt tid till midnatt för båda datumen för korrekt jämförelse
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);
  
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysDiff < 0) {
    return `(${Math.abs(daysDiff)} dagar sedan)`;
  } else if (daysDiff === 0) {
    return "(Sista dagen idag!)";
  } else if (daysDiff === 1) {
    return "(1 dag kvar)";
  } else {
    return `(${daysDiff} dagar kvar)`;
  }
};

  const handleClick = () => {
    const url = job?.application_details?.url?.trim();
  if (url) {
    const prefixedUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(prefixedUrl, "_blank", "noopener,noreferrer");
  } else {
    alert("Ingen ansökningslänk tillgänglig.");
  }
  }

  useEffect(() => { // Refaktorera till en custom hook eller till en service till en context?
    const getJob = async () => {

      setLoading(true)
      try {
        const response = await fetch (`https://jobsearch.api.jobtechdev.se/ad/${jobId}`)
        if (!response.ok)
          throw new Error("Something failed in the fetch") // ändra detta senare
        const data: JobAd = await response.json()
        console.log("API Response:", data)
        setJob(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getJob()
  }, [jobId])



  
  return (
    <section className="body-wrapper">
    {loading && <div> Hämtar annonsen... </div>}

    {!loading && job && (
      <section className="main-wrapper">
        <div className="headline-wrapper">
          <img className="headline-logo" src={job.logo_url} alt={`Logotyp for ${job.employer?.name || "the employer" }`}/>
          <h2>{job.headline}</h2>
        </div>
        <div className="digiblock-wrapper">
          <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
            <article className="section-wrapper">

              <section className="profession">
                <h3>{job.occupation?.label || "Ej angivet."}</h3>
              </section>

              <section className="description">

                <h3>Företag</h3>
                <img src={job.logo_url}/> {/* Logotyp */}
                <p>{job.employer?.name || "Ej angivet."}</p>

                  <h3>Om jobbet</h3>

                  {job.description?.text ? (
                  <div>
                      {(expanded
                        ? job.description.text.split("\n")             // alla stycken
                        : job.description.text.split("\n").slice(0, 4) // första 2 stycken
                      ).map(
                        (paragraph, index) =>
                          paragraph.trim() && <p key={index}>{paragraph}</p>
                      )}

                      <button className="expand-read" onClick={() => setExpanded(!expanded)}>
                        {expanded ? (
                          <span>
                            Visa mindre <DigiIconChevronUp />
                          </span>
                        ) : (
                          <span>
                            Läs mer  <DigiIconChevronDown />
                          </span>
                        )}
                      </button>
                  </div>
                  ) : (
                    <p>Ingen beskrivning tillgänglig.</p>
                  )}

              </section>
            </article>

          </DigiLayoutBlock>

          <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
             <article className="section-wrapper">
              <div className="application-info">
                <h3>Arbetsgivaren</h3>
                
                  {shouldShow(job.employer?.name) && (
                    <p>{job.employer?.name}</p>
                  )}
                  
                  {shouldShow(job.employer?.url) && (
                    <a href={job.employer?.url} target="_blank" rel="noreferrer">
                      {job.employer?.url}
                    </a>
                  )}
                  
                  {shouldShow(job.employer?.workplace) && 
                  job.employer?.workplace !== job.employer?.name && (
                  <p>{job.employer?.workplace}</p>
                  )}
                  
                  {hasCompleteAddress(job.workplace_address) && (
                    <p>
                      {job.workplace_address?.street}, {job.workplace_address?.postcode}{" "}
                      {job.workplace_address?.municipality}
                    </p>
                  )}
                  
                  {hasCompleteRegionInfo(job.workplace_address) && (
                    <p>
                      {job.workplace_address?.region}, {job.workplace_address?.country}
                    </p>
                  )}
                  
                  {shouldShow(job.application_details?.email) && (
                    <div className="email-wrapper">
                      <DigiIconEnvelope
                      onClick={() => window.location.href = `mailto:${job.application_details?.email}`}
                      style={{ cursor: "pointer" }}
                      />
                      <a href={`mailto:${job.application_details?.email}`}>
                        {job.application_details?.email}
                      </a>
                    </div>
                  )}
                  
                  {shouldShow(job.application_details?.other) && (
                    <p>Övrigt: {job.application_details?.other}</p>
                  )}
                </div>
            </article>
          </DigiLayoutBlock>
        </div>

        <DigiList afListType={ListType.BULLET}>
          <li>
            <h4>Behov:</h4>
            <p>{job.description?.needs || "Ej angivet."}</p>
          </li>
          <li>
            <h4>Varaktighet:</h4>
            <p>{job.duration?.label || "Ej angivet."}</p>
          </li>
          <li>
            <h4>Arbetstid:</h4>
            <p>{job.working_hours_type?.label || "Ej angivet."}</p>
          </li>
          <li>
            <h4>Omfattning:</h4>
            <p>{job.scope_of_work?.min}–{job.scope_of_work?.max}%</p>
          </li>
          <li>
            <h4>Lön:</h4>
            <p>{job.salary_description}</p>
            <h5>Lönetyp:</h5>
            <p>{job.salary_type.label}</p>
          </li>
          <li>
            <h4>Sista ansökningsdatum</h4>
            <p className="deadline-info">
              {job.application_deadline 
              ? new Date(job.application_deadline).toLocaleString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              : "Ej angivet." }
              {job.application_deadline && (
                <span className="deadline-countdown">
                  {getDaysUntilDeadline(job.application_deadline)}
                </span>
              )}
              </p>
            <li className="button-wrapper">
              <AppButton
              onClick={() => (handleClick)} children={"Ansök"}>
              </AppButton>
            
              <AppButton 
              onClick={() => handleSaveJob(job)} children={"Spara"}>
              </AppButton>
            </li>
          </li>
        </DigiList>
      </section>
    )}
  </section>
  );
};
