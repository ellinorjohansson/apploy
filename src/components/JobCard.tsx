// JobCard.tsx

import type { JobAd } from "../types/jobs";
import { DigiInfoCard } from "@digi/arbetsformedlingen-react";
import { InfoCardHeadingLevel, InfoCardType, InfoCardVariation, InfoCardBorderPosition } from "@digi/arbetsformedlingen";



interface JobCardProps {
    job: JobAd;
}

export const JobCard = ({ job }: JobCardProps) => {

    const region = job.workplace_address?.region || "Okänd plats";
    const employer = job.employer?.name || job.employer?.workplace || "Okänd arbetsgivare";
    const working_hours_type = job.working_hours_type?.label || "Omfattning ej angiven";

    // Check in the free text if the job is a remote/hybrid job
    // FUNKAR INTE
    const workMode = job.freetext_concepts?.find(
        (c) =>
            c.label?.toLowerCase().includes("distans") ||
            c.label?.toLowerCase().includes("hybrid") 
    )?.label;

    return (
        <DigiInfoCard 
            className="job-card"
            afHeading={job.headline}
            afHeadingLevel={InfoCardHeadingLevel.H3}
            afType={InfoCardType.RELATED}
            afLinkHref="#"
            afLinkText="Läs mer"
            afVariation={InfoCardVariation.PRIMARY}
            afBorderPosition={InfoCardBorderPosition.TOP}
        >
            <div className="job-card-content">
                <span className="job-location">{region}</span>
                <span className="job-employer">{employer}</span>
                <div className="job-tags">
                    <span className="job-tag">{working_hours_type}</span>
                    {workMode && <span className="job-tag hybrid">{workMode}</span>}
                </div>
            </div>
        </DigiInfoCard>
        
    );
};