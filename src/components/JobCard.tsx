// JobCard.tsx
// Component for displaying individual job advertisements
// Shows job headline, location, employer, work mode, and provides navigation to job details

import type { JobAd } from "../types/jobs";
import { DigiLayoutBlock, DigiTypography, DigiIconBuildingOutline, DigiIconBookmarkOutline, DigiIconBookmarkSolid } from "@digi/arbetsformedlingen-react";
import { LayoutBlockVariation, TypographyVariation } from "@digi/arbetsformedlingen";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useJobs } from "../hooks/useJobs";
import { JobActionTypes } from "../reducers/SaveJobReducer";

interface JobCardProps {
    job: JobAd;
}

export const JobCard = ({ job }: JobCardProps) => {
    // Extract job information with fallback values
    const region = job.workplace_address?.region || "Okänd plats";
    const employer = job.employer?.name || job.employer?.workplace || "Okänd arbetsgivare";
    const working_hours_type = job.working_hours_type?.label || "Omfattning ej angiven";

    // Navigation hook for routing to job details
    const navigate = useNavigate();
    
    // Get jobs and dispatch from SaveJob context
    const { jobs, dispatch } = useJobs();
    
    // Check if current job is saved (bookmarked)
    const isBookmarked = jobs.some(savedJob => savedJob.id === job.id);

    /**
     * Determines work mode (remote/hybrid/on-site) based on job description
     * @param job - Job advertisement object
     * @returns Work mode string or null if not specified
     */
    const getWorkMode = (job: JobAd): string | null => {
        const description = job.description?.text?.toLowerCase() || '';

        // Check for full remote work keywords
        if (description.includes('100% distans') || description.includes('100 % distans') ||
            description.includes('helt distans') || description.includes('arbete på distans')) {
            return 'Distans';
        }

        // Check for hybrid work keywords
        if (description.includes('hybrid') || description.includes('delvis distans') ||
            description.includes('blandat') || description.includes('flexibel arbetsplats')) {
            return 'Hybrid';
        }

        // Check for general remote work keywords
        if (description.includes('remote') || description.includes('hemarbete') ||
            description.includes('hemifrån') || description.includes('distansarbete')) {
            return 'Distans';
        }

        return null;
    };

    const workMode = getWorkMode(job);

    /**
     * Handles click on job card to navigate to job details page
     * @param jobId - Unique identifier for the job
     */
    const handleClick = (jobId: string) => {
        navigate(`/jobs/${jobId}`);
        window.scroll(0, 0) 
    };

    /**
     * Handles bookmark toggle click
     * Prevents event propagation to avoid triggering job card navigation
     * Adds or removes job from saved jobs using SaveJob context
     * @param event - Click event
     */
    const handleBookmarkClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        
        if (isBookmarked) {
            // Remove job from saved jobs
            dispatch({ type: JobActionTypes.REMOVED, payload: job.id });
        } else {
            // Add job to saved jobs
            dispatch({ type: JobActionTypes.ADDED, payload: job });
        }
    };
    return (
        <div
            className="job-card-wrapper"
            onClick={() => handleClick(job.id)}
        >
            <DigiLayoutBlock
                className="job-card"
                afVariation={LayoutBlockVariation.TRANSPARENT}
            >
                {/* Bookmark icon - positioned absolutely in top right corner */}
                <div 
                    className="bookmark-icon"
                    onClick={handleBookmarkClick}
                >
                    {isBookmarked ? (
                        <DigiIconBookmarkSolid className="bookmark-icon-svg" />
                    ) : (
                        <DigiIconBookmarkOutline className="bookmark-icon-svg" />
                    )}
                </div>

                <DigiTypography afVariation={TypographyVariation.SMALL}>
                    <div className="job-card-header">
                        <div className="job-location">{region}</div>
                        <div className="job-employer">{employer}</div>
                    </div>

                    <div className="job-card-body">
                        <h3>{job.headline}</h3>
                    </div>

                    <div className="job-card-footer">
                        <span className="job-tag">{working_hours_type}</span>
                        <span className="job-tag work-mode">
                            <DigiIconBuildingOutline className="inline-icon" />
                            {workMode || "På plats"}
                        </span>
                    </div>
                </DigiTypography>
            </DigiLayoutBlock>
        </div>
    );
};