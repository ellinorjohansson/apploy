// fetchJobService.ts

import axios from 'axios';
import type { JobAd } from "../types/jobs";
import { getTaxonomyIdsForBranch } from "./taxonomyService";
import { getRegionCodesForCounties } from "../constants/filterConstants";

// Open API 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jobsearch.api.jobtechdev.se';

/**
 * Result interface for fetchJobs function
 */
export interface FetchJobsResult {
    jobs: JobAd[];
    total: number;
}

/**
 * Fetches jobs from JobTech API with server-side filtering
 * Uses 'brief' format for optimal performance - only essential fields are included
 * @param limit - Number of jobs to fetch
 * @param offset - Starting position for pagination
 * @param selectedBranches - Array of branch categories to filter by
 * @param selectedLocations - Array of location filters
 * @param searchTerm - Text search term (uses 'q' parameter)
 * @returns Promise<FetchJobsResult> - Object containing jobs array and total count
 */
export async function fetchJobs(
    limit = 30, 
    offset = 0, 
    selectedBranches: string[] = [], 
    selectedLocations: string[] = [], 
    searchTerm: string = ""
): Promise<FetchJobsResult> {
    // If multiple locations are selected, we need to make separate API calls
    // and combine the results since JobTech API doesn't support multiple regions
    if (selectedLocations.length > 1) {
        return fetchJobsMultipleRegions(limit, offset, selectedBranches, selectedLocations, searchTerm);
    }
    
    // Single region or no location filter - use normal API call
    return fetchJobsSingleRegion(limit, offset, selectedBranches, selectedLocations, searchTerm);
}

/**
 * Fetches jobs for a single region (or no location filter)
 * @param limit - Number of jobs to fetch
 * @param offset - Starting position for pagination
 * @param selectedBranches - Array of branch categories to filter by
 * @param selectedLocations - Array of location filters (max 1)
 * @param searchTerm - Text search term
 * @returns Promise<FetchJobsResult> - Object containing jobs array and total count
 */
async function fetchJobsSingleRegion(
    limit = 30, 
    offset = 0, 
    selectedBranches: string[] = [], 
    selectedLocations: string[] = [], 
    searchTerm: string = ""
): Promise<FetchJobsResult> {
    try {
        const params: Record<string, string | number | string[]> = {
            limit,
            offset,
            format: 'brief' // Use brief format for better performance - only essential fields
        };

        // JobTech API has limitations - it doesn't support all three parameters simultaneously
        // We need to prioritize filters: q (search) > occupation-field (branch) > region (location)
        
        // Priority 1: Text search using 'q' parameter (highest priority)
        if (searchTerm.trim()) {
            params['q'] = searchTerm.trim();
            console.log('Searching for:', searchTerm);
            console.log('Note: Using search term - other filters may be limited');
        }
        // Priority 2: Branch filtering (only if no search term)
        else if (selectedBranches.length > 0) {
            // Get the primary concept_id for each selected branch (first one in the array)
            const primaryTaxonomyIds = selectedBranches.map(branch => {
                const ids = getTaxonomyIdsForBranch(branch);
                return ids.length > 0 ? ids[0] : null;
            }).filter(id => id !== null);
            
            if (primaryTaxonomyIds.length > 0) {
                // JobTech API supports multiple occupation-related parameters:
                // - occupation-field: Broad industry categories (e.g., "Försäljning, inköp, marknadsföring")
                // - occupation-group: Specific job groups (e.g., "Grundutbildade sjuksköterskor") 
                // - occupation: Specific job titles (e.g., "Sjuksköterska, grundutbildad")
                
                // Use only the primary concept_id for each branch to avoid API conflicts
                params['occupation-field'] = primaryTaxonomyIds.join(',');
                console.log('Filtering by occupation fields (primary IDs):', primaryTaxonomyIds);
                console.log('Occupation-field param value:', params['occupation-field']);
                
                // TODO: Could add occupation-group and occupation filters for more granular control
                // params['occupation-group'] = specificGroupIds.join(',');
                // params['occupation'] = specificOccupationIds.join(',');
            }
        }
        
        // Priority 3: Location filtering (only if no search term and no branch filter)
        if (selectedLocations.length > 0 && !searchTerm.trim() && selectedBranches.length === 0) {
            const regionCodes = getRegionCodesForCounties(selectedLocations);
            if (regionCodes.length > 0) {
                // Use only the first region code for single region requests
                params['region'] = regionCodes[0];
                console.log('Filtering by single region code:', regionCodes[0], 'for county:', selectedLocations[0]);
            }
        }
        
        // If we have both search term and other filters, we can only use search term
        if (searchTerm.trim() && (selectedBranches.length > 0 || selectedLocations.length > 0)) {
            console.warn('Search term takes priority - branch and location filters are ignored');
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/search`, { params });
            
            return {
                jobs: response.data?.hits || [],
                total: response.data?.total?.value || 0
            };
        } catch (error) {
            console.error('API call failed:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: unknown; status?: number } };
                console.error('Error response:', axiosError.response?.data);
                console.error('Error status:', axiosError.response?.status);
            }
            throw error;
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return { jobs: [], total: 0 };
    }
}

/**
 * Fetches jobs for multiple regions by making separate API calls and combining results
 * @param limit - Number of jobs to fetch per region
 * @param offset - Starting position for pagination
 * @param selectedBranches - Array of branch categories to filter by
 * @param selectedLocations - Array of location filters (multiple)
 * @param searchTerm - Text search term
 * @returns Promise<FetchJobsResult> - Object containing combined jobs array and total count
 */
async function fetchJobsMultipleRegions(
    limit = 30, 
    offset = 0, 
    selectedBranches: string[] = [], 
    selectedLocations: string[] = [], 
    searchTerm: string = ""
): Promise<FetchJobsResult> {
    try {
        const regionCodes = getRegionCodesForCounties(selectedLocations);
        
        // Calculate jobs per region (distribute evenly)
        const jobsPerRegion = Math.ceil(limit / selectedLocations.length);
        
        // Make API calls for each region in parallel
        const regionPromises = regionCodes.map(regionCode => 
            fetchJobsSingleRegion(jobsPerRegion, offset, selectedBranches, [selectedLocations[regionCodes.indexOf(regionCode)]], searchTerm)
        );
        
        const regionResults = await Promise.all(regionPromises);
        
        // Combine all results and remove duplicates based on job ID
        const allJobs = regionResults.flatMap(result => result.jobs);
        const uniqueJobs = allJobs.filter((job, index, self) => 
            index === self.findIndex(j => j.id === job.id)
        );
        
        // Calculate total from all regions (sum of totals)
        const totalFromAllRegions = regionResults.reduce((sum, result) => sum + result.total, 0);
        
        // Limit to requested number of jobs
        const limitedJobs = uniqueJobs.slice(0, limit);
        
        return {
            jobs: limitedJobs,
            total: totalFromAllRegions
        };
    } catch (error) {
        console.error('Error fetching jobs for multiple regions:', error);
        if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: unknown; status?: number } };
            console.error('Error response:', axiosError.response?.data);
            console.error('Error status:', axiosError.response?.status);
        }
        return { jobs: [], total: 0 };
    }
}