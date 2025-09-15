// taxonomyService.ts

import axios from 'axios';

const TAXONOMY_API_BASE_URL = 'https://taxonomy.api.jobtechdev.se/v1/taxonomy'; // lägg i env sedan också <---

export interface OccupationField {
  concept_id: string;
  label: string;
  description?: string;
}

export interface OccupationGroup {
  concept_id: string;
  label: string;
  occupation_field_id?: string;
}

// Cache for occupation fields to avoid repeated API calls
let occupationFieldsCache: OccupationField[] | null = null;

export async function fetchOccupationFields(): Promise<OccupationField[]> {
  // Return cached data if available
  if (occupationFieldsCache) {
    return occupationFieldsCache;
  }

  try {
    const response = await axios.get(`${TAXONOMY_API_BASE_URL}/occupation-fields`);
    occupationFieldsCache = response.data;
    return occupationFieldsCache;
  } catch (error) {
    console.error('Error fetching occupation fields:', error);
    // Fallback to hardcoded fields if API fails
    return [
      { concept_id: '1', label: 'Administration, ekonomi, juridik' },
      { concept_id: '2', label: 'Bygg, anläggning, installation' },
      { concept_id: '3', label: 'Data, IT, telekommunikation' },
      { concept_id: '4', label: 'Försäljning, inköp, marknadsföring' },
      { concept_id: '5', label: 'Hälsa, medicin, vård, omsorg' },
      { concept_id: '6', label: 'Teknik, tillverkning, transport' }
    ];
  }
}

export async function fetchOccupationGroups(): Promise<OccupationGroup[]> {
  try {
    const response = await axios.get(`${TAXONOMY_API_BASE_URL}/occupation-groups`);
    return response.data;
  } catch (error) {
    console.error('Error fetching occupation groups:', error);
    return [];
  }
}

// Helper function to get occupation field for a specific occupation concept_id
export async function getOccupationFieldForOccupation(occupationConceptId: string): Promise<OccupationField | null> {
  try {
    const response = await axios.get(`${TAXONOMY_API_BASE_URL}/occupation/${occupationConceptId}`);
    const occupation = response.data;
    
    // Get the occupation field for this occupation
    if (occupation.occupation_field_id) {
      const fields = await fetchOccupationFields();
      return fields.find(field => field.concept_id === occupation.occupation_field_id) || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching occupation field for occupation:', error);
    return null;
  }
}
