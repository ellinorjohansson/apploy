// eventHandlers.ts
// This file contains helper functions for handling different types of events from UI components

/**
 * Extracts search value from different event types that can come from search components
 * Handles various event structures that might be returned by different UI libraries
 * @param event - The event object from the search component
 * @returns The search value as a string, empty string if not found
 */
export const extractSearchValue = (event: any): string => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Check if event has detail object with value property
    if (event.detail && typeof event.detail === 'object' && 'value' in event.detail) {
        return event.detail.value;
    } 
    // Check if event.detail is directly a string
    else if (typeof event.detail === 'string') {
        return event.detail;
    } 
    // Check if event has detail.target.value (standard DOM event structure)
    else if (event.detail && event.detail.target && event.detail.target.value !== undefined) {
        return event.detail.target.value;
    }
    // Return empty string if no value found
    return '';
};

/**
 * Extracts checked items from filter events (used for multi-select filters)
 * @param event - The event object from the filter component
 * @returns Array of checked item values, empty array if none found
 */
export const extractCheckedItems = (event: any): string[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Check if event has detail object with checked property
    if (event.detail && event.detail.checked) {
        return event.detail.checked;
    }
    // Return empty array if no checked items found
    return [];
};
