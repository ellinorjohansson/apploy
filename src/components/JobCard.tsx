// JobCard.tsx

import type { JobAd } from "../types/jobs";
import { DigiInfoCardMulti } from "@digi/arbetsformedlingen-react";
import { InfoCardMultiHeadingLevel, InfoCardMultiType } from "@digi/arbetsformedlingen";
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
        <DigiInfoCardMulti 
            className="job-card"
            afHeading={job.headline}
            afHeadingLevel={InfoCardMultiHeadingLevel.H3}
            afType={InfoCardMultiType.RELATED}
            onClick={() => handleClick(job.id)} // Addera pointer, hover-effect senare
        >
            <div className="job-card-content">
                <span className="job-location">{region}</span>
                <span className="job-employer">{employer}</span>
                <div className="job-tags">
                    <span className="job-tag">{working_hours_type}</span>
                    {workMode && <span className="job-tag hybrid">{workMode}</span>} {/*SYNS ALDRIG*/}
                </div>
            </div>
        </DigiInfoCardMulti>
        
    );
};