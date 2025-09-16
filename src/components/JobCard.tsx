// JobCard.tsx

import type { JobAd } from "../types/jobs";
import { DigiLayoutBlock, DigiTypography, DigiLinkInternal } from "@digi/arbetsformedlingen-react";
import { LayoutBlockVariation } from "@digi/arbetsformedlingen";



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
        <div className="block-wrapper"> 
        <DigiLayoutBlock 
            className="job-card"
            afVariation={LayoutBlockVariation.PRIMARY}
        >
            <DigiTypography>
                <h2>{job.headline}</h2>
                <div className="job-card-content">
                    <div className="job-location">{region}</div>
                    <div className="job-employer">{employer}</div>

                    <div className="job-tags">
                        <span className="job-tag">{working_hours_type}</span>
                        {workMode && <span className="job-tag hybrid">{workMode}</span>}
                    </div>
                    <br />
                    <DigiLinkInternal afHref="#">
                        Läs mer
                    </DigiLinkInternal>
                </div>
            </DigiTypography>
        </DigiLayoutBlock>
        </div>
    );
};