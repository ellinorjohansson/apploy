// fetchJobService.ts

import axios from 'axios';
import type { JobAd } from "../types/jobs";
import { getTaxonomyIdsForBranch } from "./taxonomyService";
import { getRegionCodesForCounties } from "../constants/filterConstants";

// Open API 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jobsearch.api.jobtechdev.se';

/**
 * Fetches jobs from JobTech API with server-side filtering
 * Uses 'brief' format for optimal performance - only essential fields are included
 * @param limit - Number of jobs to fetch
 * @param offset - Starting position for pagination
 * @param selectedBranches - Array of branch categories to filter by
 * @param selectedLocations - Array of location filters
 * @param searchTerm - Text search term (uses 'q' parameter)
 * @returns Promise<JobAd[]> - Array of job advertisements
 */
export async function fetchJobs(
    limit = 30, 
    offset = 0, 
    selectedBranches: string[] = [], 
    selectedLocations: string[] = [], 
    searchTerm: string = ""
): Promise<JobAd[]> {
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
 * @returns Promise<JobAd[]> - Array of job advertisements
 */
async function fetchJobsSingleRegion(
    limit = 30, 
    offset = 0, 
    selectedBranches: string[] = [], 
    selectedLocations: string[] = [], 
    searchTerm: string = ""
): Promise<JobAd[]> {
    try {
        const params: Record<string, string | number | string[]> = {
            limit,
            offset,
            format: 'brief' // Use brief format for better performance - only essential fields
        };

        // Add text search using 'q' parameter (freetext query)
        if (searchTerm.trim()) {
            params['q'] = searchTerm.trim();
            console.log('Searching for:', searchTerm);
        }

        // Add branch filtering using Taxonomy concept_ids
        if (selectedBranches.length > 0) {
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

        // Add location filtering using region codes (single region only)
        if (selectedLocations.length > 0) {
            const regionCodes = getRegionCodesForCounties(selectedLocations);
            if (regionCodes.length > 0) {
                // Use only the first region code for single region requests
                params['region'] = regionCodes[0];
                console.log('Filtering by single region code:', regionCodes[0], 'for county:', selectedLocations[0]);
            }
        }

        console.log('API request params:', params);
        console.log('Full API URL:', `${API_BASE_URL}/search`);
        
        // Log the actual URL that will be called
        const url = new URL(`${API_BASE_URL}/search`);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
        console.log('Actual URL being called:', url.toString());

        const response = await axios.get(`${API_BASE_URL}/search`, { params });
        
        console.log('API response total:', response.data?.total?.value);
        console.log('API response hits count:', response.data?.hits?.length);
        
        return response.data?.hits || [];
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
}

/**
 * Fetches jobs for multiple regions by making separate API calls and combining results
 * @param limit - Number of jobs to fetch per region
 * @param offset - Starting position for pagination
 * @param selectedBranches - Array of branch categories to filter by
 * @param selectedLocations - Array of location filters (multiple)
 * @param searchTerm - Text search term
 * @returns Promise<JobAd[]> - Combined array of job advertisements
 */
async function fetchJobsMultipleRegions(
    limit = 30, 
    offset = 0, 
    selectedBranches: string[] = [], 
    selectedLocations: string[] = [], 
    searchTerm: string = ""
): Promise<JobAd[]> {
    try {
        const regionCodes = getRegionCodesForCounties(selectedLocations);
        console.log('Fetching jobs for multiple regions:', regionCodes, 'for counties:', selectedLocations);
        
        // Calculate jobs per region (distribute evenly)
        const jobsPerRegion = Math.ceil(limit / selectedLocations.length);
        
        // Make API calls for each region in parallel
        const regionPromises = regionCodes.map(regionCode => 
            fetchJobsSingleRegion(jobsPerRegion, offset, selectedBranches, [selectedLocations[regionCodes.indexOf(regionCode)]], searchTerm)
        );
        
        const regionResults = await Promise.all(regionPromises);
        
        // Combine all results and remove duplicates based on job ID
        const allJobs = regionResults.flat();
        const uniqueJobs = allJobs.filter((job, index, self) => 
            index === self.findIndex(j => j.id === job.id)
        );
        
        // Limit to requested number of jobs
        const limitedJobs = uniqueJobs.slice(0, limit);
        
        console.log(`Combined ${allJobs.length} jobs from ${regionCodes.length} regions, ${uniqueJobs.length} unique, returning ${limitedJobs.length}`);
        
        return limitedJobs;
    } catch (error) {
        console.error('Error fetching jobs for multiple regions:', error);
        return [];
    }
}