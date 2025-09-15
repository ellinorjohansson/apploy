// JobCard.tsx

import type { JobAd } from "../types/jobs";
import { DigiInfoCardMulti } from "@digi/arbetsformedlingen-react";
import { InfoCardMultiHeadingLevel, InfoCardMultiType } from "@digi/arbetsformedlingen";
import { DigiLinkInternal } from "@digi/arbetsformedlingen-react";



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
        <DigiInfoCardMulti
            className="job-card"
            afHeading={job.headline}
            afHeadingLevel={InfoCardMultiHeadingLevel.H3}
            afType={InfoCardMultiType.RELATED}
            afLinkHref="#"

        >
            <div className="job-card-content">
                <div className="job-location">{region}</div>
                <div className="job-employer">{employer}</div>

                <div className="job-tags">
                    <span className="job-tag">{working_hours_type}</span>
                    {workMode && <span className="job-tag hybrid">{workMode}</span>} {/*SYNS ALDRIG*/}
                </div>
                <br /> {/*Ta bort sedan*/}
                <DigiLinkInternal
	afHref="#"
>
	Läs mer
</DigiLinkInternal>
            </div>
        </DigiInfoCardMulti>

    );
};