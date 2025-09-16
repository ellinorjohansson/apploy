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
 * Mapping from Swedish county names to region codes used by JobTech API
 * These codes are used for server-side filtering
 */
export const COUNTY_TO_REGION_CODE: Record<string, string> = {
    "Stockholms län": "01",
    "Västra Götalands län": "14", 
    "Skåne län": "12",
    "Uppsala län": "03",
    "Östergötlands län": "05",
    "Västerbottens län": "24",
    "Norrbottens län": "25",
    "Värmlands län": "17",
    "Örebro län": "18",
    "Västmanlands län": "19",
    "Dalarnas län": "20",
    "Gävleborgs län": "21",
    "Västernorrlands län": "22",
    "Jämtlands län": "23",
    "Kronobergs län": "07",
    "Kalmar län": "08",
    "Gotlands län": "09",
    "Blekinge län": "10",
    "Hallands län": "13",
    "Södermanlands län": "04"
};

/**
 * Converts county names to region codes for API filtering
 * @param counties - Array of county names
 * @returns Array of region codes
 */
export function getRegionCodesForCounties(counties: string[]): string[] {
    return counties
        .map(county => COUNTY_TO_REGION_CODE[county])
        .filter(code => code !== undefined);
}

/**
 * Predefined job branch categories used for filtering
 * These categories group jobs by their field/industry
 */
export const JOB_BRANCHES = [
    "Administration, ekonomi, juridik",
    "Bygg och anläggning", 
    "Data, IT, telekommunikation",
    "Försäljning, inköp, marknadsföring",
    "Hälso- och sjukvård",
    "Teknik, tillverkning, transport",
    "Pedagogik",
    "Säkerhet, rättsväsende, försvar",
    "Transport, logistik, mekanik",
    "Service, turism, restaurang",
    "Jordbruk, skogsbruk, miljö",
    "Konst, design, media",
    "Chefer och verksamhetsledare",
    "Sanering och renhållning"
] as const;

/**
 * Number of jobs to load per page
 * This controls how many job advertisements are fetched and displayed at once
 */
export const JOBS_PER_PAGE = 27;
