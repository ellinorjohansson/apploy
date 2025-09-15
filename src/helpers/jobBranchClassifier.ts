// jobBranchClassifier.ts
// This file contains all the logic for classifying job advertisements into different branches/categories
// based on their occupation labels. It uses keyword matching with word boundaries to avoid false positives.

import type { JobAd } from "../types/jobs";

/**
 * Checks if a word exists as a complete word in the text (not as part of another word)
 * Uses word boundaries (\b) to ensure exact matches
 * @param text - The text to search in
 * @param word - The word to search for
 * @returns true if the word is found as a complete word
 */
export const hasWord = (text: string, word: string): boolean => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(text);
};

/**
 * Checks if a word exists anywhere in the text (can be part of other words)
 * Used for longer, more specific words that are unlikely to cause false positives
 * @param text - The text to search in
 * @param word - The word to search for
 * @returns true if the word is found anywhere in the text
 */
export const hasWordAnywhere = (text: string, word: string): boolean => {
    return text.includes(word);
};

/**
 * Checks if a phrase exists as a complete phrase in the text
 * Uses word boundaries (\b) to ensure exact phrase matches
 * @param text - The text to search in
 * @param phrase - The phrase to search for
 * @returns true if the phrase is found as a complete phrase
 */
export const hasPhrase = (text: string, phrase: string): boolean => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'i');
    return regex.test(text);
};

/**
 * Classifies a job advertisement into a specific branch/category based on its occupation label
 * This function uses extensive keyword matching to categorize jobs into predefined branches
 * @param job - The job advertisement to classify
 * @returns The branch name if a match is found, null otherwise
 */
export const getJobBranch = (job: JobAd): string | null => {
    // Return null if job has no occupation label
    if (!job.occupation?.label) return null;
    
    // Convert to lowercase for case-insensitive matching
    const occupationLabel = job.occupation.label.toLowerCase();
    
    // IT & Data
    if (hasWordAnywhere(occupationLabel, 'utvecklare') || 
        hasWordAnywhere(occupationLabel, 'programmerare') || 
        hasWordAnywhere(occupationLabel, 'system') || 
        hasWord(occupationLabel, 'data') || 
        hasWord(occupationLabel, 'it') || 
        hasWordAnywhere(occupationLabel, 'frontend') || 
        hasWordAnywhere(occupationLabel, 'backend') || 
        hasWordAnywhere(occupationLabel, 'fullstack') ||
        hasWordAnywhere(occupationLabel, 'arkitekt') ||
        hasWordAnywhere(occupationLabel, 'analytiker') ||
        hasWordAnywhere(occupationLabel, 'designer') ||
        hasWord(occupationLabel, 'ux') ||
        hasWord(occupationLabel, 'ui') ||
        hasWordAnywhere(occupationLabel, 'tester') ||
        hasWordAnywhere(occupationLabel, 'devops') ||
        hasWordAnywhere(occupationLabel, 'cybersäkerhet') ||
        hasWordAnywhere(occupationLabel, 'nätverk') ||
        hasWordAnywhere(occupationLabel, 'support') ||
        hasWordAnywhere(occupationLabel, 'telekommunikation') ||
        hasWordAnywhere(occupationLabel, 'programmering') ||
        hasWordAnywhere(occupationLabel, 'kodning') ||
        hasWordAnywhere(occupationLabel, 'applikation') ||
        hasWord(occupationLabel, 'app') ||
        hasWord(occupationLabel, 'web') ||
        hasWordAnywhere(occupationLabel, 'mobil') ||
        hasWordAnywhere(occupationLabel, 'software') ||
        hasWordAnywhere(occupationLabel, 'hardware') ||
        hasWordAnywhere(occupationLabel, 'databas') ||
        hasWordAnywhere(occupationLabel, 'server') ||
        hasWordAnywhere(occupationLabel, 'cloud') ||
        hasWord(occupationLabel, 'ai') ||
        hasWord(occupationLabel, 'ml') ||
        hasWordAnywhere(occupationLabel, 'blockchain') ||
        hasWord(occupationLabel, 'iot') ||
        hasWord(occupationLabel, 'api') ||
        hasWordAnywhere(occupationLabel, 'säkerhet') ||
        hasWordAnywhere(occupationLabel, 'konsult') ||
        hasWordAnywhere(occupationLabel, 'specialist') ||
        hasWordAnywhere(occupationLabel, 'expert') ||
        hasWordAnywhere(occupationLabel, 'tekniker') ||
        hasWordAnywhere(occupationLabel, 'ingenjör') ||
        hasWordAnywhere(occupationLabel, 'konstruktör') ||
        hasWordAnywhere(occupationLabel, 'utveckling') ||
        hasWordAnywhere(occupationLabel, 'forskning') ||
        hasWordAnywhere(occupationLabel, 'innovation') ||
        hasWordAnywhere(occupationLabel, 'prototyp') ||
        hasWordAnywhere(occupationLabel, 'testning') ||
        hasWordAnywhere(occupationLabel, 'kvalitet') ||
        hasWordAnywhere(occupationLabel, 'kontroll') ||
        hasWordAnywhere(occupationLabel, 'inspektion') ||
        hasWordAnywhere(occupationLabel, 'mätning') ||
        hasWordAnywhere(occupationLabel, 'kalibrering') ||
        hasWordAnywhere(occupationLabel, 'underhåll') ||
        hasWordAnywhere(occupationLabel, 'reparation') ||
        hasWordAnywhere(occupationLabel, 'service') ||
        hasWordAnywhere(occupationLabel, 'felsökning') ||
        hasWordAnywhere(occupationLabel, 'diagnostik') ||
        hasWordAnywhere(occupationLabel, 'troubleshooting') ||
        hasWordAnywhere(occupationLabel, 'felsökare') ||
        hasWordAnywhere(occupationLabel, 'projektledare') ||
        hasWordAnywhere(occupationLabel, 'chef') ||
        hasWordAnywhere(occupationLabel, 'manager') ||
        hasWordAnywhere(occupationLabel, 'ledare') ||
        hasWordAnywhere(occupationLabel, 'supervisor') ||
        hasWordAnywhere(occupationLabel, 'koordinator') ||
        hasWordAnywhere(occupationLabel, 'planerare') ||
        hasWordAnywhere(occupationLabel, 'schemaläggare') ||
        hasPhrase(occupationLabel, 'frontend utvecklare') ||
        hasPhrase(occupationLabel, 'backend utvecklare') ||
        hasPhrase(occupationLabel, 'fullstack utvecklare') ||
        hasPhrase(occupationLabel, 'systemutvecklare') ||
        hasPhrase(occupationLabel, 'app utvecklare') ||
        hasPhrase(occupationLabel, 'mobil utvecklare') ||
        hasPhrase(occupationLabel, 'web utvecklare') ||
        hasPhrase(occupationLabel, 'data scientist') ||
        hasPhrase(occupationLabel, 'data analyst') ||
        hasPhrase(occupationLabel, 'business analyst') ||
        hasPhrase(occupationLabel, 'system administrator') ||
        hasPhrase(occupationLabel, 'nätverksadministratör') ||
        hasPhrase(occupationLabel, 'databasadministratör') ||
        hasPhrase(occupationLabel, 'IT support') ||
        hasPhrase(occupationLabel, 'tekniker') ||
        hasPhrase(occupationLabel, 'cyber security') ||
        hasPhrase(occupationLabel, 'information security') ||
        hasPhrase(occupationLabel, 'cloud engineer') ||
        hasPhrase(occupationLabel, 'software engineer') ||
        hasPhrase(occupationLabel, 'quality assurance') ||
        hasPhrase(occupationLabel, 'test engineer')) {
        return 'Data, IT, telekommunikation';
        }
        
        // Health & Care
    if (hasWordAnywhere(occupationLabel, 'sjuksköterska') || 
        hasWordAnywhere(occupationLabel, 'läkare') || 
        hasWordAnywhere(occupationLabel, 'vård') || 
        hasWordAnywhere(occupationLabel, 'undersköterska') || 
        hasWordAnywhere(occupationLabel, 'sjukgymnast') ||
        hasWordAnywhere(occupationLabel, 'medicin') ||
        hasWordAnywhere(occupationLabel, 'kurator') ||
        hasWordAnywhere(occupationLabel, 'psykolog') ||
        hasWordAnywhere(occupationLabel, 'terapeut') ||
        hasWordAnywhere(occupationLabel, 'barnmorska') ||
        hasWordAnywhere(occupationLabel, 'tandläkare') ||
        hasWordAnywhere(occupationLabel, 'apotekare') ||
        hasWordAnywhere(occupationLabel, 'socialarbetare') ||
        hasWordAnywhere(occupationLabel, 'barnskötare') ||
        hasWordAnywhere(occupationLabel, 'omsorg') ||
        hasWordAnywhere(occupationLabel, 'rehabilitering') ||
        hasWordAnywhere(occupationLabel, 'fysioterapeut') ||
        hasWordAnywhere(occupationLabel, 'arbetsterapeut') ||
        hasWordAnywhere(occupationLabel, 'logoped') ||
        hasWordAnywhere(occupationLabel, 'dietist') ||
        hasWordAnywhere(occupationLabel, 'optiker') ||
        hasWordAnywhere(occupationLabel, 'audionom') ||
        hasWordAnywhere(occupationLabel, 'biomedicinsk') ||
        hasWordAnywhere(occupationLabel, 'röntgen') ||
        hasWordAnywhere(occupationLabel, 'operations') ||
        hasWordAnywhere(occupationLabel, 'distriktssjuksköterska') ||
        hasWordAnywhere(occupationLabel, 'vårdadministratör') ||
        hasWordAnywhere(occupationLabel, 'vårdkoordinator') ||
        hasWordAnywhere(occupationLabel, 'sjukskrivning') ||
        hasWordAnywhere(occupationLabel, 'habilitering') ||
        hasPhrase(occupationLabel, 'personlig assistent') ||
        hasPhrase(occupationLabel, 'vårdbiträde') ||
        hasPhrase(occupationLabel, 'hemtjänst') ||
        hasPhrase(occupationLabel, 'äldreomsorg') ||
        hasPhrase(occupationLabel, 'funktionshinder') ||
        hasPhrase(occupationLabel, 'handikappomsorg') ||
        hasPhrase(occupationLabel, 'psykiatri') ||
        hasPhrase(occupationLabel, 'psykiatrisk vård') ||
        hasPhrase(occupationLabel, 'barnpsykiatri') ||
        hasPhrase(occupationLabel, 'geriatri') ||
        hasPhrase(occupationLabel, 'onkologi') ||
        hasPhrase(occupationLabel, 'kardiologi') ||
        hasPhrase(occupationLabel, 'neurologi') ||
        hasPhrase(occupationLabel, 'ortopedi') ||
        hasPhrase(occupationLabel, 'pediatri') ||
        hasPhrase(occupationLabel, 'gynekologi') ||
        hasPhrase(occupationLabel, 'anestesi') ||
        hasPhrase(occupationLabel, 'kirurgi') ||
        hasPhrase(occupationLabel, 'radiologi') ||
        hasPhrase(occupationLabel, 'laboratorium') ||
        hasPhrase(occupationLabel, 'fysioterapeut') ||
        hasPhrase(occupationLabel, 'arbetsterapeut') ||
        hasPhrase(occupationLabel, 'logoped') ||
        hasPhrase(occupationLabel, 'dietist') ||
        hasPhrase(occupationLabel, 'optiker') ||
        hasPhrase(occupationLabel, 'audionom') ||
        hasPhrase(occupationLabel, 'biomedicinsk analytiker') ||
        hasPhrase(occupationLabel, 'medicinsk sekreterare') ||
        hasPhrase(occupationLabel, 'röntgensjuksköterska') ||
        hasPhrase(occupationLabel, 'operationssjuksköterska') ||
        hasPhrase(occupationLabel, 'distriktssjuksköterska') ||
        hasPhrase(occupationLabel, 'barnmorska') ||
        hasPhrase(occupationLabel, 'sjuksköterska') ||
        hasPhrase(occupationLabel, 'undersköterska') ||
        hasPhrase(occupationLabel, 'vårdadministratör') ||
        hasPhrase(occupationLabel, 'vårdkoordinator') ||
        hasPhrase(occupationLabel, 'sjukskrivning') ||
        hasPhrase(occupationLabel, 'rehabilitering') ||
        hasPhrase(occupationLabel, 'habilitering')) {
        return 'Hälsa, medicin, vård, omsorg';
        }
        
        // Sales & Marketing
    if (hasWordAnywhere(occupationLabel, 'säljare') || 
        hasWord(occupationLabel, 'sälj') || 
        hasWordAnywhere(occupationLabel, 'marknadsföring') || 
        hasWord(occupationLabel, 'marknads') ||
        hasWordAnywhere(occupationLabel, 'manager') ||
        hasWordAnywhere(occupationLabel, 'account') ||
        hasWordAnywhere(occupationLabel, 'inköp') ||
        hasWordAnywhere(occupationLabel, 'handel') ||
        hasPhrase(occupationLabel, 'account manager') ||
        hasPhrase(occupationLabel, 'sales manager') ||
        hasPhrase(occupationLabel, 'marknadschef') ||
        hasPhrase(occupationLabel, 'försäljningschef') ||
        hasPhrase(occupationLabel, 'marknadsförare') ||
        hasPhrase(occupationLabel, 'produktchef') ||
        hasPhrase(occupationLabel, 'brand manager') ||
        hasPhrase(occupationLabel, 'digital marknadsföring') ||
        hasPhrase(occupationLabel, 'sociala medier') ||
        hasPhrase(occupationLabel, 'content manager') ||
        hasPhrase(occupationLabel, 'e-handel') ||
        hasPhrase(occupationLabel, 'online handel') ||
        hasPhrase(occupationLabel, 'inköpschef') ||
        hasPhrase(occupationLabel, 'inköpare') ||
        hasPhrase(occupationLabel, 'provision') ||
        hasPhrase(occupationLabel, 'butikschef') ||
        hasPhrase(occupationLabel, 'butiksledare') ||
        hasPhrase(occupationLabel, 'kundservice') ||
        hasPhrase(occupationLabel, 'kundtjänst')) {
        return 'Försäljning, inköp, marknadsföring';
        }
        
        // Administration, Economics, Law
    if (hasWordAnywhere(occupationLabel, 'ekonom') || 
        hasWordAnywhere(occupationLabel, 'administratör') || 
        hasWordAnywhere(occupationLabel, 'receptionist') || 
        hasWordAnywhere(occupationLabel, 'sekreterare') ||
        hasWordAnywhere(occupationLabel, 'administration') ||
        hasWordAnywhere(occupationLabel, 'juridik') ||
        hasWordAnywhere(occupationLabel, 'advokat') ||
        hasWordAnywhere(occupationLabel, 'jurist') ||
        hasWordAnywhere(occupationLabel, 'redovisning') ||
        hasWordAnywhere(occupationLabel, 'bokföring') ||
        hasWord(occupationLabel, 'hr') ||
        hasWordAnywhere(occupationLabel, 'personal') ||
        hasWordAnywhere(occupationLabel, 'controller') ||
        hasWordAnywhere(occupationLabel, 'revisor')) {
        return 'Administration, ekonomi, juridik';
        }
        
        // Construction, Installation
    if (hasWordAnywhere(occupationLabel, 'bygg') || 
        hasWord(occupationLabel, 'rör') || 
        hasWordAnywhere(occupationLabel, 'elektriker') || 
        hasWordAnywhere(occupationLabel, 'installation') ||
        hasWordAnywhere(occupationLabel, 'anläggning') ||
        hasWordAnywhere(occupationLabel, 'murare') ||
        hasWordAnywhere(occupationLabel, 'målare') ||
        hasWordAnywhere(occupationLabel, 'golvläggare') ||
        hasWordAnywhere(occupationLabel, 'snickare') ||
        hasWordAnywhere(occupationLabel, 'plåtslagare') ||
        hasWord(occupationLabel, 'vvs') ||
        hasWordAnywhere(occupationLabel, 'vvs-tekniker') ||
        hasWordAnywhere(occupationLabel, 'betongarbetare') ||
        hasWordAnywhere(occupationLabel, 'takläggare') ||
        hasWordAnywhere(occupationLabel, 'kakel') ||
        hasWordAnywhere(occupationLabel, 'kakelplattare') ||
        hasWordAnywhere(occupationLabel, 'isolerare') ||
        hasWordAnywhere(occupationLabel, 'gipsare') ||
        hasWordAnywhere(occupationLabel, 'måleri') ||
        hasWordAnywhere(occupationLabel, 'målar') ||
        hasWordAnywhere(occupationLabel, 'golv') ||
        hasWordAnywhere(occupationLabel, 'parkett') ||
        hasWord(occupationLabel, 'kök') ||
        hasWordAnywhere(occupationLabel, 'kökstekniker') ||
        hasWordAnywhere(occupationLabel, 'byggarbetare') ||
        hasWordAnywhere(occupationLabel, 'hantverkare') ||
        hasWordAnywhere(occupationLabel, 'montör') ||
        hasWordAnywhere(occupationLabel, 'tekniker') ||
        hasWordAnywhere(occupationLabel, 'specialist') ||
        hasWordAnywhere(occupationLabel, 'expert') ||
        hasWordAnywhere(occupationLabel, 'konsult') ||
        hasWordAnywhere(occupationLabel, 'projektledare') ||
        hasWordAnywhere(occupationLabel, 'chef') ||
        hasWordAnywhere(occupationLabel, 'manager') ||
        hasWordAnywhere(occupationLabel, 'ledare') ||
        hasWordAnywhere(occupationLabel, 'supervisor') ||
        hasWordAnywhere(occupationLabel, 'koordinator') ||
        hasWordAnywhere(occupationLabel, 'planerare') ||
        hasWordAnywhere(occupationLabel, 'schemaläggare') ||
        hasWordAnywhere(occupationLabel, 'konstruktör') ||
        hasWordAnywhere(occupationLabel, 'arkitekt') ||
        hasWordAnywhere(occupationLabel, 'ingenjör') ||
        hasWordAnywhere(occupationLabel, 'utveckling') ||
        hasWordAnywhere(occupationLabel, 'forskning') ||
        hasWordAnywhere(occupationLabel, 'innovation') ||
        hasWordAnywhere(occupationLabel, 'prototyp') ||
        hasWordAnywhere(occupationLabel, 'testning') ||
        hasWordAnywhere(occupationLabel, 'kvalitet') ||
        hasWordAnywhere(occupationLabel, 'kontroll') ||
        hasWordAnywhere(occupationLabel, 'inspektion') ||
        hasWordAnywhere(occupationLabel, 'mätning') ||
        hasWordAnywhere(occupationLabel, 'kalibrering') ||
        hasWordAnywhere(occupationLabel, 'underhåll') ||
        hasWordAnywhere(occupationLabel, 'reparation') ||
        hasWordAnywhere(occupationLabel, 'service') ||
        hasWordAnywhere(occupationLabel, 'felsökning') ||
        hasWordAnywhere(occupationLabel, 'diagnostik') ||
        hasWordAnywhere(occupationLabel, 'troubleshooting') ||
        hasWordAnywhere(occupationLabel, 'felsökare')) {
        return 'Bygg, anläggning, installation';
        }
        
    // Manufacturing, Production
    if (hasWordAnywhere(occupationLabel, 'maskin') || 
        hasWordAnywhere(occupationLabel, 'tillverkning') ||
        hasWordAnywhere(occupationLabel, 'operatör') ||
        hasWordAnywhere(occupationLabel, 'montör') ||
        hasWordAnywhere(occupationLabel, 'tekniker') ||
        hasWordAnywhere(occupationLabel, 'produktion') ||
        hasWordAnywhere(occupationLabel, 'industri') ||
        hasWordAnywhere(occupationLabel, 'fabrik') ||
        hasWordAnywhere(occupationLabel, 'kran') ||
        hasWordAnywhere(occupationLabel, 'grävmaskin') ||
        hasWordAnywhere(occupationLabel, 'bulldozer') ||
        hasWordAnywhere(occupationLabel, 'traktor') ||
        hasWordAnywhere(occupationLabel, 'hjullastare') ||
        hasWordAnywhere(occupationLabel, 'elektriker') ||
        hasWordAnywhere(occupationLabel, 'automatiker') ||
        hasWordAnywhere(occupationLabel, 'instrumenttekniker') ||
        hasWordAnywhere(occupationLabel, 'reglertekniker') ||
        hasWordAnywhere(occupationLabel, 'processoperatör') ||
        hasWordAnywhere(occupationLabel, 'produktionsoperatör') ||
        hasWordAnywhere(occupationLabel, 'maskinoperatör') ||
        hasWordAnywhere(occupationLabel, 'cnc-operatör') ||
        hasWordAnywhere(occupationLabel, 'fräsmaskin') ||
        hasWordAnywhere(occupationLabel, 'svarv') ||
        hasWordAnywhere(occupationLabel, 'borrmaskin') ||
        hasWordAnywhere(occupationLabel, 'slipmaskin') ||
        hasWordAnywhere(occupationLabel, 'svetsare') ||
        hasWordAnywhere(occupationLabel, 'plåtslagare') ||
        hasWordAnywhere(occupationLabel, 'rörsvetsare') ||
        hasWordAnywhere(occupationLabel, 'tigsvetsare') ||
        hasWordAnywhere(occupationLabel, 'migsvetsare') ||
        hasWordAnywhere(occupationLabel, 'bågsvetsare') ||
        hasWordAnywhere(occupationLabel, 'gassvetsare') ||
        hasWordAnywhere(occupationLabel, 'plasmaskärning') ||
        hasWordAnywhere(occupationLabel, 'laserskärning') ||
        hasWordAnywhere(occupationLabel, 'vattenskärning') ||
        hasWord(occupationLabel, 'cnc') ||
        hasWord(occupationLabel, 'cad') ||
        hasWord(occupationLabel, 'cam') ||
        hasWordAnywhere(occupationLabel, 'programmering') ||
        hasWordAnywhere(occupationLabel, 'automatisering') ||
        hasWordAnywhere(occupationLabel, 'robot') ||
        hasWordAnywhere(occupationLabel, 'robotik') ||
        hasWord(occupationLabel, 'plc') ||
        hasWord(occupationLabel, 'hmi') ||
        hasWordAnywhere(occupationLabel, 'scada') ||
        hasWordAnywhere(occupationLabel, 'industriell') ||
        hasWordAnywhere(occupationLabel, 'teknik') ||
        hasWordAnywhere(occupationLabel, 'ingenjör') ||
        hasWordAnywhere(occupationLabel, 'konstruktör') ||
        hasWordAnywhere(occupationLabel, 'designer') ||
        hasWordAnywhere(occupationLabel, 'utvecklare') ||
        hasWordAnywhere(occupationLabel, 'forskare') ||
        hasWordAnywhere(occupationLabel, 'utveckling') ||
        hasWordAnywhere(occupationLabel, 'forskning') ||
        hasWordAnywhere(occupationLabel, 'innovation') ||
        hasWordAnywhere(occupationLabel, 'patent') ||
        hasWordAnywhere(occupationLabel, 'uppfinning') ||
        hasWordAnywhere(occupationLabel, 'prototyp') ||
        hasWordAnywhere(occupationLabel, 'testning') ||
        hasWordAnywhere(occupationLabel, 'kvalitet') ||
        hasWordAnywhere(occupationLabel, 'kontroll') ||
        hasWordAnywhere(occupationLabel, 'inspektion') ||
        hasWordAnywhere(occupationLabel, 'mätning') ||
        hasWordAnywhere(occupationLabel, 'kalibrering') ||
        hasWordAnywhere(occupationLabel, 'underhåll') ||
        hasWordAnywhere(occupationLabel, 'reparation') ||
        hasWordAnywhere(occupationLabel, 'service') ||
        hasWordAnywhere(occupationLabel, 'felsökning') ||
        hasWordAnywhere(occupationLabel, 'diagnostik') ||
        hasWordAnywhere(occupationLabel, 'troubleshooting') ||
        hasWordAnywhere(occupationLabel, 'felsökare') ||
        hasWordAnywhere(occupationLabel, 'specialist') ||
        hasWordAnywhere(occupationLabel, 'expert') ||
        hasWordAnywhere(occupationLabel, 'konsult') ||
        hasWordAnywhere(occupationLabel, 'projektledare') ||
        hasWordAnywhere(occupationLabel, 'chef') ||
        hasWordAnywhere(occupationLabel, 'manager') ||
        hasWordAnywhere(occupationLabel, 'ledare') ||
        hasWordAnywhere(occupationLabel, 'supervisor') ||
        hasWordAnywhere(occupationLabel, 'koordinator') ||
        hasWordAnywhere(occupationLabel, 'planerare') ||
        hasWordAnywhere(occupationLabel, 'schemaläggare')) {
        return 'Teknik, tillverkning, transport';
    }
        
        // Education, Research, Culture
    if (hasWordAnywhere(occupationLabel, 'lärare') || 
        hasWordAnywhere(occupationLabel, 'pedagog') || 
        hasWordAnywhere(occupationLabel, 'forskare') || 
        hasWordAnywhere(occupationLabel, 'professor') ||
        hasWordAnywhere(occupationLabel, 'docent') ||
        hasWordAnywhere(occupationLabel, 'bibliotekarie') ||
        hasWordAnywhere(occupationLabel, 'arkivarie') ||
        hasWordAnywhere(occupationLabel, 'kultur') ||
        hasWordAnywhere(occupationLabel, 'musik') ||
        hasWordAnywhere(occupationLabel, 'konst') ||
        hasWordAnywhere(occupationLabel, 'dans') ||
        hasWordAnywhere(occupationLabel, 'teater') ||
        hasWordAnywhere(occupationLabel, 'museum') ||
        hasWordAnywhere(occupationLabel, 'utbildning') ||
        hasWordAnywhere(occupationLabel, 'skola') ||
        hasWordAnywhere(occupationLabel, 'universitet') ||
        hasWordAnywhere(occupationLabel, 'högskola') ||
        hasWordAnywhere(occupationLabel, 'rektor') ||
        hasWordAnywhere(occupationLabel, 'adjunkt') ||
        hasWordAnywhere(occupationLabel, 'lektor') ||
        hasWordAnywhere(occupationLabel, 'doktorand') ||
        hasWordAnywhere(occupationLabel, 'vetenskap') ||
        hasWordAnywhere(occupationLabel, 'akademi') ||
        hasWordAnywhere(occupationLabel, 'institut') ||
        hasWordAnywhere(occupationLabel, 'centrum') ||
        hasWordAnywhere(occupationLabel, 'laboratorium') ||
        hasWordAnywhere(occupationLabel, 'laboratorie') ||
        hasWordAnywhere(occupationLabel, 'experiment') ||
        hasWordAnywhere(occupationLabel, 'studie') ||
        hasWordAnywhere(occupationLabel, 'undersökning') ||
        hasWordAnywhere(occupationLabel, 'analys') ||
        hasWordAnywhere(occupationLabel, 'statistik') ||
        hasWordAnywhere(occupationLabel, 'rapport') ||
        hasWordAnywhere(occupationLabel, 'publication') ||
        hasWordAnywhere(occupationLabel, 'artikel') ||
        hasWordAnywhere(occupationLabel, 'bok') ||
        hasWordAnywhere(occupationLabel, 'tidskrift') ||
        hasWordAnywhere(occupationLabel, 'konferens') ||
        hasWordAnywhere(occupationLabel, 'seminarium') ||
        hasWordAnywhere(occupationLabel, 'workshop') ||
        hasWordAnywhere(occupationLabel, 'kurs') ||
        hasWordAnywhere(occupationLabel, 'utbildare') ||
        hasWordAnywhere(occupationLabel, 'instruktör') ||
        hasWordAnywhere(occupationLabel, 'tränare') ||
        hasWordAnywhere(occupationLabel, 'coach') ||
        hasWordAnywhere(occupationLabel, 'mentor') ||
        hasWordAnywhere(occupationLabel, 'handledare') ||
        hasWordAnywhere(occupationLabel, 'supervisor') ||
        hasWordAnywhere(occupationLabel, 'examinator') ||
        hasWordAnywhere(occupationLabel, 'bedömare') ||
        hasWordAnywhere(occupationLabel, 'granskare') ||
        hasWordAnywhere(occupationLabel, 'evaluator') ||
        hasWordAnywhere(occupationLabel, 'utvärderare')) {
        return 'Utbildning, forskning, kultur';
    }
    
    // Security, law enforcement, Military
    if (hasWordAnywhere(occupationLabel, 'polis') || 
        hasWordAnywhere(occupationLabel, 'säkerhet') || 
        hasWordAnywhere(occupationLabel, 'vakt') || 
        hasWordAnywhere(occupationLabel, 'brandman') ||
        hasWordAnywhere(occupationLabel, 'räddning') ||
        hasWordAnywhere(occupationLabel, 'militär') ||
        hasWordAnywhere(occupationLabel, 'soldat') ||
        hasWordAnywhere(occupationLabel, 'officer') ||
        hasWordAnywhere(occupationLabel, 'kriminalvård') ||
        hasWordAnywhere(occupationLabel, 'fängelse') ||
        hasWordAnywhere(occupationLabel, 'domare') ||
        hasWordAnywhere(occupationLabel, 'åklagare') ||
        hasWordAnywhere(occupationLabel, 'kronofogde') ||
        hasWordAnywhere(occupationLabel, 'tull') ||
        hasWordAnywhere(occupationLabel, 'gränsbevakning') ||
        hasPhrase(occupationLabel, 'säkerhetsvakt') ||
        hasPhrase(occupationLabel, 'ordningsvakt') ||
        hasPhrase(occupationLabel, 'brandkår') ||
        hasPhrase(occupationLabel, 'räddningstjänst') ||
        hasPhrase(occupationLabel, 'polisassistent') ||
        hasPhrase(occupationLabel, 'polisinspektör') ||
        hasPhrase(occupationLabel, 'kriminalinspektör')) {
        return 'Säkerhet, rättsväsende, försvar';
    }
    
    // Transport, logistics, Mechanics
    if (hasWordAnywhere(occupationLabel, 'chaufför') || 
        hasWordAnywhere(occupationLabel, 'mekaniker') || 
        hasWordAnywhere(occupationLabel, 'transport') || 
        hasWordAnywhere(occupationLabel, 'logistik') ||
        hasWordAnywhere(occupationLabel, 'lastbil') ||
        hasWordAnywhere(occupationLabel, 'truck') ||
        hasWordAnywhere(occupationLabel, 'buss') ||
        hasWordAnywhere(occupationLabel, 'taxi') ||
        hasWordAnywhere(occupationLabel, 'fordon') ||
        hasWordAnywhere(occupationLabel, 'bil') ||
        hasWordAnywhere(occupationLabel, 'motor') ||
        hasWordAnywhere(occupationLabel, 'diesel') ||
        hasWordAnywhere(occupationLabel, 'garage') ||
        hasWordAnywhere(occupationLabel, 'verkstad') ||
        hasWordAnywhere(occupationLabel, 'lager') ||
        hasWordAnywhere(occupationLabel, 'distribution') ||
        hasWordAnywhere(occupationLabel, 'spedition') ||
        hasWordAnywhere(occupationLabel, 'terminal') ||
        hasPhrase(occupationLabel, 'lastbilschaufför') ||
        hasPhrase(occupationLabel, 'busschaufför') ||
        hasPhrase(occupationLabel, 'taxichaufför') ||
        hasPhrase(occupationLabel, 'yrkeschaufför') ||
        hasPhrase(occupationLabel, 'fordonsmekaniker') ||
        hasPhrase(occupationLabel, 'bilmekaniker') ||
        hasPhrase(occupationLabel, 'lastbilsmekaniker') ||
        hasPhrase(occupationLabel, 'motormekaniker') ||
        hasPhrase(occupationLabel, 'dieseltekniker') ||
        hasPhrase(occupationLabel, 'garage') ||
        hasPhrase(occupationLabel, 'bilverkstad') ||
        hasPhrase(occupationLabel, 'lastbilsverkstad')) {
        return 'Transport, logistik, mekanik';
    }
    
    // Service, Tourism
    if (hasWordAnywhere(occupationLabel, 'servering') || 
        hasWordAnywhere(occupationLabel, 'kock') || 
        hasWordAnywhere(occupationLabel, 'restaurang') || 
        hasWordAnywhere(occupationLabel, 'hotell') ||
        hasWordAnywhere(occupationLabel, 'turism') ||
        hasWordAnywhere(occupationLabel, 'resor') ||
        hasWordAnywhere(occupationLabel, 'guide') ||
        hasWordAnywhere(occupationLabel, 'reception') ||
        hasWord(occupationLabel, 'städ') ||
        hasWordAnywhere(occupationLabel, 'städare') ||
        hasWordAnywhere(occupationLabel, 'tvätt') ||
        hasWordAnywhere(occupationLabel, 'frisör') ||
        hasWordAnywhere(occupationLabel, 'skönhet') ||
        hasWordAnywhere(occupationLabel, 'massage') ||
        hasWordAnywhere(occupationLabel, 'nagel') ||
        hasWordAnywhere(occupationLabel, 'kosmetik') ||
        hasWord(occupationLabel, 'spa') ||
        hasWordAnywhere(occupationLabel, 'wellness') ||
        hasPhrase(occupationLabel, 'kock') ||
        hasPhrase(occupationLabel, 'kök') ||
        hasPhrase(occupationLabel, 'servering') ||
        hasPhrase(occupationLabel, 'bartender') ||
        hasPhrase(occupationLabel, 'hotell') ||
        hasPhrase(occupationLabel, 'receptionist') ||
        hasPhrase(occupationLabel, 'städare') ||
        hasPhrase(occupationLabel, 'frisör') ||
        hasPhrase(occupationLabel, 'skönhetssalong') ||
        hasPhrase(occupationLabel, 'nagelsalong') ||
        hasPhrase(occupationLabel, 'massage') ||
        hasPhrase(occupationLabel, 'spa') ||
        hasPhrase(occupationLabel, 'wellness')) {
        return 'Service, turism, restaurang';
    }
    
    // Agriculture, Forestry, Environment
    if (hasWordAnywhere(occupationLabel, 'jordbruk') || 
        hasWordAnywhere(occupationLabel, 'lantbruk') || 
        hasWordAnywhere(occupationLabel, 'skogsbruk') || 
        hasWordAnywhere(occupationLabel, 'miljö') ||
        hasWordAnywhere(occupationLabel, 'bonde') ||
        hasWordAnywhere(occupationLabel, 'farm') ||
        hasWordAnywhere(occupationLabel, 'djur') ||
        hasWordAnywhere(occupationLabel, 'djurvård') ||
        hasWordAnywhere(occupationLabel, 'veterinär') ||
        hasWordAnywhere(occupationLabel, 'trädgård') ||
        hasWordAnywhere(occupationLabel, 'landskap') ||
        hasWordAnywhere(occupationLabel, 'natur') ||
        hasWordAnywhere(occupationLabel, 'skog') ||
        hasWord(occupationLabel, 'trä') ||
        hasWordAnywhere(occupationLabel, 'fisk') ||
        hasWordAnywhere(occupationLabel, 'fiske') ||
        hasWordAnywhere(occupationLabel, 'häst') ||
        hasWordAnywhere(occupationLabel, 'ridning') ||
        hasPhrase(occupationLabel, 'lantbruk') ||
        hasPhrase(occupationLabel, 'jordbruk') ||
        hasPhrase(occupationLabel, 'skogsbruk') ||
        hasPhrase(occupationLabel, 'djurvård') ||
        hasPhrase(occupationLabel, 'veterinär') ||
        hasPhrase(occupationLabel, 'trädgård') ||
        hasPhrase(occupationLabel, 'landskapsarkitekt') ||
        hasPhrase(occupationLabel, 'miljötekniker') ||
        hasPhrase(occupationLabel, 'naturvård') ||
        hasPhrase(occupationLabel, 'fisk') ||
        hasPhrase(occupationLabel, 'häst') ||
        hasPhrase(occupationLabel, 'ridning')) {
        return 'Jordbruk, skogsbruk, miljö';
    }
    
    // Art, Design, Media
    if (hasWordAnywhere(occupationLabel, 'design') || 
        hasWordAnywhere(occupationLabel, 'konst') || 
        hasWordAnywhere(occupationLabel, 'media') || 
        hasWordAnywhere(occupationLabel, 'foto') ||
        hasWordAnywhere(occupationLabel, 'journalist') ||
        hasWordAnywhere(occupationLabel, 'redaktör') ||
        hasWordAnywhere(occupationLabel, 'grafisk') ||
        hasWord(occupationLabel, 'webb') ||
        hasWordAnywhere(occupationLabel, 'video') ||
        hasWordAnywhere(occupationLabel, 'film') ||
        hasWordAnywhere(occupationLabel, 'reklam') ||
        hasWordAnywhere(occupationLabel, 'skådespelare') ||
        hasWordAnywhere(occupationLabel, 'statist') ||
        hasWord(occupationLabel, 'tv') ||
        hasWordAnywhere(occupationLabel, 'radio') ||
        hasWordAnywhere(occupationLabel, 'podcast') ||
        hasWordAnywhere(occupationLabel, 'social') ||
        hasWord(occupationLabel, 'marknads') ||
        hasWordAnywhere(occupationLabel, 'copywriter') ||
        hasWordAnywhere(occupationLabel, 'illustratör') ||
        hasWordAnywhere(occupationLabel, 'animatör') ||
        hasWordAnywhere(occupationLabel, 'fotograf') ||
        hasWordAnywhere(occupationLabel, 'kameraman') ||
        hasWordAnywhere(occupationLabel, 'regissör') ||
        hasWordAnywhere(occupationLabel, 'producent') ||
        hasWordAnywhere(occupationLabel, 'musiker') ||
        hasWordAnywhere(occupationLabel, 'sångare') ||
        hasWordAnywhere(occupationLabel, 'kompositör') ||
        hasWordAnywhere(occupationLabel, 'musik') ||
        hasWordAnywhere(occupationLabel, 'teater') ||
        hasWordAnywhere(occupationLabel, 'dansare') ||
        hasWordAnywhere(occupationLabel, 'koreograf') ||
        hasWordAnywhere(occupationLabel, 'dans') ||
        hasWordAnywhere(occupationLabel, 'artist') ||
        hasWordAnywhere(occupationLabel, 'musei') ||
        hasWordAnywhere(occupationLabel, 'museum') ||
        hasWordAnywhere(occupationLabel, 'kultur') ||
        hasWordAnywhere(occupationLabel, 'evenemang') ||
        hasWordAnywhere(occupationLabel, 'event') ||
        hasWordAnywhere(occupationLabel, 'produktion') ||
        hasWordAnywhere(occupationLabel, 'redaktion') ||
        hasWordAnywhere(occupationLabel, 'publikation') ||
        hasWordAnywhere(occupationLabel, 'tidskrift') ||
        hasWordAnywhere(occupationLabel, 'magasin') ||
        hasWordAnywhere(occupationLabel, 'blogg') ||
        hasWordAnywhere(occupationLabel, 'content') ||
        hasWordAnywhere(occupationLabel, 'innehåll') ||
        hasWordAnywhere(occupationLabel, 'kreativ') ||
        hasWordAnywhere(occupationLabel, 'kreatör') ||
        hasPhrase(occupationLabel, 'grafisk design') ||
        hasPhrase(occupationLabel, 'webbdesign') ||
        hasPhrase(occupationLabel, 'reklamfilm') ||
        hasPhrase(occupationLabel, 'fotograf') ||
        hasPhrase(occupationLabel, 'journalist') ||
        hasPhrase(occupationLabel, 'redaktör') ||
        hasPhrase(occupationLabel, 'video') ||
        hasPhrase(occupationLabel, 'film') ||
        hasPhrase(occupationLabel, 'tv') ||
        hasPhrase(occupationLabel, 'radio') ||
        hasPhrase(occupationLabel, 'podcast') ||
        hasPhrase(occupationLabel, 'social media') ||
        hasPhrase(occupationLabel, 'marknadsföring') ||
        hasPhrase(occupationLabel, 'reklam') ||
        hasPhrase(occupationLabel, 'copywriter') ||
        hasPhrase(occupationLabel, 'illustratör') ||
        hasPhrase(occupationLabel, 'animatör') ||
        hasPhrase(occupationLabel, 'kameraman') ||
        hasPhrase(occupationLabel, 'regissör') ||
        hasPhrase(occupationLabel, 'producent') ||
        hasPhrase(occupationLabel, 'musiker') ||
        hasPhrase(occupationLabel, 'sångare') ||
        hasPhrase(occupationLabel, 'kompositör') ||
        hasPhrase(occupationLabel, 'teater') ||
        hasPhrase(occupationLabel, 'dansare') ||
        hasPhrase(occupationLabel, 'koreograf') ||
        hasPhrase(occupationLabel, 'artist') ||
        hasPhrase(occupationLabel, 'musei') ||
        hasPhrase(occupationLabel, 'evenemang') ||
        hasPhrase(occupationLabel, 'event') ||
        hasPhrase(occupationLabel, 'produktion') ||
        hasPhrase(occupationLabel, 'redaktion') ||
        hasPhrase(occupationLabel, 'publikation') ||
        hasPhrase(occupationLabel, 'tidskrift') ||
        hasPhrase(occupationLabel, 'magasin') ||
        hasPhrase(occupationLabel, 'blogg') ||
        hasPhrase(occupationLabel, 'content') ||
        hasPhrase(occupationLabel, 'innehåll') ||
        hasPhrase(occupationLabel, 'kreativ') ||
        hasPhrase(occupationLabel, 'kreatör')) {
        return 'Konst, design, media';
    }
    
        // If no category matches, return null
        return null;
    };

/**
 * Checks if a job matches any of the selected branch filters
 * @param job - The job advertisement to check
 * @param selectedBranches - Array of selected branch names to filter by
 * @returns true if job matches any selected branch, false otherwise
 */
export const jobMatchesOccupationField = (job: JobAd, selectedBranches: string[]): boolean => {
    // If no branches are selected, show all jobs
    if (selectedBranches.length === 0) return true;
    
    // Get the branch classification for this job
    const jobBranch = getJobBranch(job);
    
    // If job has no identifiable branch, exclude it from branch filtering
    // This prevents uncategorized jobs from appearing in all filters
    if (!jobBranch) {
        return false;
    }
    
    // Check if the job's branch is in the selected branches
    const matches = selectedBranches.includes(jobBranch);
    return matches;
};
