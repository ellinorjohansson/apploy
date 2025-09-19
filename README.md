> [!NOTE]  
> This project is a school assignment developed as part of a group work.
> It was created for educational purposes only and is not intended for production use.


# AF / Jobtech case

This project is a group assignment where we created a custom version of "Platsbanken" using open data from Arbetsförmedlingen.  
The goal was to explore real-world job advertisement data and present it in a user-friendly application while practicing React concepts, data fetching, and visualization.
Using Arbetsförmedlingens design system but with different color.

[Link to live version]()

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Acknowledgements](#acknowledgements)
- [Authors](#authors)

## Features

- **Home page** – Displays a line chart showing the 100 most recent job postings within the last 24 hours across Sweden's counties.  
- **Job Overview Page** – Browse available jobs with search and filter options.  
- **Saved Jobs List** – Save interesting jobs locally (using `localStorage`) so they remain after page reload.  
- **Applied Jobs Tracking** – Mark saved jobs as "applied" for easy follow-up.  
- **Job Detail Page** – View detailed information about a specific job.  

## Tech Stack

- ![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![ESLint](https://img.shields.io/badge/ESLint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white)
- ![Prettier](https://img.shields.io/badge/Prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=white)

## Installation

Install fed24d-case-af-jobtech-grupp12 locally with npm

```bash
# Clone this repository
$ git clone https://github.com/Medieinstitutet/fed24d-case-af-jobtech-grupp12

# Go into the repository
$ cd fed24d-case-af-jobtech-grupp12

# Install dependencies
$ npm install

# Run app
$ npm run dev
```

## Environment Variables

This application uses environment variables for API configuration. Create a `.env` file in the project root with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=https://jobsearch.api.jobtechdev.se
VITE_TAXONOMY_API_BASE_URL=https://taxonomy.api.jobtechdev.se/v1/taxonomy
```

**Note for reviewers:** The application will work without the `.env` file as it uses fallback values, but for optimal configuration, create the `.env` file as shown above.

## Acknowledgements

- Arbetsförmedlingen and [JobTech Development](https://jobtechdev.se) for providing open data.  

## Authors

- [@EmelieSonjaBoss](https://github.com/EmelieSonjaBoss)
- [@LcNyaker](https://github.com/LcNyaker)
- [@ellinorjohansson](https://www.github.com/ellinorjohansson)




# Assignment:


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/6VsM7MHT)
# Skapa en egen Platsbanken för ert drömscenario 

Dokumentation om Arbetsförmedlingens öppna data finns på https://jobtechdev.se. All öppna data från arbetsförmedlingen och andra offentliga organisationen går även att hitta direkt på dataportal.se. 
I detta dokument ges två förslag på användningsfall som vi tror är lämpliga för studenter som vill utveckla en applikation på riktig data. All data som är öppna data får vem som helst använda utan att fråga myndigheten om lov, så ingen är begränsad till de exempel vi ger.

Läs först igenom kom-igång hjälpen 

-  [Övergripande dokumentation API:etJobSearch](https://jobtechdev.se/sv/components/jobsearch)
-  [Kom-igång guide](https://gitlab.com/arbetsformedlingen/education/education-api/-/blob/main/GETTING_STARTED.md)

## Prova att utforska datan med vår interaktiva tjänst 

Görs genom att öppna Swagger-sidan för API:et (för att enkelt testa olika endpoints i API:et och läsa dokumentation för respektive endpoint): Search job ads (jobtechdev.se) 

## Uppgift 

Använd endpoint https://jobsearch.api.jobtechdev.se/ för att använda/söka bland befintliga annonser. 
Det går även bra att använda historiska annonser om ni vill jämföra aktuella annonser med hur det har sett ut tidigare. Detta api finns här: Historical job ads (jobtechdev.se)

Om möjligt, använd en grafisk presentation av era resultat genom t.ex. stapeldiagram eller linjegrafer.

**Observera**
Er slutprodukt ska ej innehålla Arbetsförmedlingens logga eller färger. Anpassa gärna efter eget tycke och smak så att ni har en färgpalett och en god tanke bakom. 

## Betygskriterier 

### Need-to-have (G) 
- Ni har hämtat data på ett strukturerat sätt med hjälp av antingen fetch eller axios. 
- Ni har skapat en tjänst som ni använder för att hämta data. 
- Ni använder react-koncept vi har pratat om för att göra datan tillgänglig (context, state, routing et.c.). 
- Ni använder den syntax, namngivningsstandard samt skrivsätt som vi har lärt er.  
- Ni använder designsystemet för presentation. 

### Nice-to-have (Extra bonus) 
- Styled components (som drar nytta av designsystemet) 
- Grafisk presentation av datat 
- Användning av custom hook där det finns möjlighet
