// taxonomyService.ts
// Service for interacting with JobTech Taxonomy API

import axios from 'axios';

const TAXONOMY_API_BASE_URL = import.meta.env.VITE_TAXONOMY_API_BASE_URL || 'https://taxonomy.api.jobtechdev.se/v1/taxonomy';

/**
 * Fetches occupation fields from the Taxonomy API
 * @returns Promise with occupation fields data
 */
export async function fetchOccupationFields() {
    try {
        const response = await axios.get(`${TAXONOMY_API_BASE_URL}/occupation-field`);
        return response.data;
    } catch (error) {
        console.error('Error fetching occupation fields:', error);
        throw error;
    }
}

/**
 * Fetches specific occupation field by concept_id
 * @param conceptId - The concept ID to fetch
 * @returns Promise with occupation field data
 */
export async function fetchOccupationFieldById(conceptId: string) {
    try {
        const response = await axios.get(`${TAXONOMY_API_BASE_URL}/occupation-field/${conceptId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching occupation field ${conceptId}:`, error);
        throw error;
    }
}

/**
 * Searches for occupation fields by text
 * @param searchText - Text to search for
 * @returns Promise with matching occupation fields
 */
export async function searchOccupationFields(searchText: string) {
    try {
        const response = await axios.get(`${TAXONOMY_API_BASE_URL}/occupation-field`, {
            params: {
                q: searchText
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error searching occupation fields for "${searchText}":`, error);
        throw error;
    }
}

/**
 * Maps our branch categories to actual JobTech Taxonomy concept_ids
 * These are the real concept_ids from the JobTech API
 */
export const BRANCH_TO_TAXONOMY_MAP: Record<string, string[]> = {
    "Administration, ekonomi, juridik": [
        "X82t_awd_Qyc" // Administration, ekonomi, juridik (3841 jobs)
    ],
    "Bygg och anläggning": [
        "j7Cq_ZJe_GkT" // Bygg och anläggning (1818 jobs) - Primary
    ],
    "Data, IT, telekommunikation": [
        "6Hq3_tKo_V57" // Yrken med teknisk inriktning (2296 jobs)
    ],
    "Försäljning, inköp, marknadsföring": [
        "RPTn_bxG_ExZ" // Försäljning, inköp, marknadsföring (4199 jobs)
    ],
    "Hälso- och sjukvård": [
        "NYW6_mP6_vwf" // Hälso- och sjukvård (5755 jobs) - Primary
    ],
    "Teknik, tillverkning, transport": [
        "6Hq3_tKo_V57" // Yrken med teknisk inriktning (2296 jobs) - Primary
    ],
    "Pedagogik": [
        "MVqp_eS8_kDZ" // Pedagogik (2766 jobs)
    ],
    "Säkerhet, rättsväsende, försvar": [
        "E7hm_BLq_fqZ" // Säkerhet och bevakning (592 jobs)
    ],
    "Transport, logistik, mekanik": [
        "ASGV_zcE_bWf" // Transport, distribution, lager (2108 jobs) - Primary
    ],
    "Service, turism, restaurang": [
        "Uuf1_GMh_Uvw" // Kropps- och skönhetsvård (311 jobs)
    ],
    "Jordbruk, skogsbruk, miljö": [
        "kJeN_wmw_9wX" // Naturvetenskap (329 jobs)
    ],
    "Konst, design, media": [
        "9puE_nYg_crq" // Kultur, media, design (321 jobs)
    ],
    "Chefer och verksamhetsledare": [
        "bh3H_Y3h_5eD" // Chefer och verksamhetsledare (1722 jobs)
    ],
    "Sanering och renhållning": [
        "whao_Q6A_ScE" // Sanering och renhållning (1225 jobs)
    ]
};

/**
 * Gets Taxonomy concept IDs for a given branch category
 * @param branchCategory - Our UI branch category
 * @returns Array of Taxonomy concept IDs
 */
export function getTaxonomyIdsForBranch(branchCategory: string): string[] {
    return BRANCH_TO_TAXONOMY_MAP[branchCategory] || [];
}
