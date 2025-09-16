// JobCard.tsx

import type { JobAd } from "../types/jobs";
import { DigiLayoutBlock, DigiTypography, DigiLinkInternal } from "@digi/arbetsformedlingen-react";
import { LayoutBlockVariation } from "@digi/arbetsformedlingen";
import { useNavigate } from "react-router-dom";



interface JobCardProps {
    job: JobAd;
}

export const JobCard = ({ job }: JobCardProps) => {

    const region = job.workplace_address?.region || "Okänd plats";
    const employer = job.employer?.name || job.employer?.workplace || "Okänd arbetsgivare";
    const working_hours_type = job.working_hours_type?.label || "Omfattning ej angiven";

    
    // Variable for navigaton
    const navigate = useNavigate()

    // Check in the free text if the job is a remote/hybrid job
    // FUNKAR INTE
    const workMode = job.freetext_concepts?.find(
        (c) =>
            c.label?.toLowerCase().includes("distans") ||
            c.label?.toLowerCase().includes("hybrid")
    )?.label;

    const handleClick = (jobId: string) => {
        navigate(`/jobs/${jobId}`)
    }
    return (
        <div className="block-wrapper"> 
        <DigiLayoutBlock 
            className="job-card"
            afHeading={job.headline}
            afHeadingLevel={InfoCardMultiHeadingLevel.H3}
            afType={InfoCardMultiType.RELATED}
            onClick={() => handleClick(job.id)} // Addera pointer, hover-effect senare
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