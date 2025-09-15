// filterConstants.ts
// This file contains all the constant values used for filtering and pagination

/**
 * All Swedish counties (län) used for location filtering
 * These are the official administrative divisions of Sweden
 */
export const SWEDISH_COUNTIES = [
    "Stockholms län", "Västra Götalands län", "Skåne län", "Uppsala län", 
    "Östergötlands län", "Västerbottens län", "Norrbottens län", "Värmlands län",
    "Örebro län", "Västmanlands län", "Dalarnas län", "Gävleborgs län",
    "Västernorrlands län", "Jämtlands län", "Kronobergs län", "Kalmar län",
    "Gotlands län", "Blekinge län", "Hallands län", "Södermanlands län"
];

/**
 * Predefined job branch categories used for filtering
 * These categories group jobs by their field/industry
 */
export const JOB_BRANCHES = [
    "Administration, ekonomi, juridik",
    "Bygg, anläggning, installation", 
    "Data, IT, telekommunikation",
    "Försäljning, inköp, marknadsföring",
    "Hälsa, medicin, vård, omsorg",
    "Teknik, tillverkning, transport",
    "Utbildning, forskning, kultur",
    "Säkerhet, rättsväsende, försvar",
    "Transport, logistik, mekanik",
    "Service, turism, restaurang",
    "Jordbruk, skogsbruk, miljö",
    "Konst, design, media"
] as const;

/**
 * Number of jobs to load per page
 * This controls how many job advertisements are fetched and displayed at once
 */
export const JOBS_PER_PAGE = 9;
