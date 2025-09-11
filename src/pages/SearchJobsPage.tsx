// SearchJobsPage.tsx

import { useEffect, useState } from "react";
import { fetchJobs } from "../services/fetchJobServices";
import type { JobAd } from "../types/jobs";
import { AppButton } from "../components/buttons/AppButton";
import { JobCard } from "../components/JobCard";
import { DigiInfoCardMultiContainer, DigiFormInputSearch, DigiFormFilter } from "@digi/arbetsformedlingen-react";
import { FormInputSearchVariation, FormInputType } from "@digi/arbetsformedlingen";

export const SearchJobsPage = () => {

    // Store jobs from the API
    const [jobs, setJobs] = useState<JobAd[]>([])

    // Track how many jobs we have loaded
    const [offset, setOffset] = useState(0);

    // Track if we are currently loading jobs
    const [loading, setLoading] = useState(false);

    // Number of jobs to load per page
    const limit = 9;

    // Filter states - now arrays to support multiple selections
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Swedish counties
    const swedishCounties = [
        "Stockholms län", "Västra Götalands län", "Skåne län", "Uppsala län", 
        "Östergötlands län", "Västerbottens län", "Norrbottens län", "Värmlands län",
        "Örebro län", "Västmanlands län", "Dalarnas län", "Gävleborgs län",
        "Västernorrlands län", "Jämtlands län", "Kronobergs län", "Kalmar län",
        "Gotlands län", "Blekinge län", "Hallands län", "Södermanlands län"
    ];

    // All possible branches from JobTech API
    const allBranches = [
        "Administration, ekonomi, juridik",
        "Bygg, anläggning, installation",
        "Data, IT, telekommunikation",
        "Försäljning, inköp, marknadsföring",
        "Hantverk, tillverkning, transport",
        "Hälsa, medicin, vård, omsorg",
        "Hotell, restaurang, storhushåll",
        "Kultur, media, design",
        "Lantbruk, skogsbruk, trädgård",
        "Naturvetenskap, teknik",
        "Pedagogik, utbildning, forskning",
        "Rättsväsende, säkerhet, försvar",
        "Socialt arbete, omsorg, boende",
        "Teknik, tillverkning, transport",
        "Turism, sport, fritid"
    ];
   
    
   // Load jobs when the page loads or offset changes
   useEffect(() => {
    const loadJobs = async () => {
        setLoading(true); // Start loading
        const newJobs = await fetchJobs(limit, offset); // Fetch jobs from API
        setJobs((prev) => [...prev, ...newJobs]); // Add new jobs to the list
        setLoading(false); // Stop loading
    };

    // This effect calls loadJobs() to fetch new jobs from the API whenever the `offset` changes, allowing the list to update and load more jobs when the user clicks "Load more".
    loadJobs();
    }, [offset]);


    // Run when user clicks "Visa fler"-button
    const handleLoadMore = () => {
        setOffset((prev) => prev + limit);
    };

    // Filter jobs based on selected filters
    const filteredJobs = jobs.filter(job => {
        const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(job.workplace_address?.region || '');
        const matchesBranch = selectedBranches.length === 0 || selectedBranches.includes(job.occupation?.label || '');
        // Enhanced search - search in multiple fields
        const matchesSearch = !searchTerm || (() => {
            const searchLower = String(searchTerm).toLowerCase();
            return (
                job.headline?.toLowerCase().includes(searchLower) ||
                job.employer?.name?.toLowerCase().includes(searchLower) ||
                job.employer?.workplace?.toLowerCase().includes(searchLower) ||
                job.occupation?.label?.toLowerCase().includes(searchLower) ||
                job.workplace_address?.region?.toLowerCase().includes(searchLower) ||
                job.workplace_address?.municipality?.toLowerCase().includes(searchLower) ||
                job.description?.text?.toLowerCase().includes(searchLower) ||
                job.freetext_concepts?.some(concept => 
                    concept.label?.toLowerCase().includes(searchLower)
                )
            );
        })();
        
        return matchesLocation && matchesBranch && matchesSearch;
    });

    // Generate filter description
    const getFilterDescription = () => {
        console.log('Current filter state:', { selectedLocations, selectedBranches, searchTerm });
        const filters = [];
        if (selectedLocations.length > 0) filters.push(`Ort: ${selectedLocations.join(", ")}`);
        if (selectedBranches.length > 0) filters.push(`Bransch: ${selectedBranches.join(", ")}`);
        if (searchTerm) filters.push(`Sökord: "${searchTerm}"`);
        
        if (filters.length === 0) return "Inga filter applicerade";
        return `Aktiva filter: ${filters.join(", ")}`;
    };
    
    return (
        <div className="search-page">
            <div className="search-header">
                <h1 className="search-title">Utforska aktuella jobbannonser från hela Sverige</h1>
                <p className="search-subtitle">Hitta ditt nästa jobb bland tusentals möjligheter</p>
            </div>
            
            <div className="search-section">
                <div className="search-bar-container">
                    <DigiFormInputSearch
                        afLabel="Sök jobb"
                        afVariation={FormInputSearchVariation.LARGE}
                        afType={FormInputType.SEARCH}
                        afButtonText="Sök"
                        onAfOnChange={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                            console.log('Search changed:', e.detail);
                            // Handle different event types
                            let searchValue = '';
                            if (e.detail && typeof e.detail === 'object' && 'value' in e.detail) {
                                searchValue = e.detail.value;
                            } else if (typeof e.detail === 'string') {
                                searchValue = e.detail;
                            } else if (e.detail && e.detail.target && e.detail.target.value !== undefined) {
                                searchValue = e.detail.target.value;
                            }
                            setSearchTerm(String(searchValue));
                        }}
                        onAfOnSubmitSearch={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                            console.log('Search submitted:', e.detail);
                            // Handle different event types
                            let searchValue = '';
                            if (e.detail && typeof e.detail === 'object' && 'value' in e.detail) {
                                searchValue = e.detail.value;
                            } else if (typeof e.detail === 'string') {
                                searchValue = e.detail;
                            } else if (e.detail && e.detail.target && e.detail.target.value !== undefined) {
                                searchValue = e.detail.target.value;
                            }
                            setSearchTerm(String(searchValue));
                        }}
                    />
                    <div className="filter-dropdowns">
                        <DigiFormFilter
                            afFilterButtonText="Ort"
                            afSubmitButtonText="Filtrera"
                            afName="Välj ort"
                            afListItems={swedishCounties.map(county => ({
                                id: county,
                                label: county
                            }))}
                            onAfSubmitFilter={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                console.log('Location filter submitted:', e.detail);
                                // Handle FormFilterState: {listItems, checked}
                                if (e.detail && e.detail.checked) {
                                    setSelectedLocations(e.detail.checked);
                                } else {
                                    setSelectedLocations([]);
                                }
                            }}
                            onAfResetFilter={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                console.log('Location filter reset:', e.detail);
                                setSelectedLocations([]);
                            }}
                        />
                        <DigiFormFilter
                            afFilterButtonText="Bransch"
                            afSubmitButtonText="Filtrera"
                            afName="Välj bransch"
                            afListItems={allBranches.map(branch => ({
                                id: branch,
                                label: branch
                            }))}
                            onAfSubmitFilter={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                console.log('Branch filter submitted:', e.detail);
                                // Handle FormFilterState: {listItems, checked}
                                if (e.detail && e.detail.checked) {
                                    setSelectedBranches(e.detail.checked);
                                } else {
                                    setSelectedBranches([]);
                                }
                            }}
                            onAfResetFilter={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                console.log('Branch filter reset:', e.detail);
                                setSelectedBranches([]);
                            }}
                        />
                    </div>
                </div>
                
                <div className="search-results-info">
                    Din sökning gav {filteredJobs.length} träffar/möjligheter
                </div>
                
                <div className="filter-section">
                    <p className="filter-description">{getFilterDescription()}</p>
                </div>
            </div>
            
            {loading && <div className="loading-indicator">Loading jobs...</div>}
            
            <DigiInfoCardMultiContainer key={filteredJobs.length}>
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </DigiInfoCardMultiContainer>
            
            <div className="load-more-container">
                <AppButton onClick={handleLoadMore}>Se fler</AppButton>
            </div>
        </div>
    )
}