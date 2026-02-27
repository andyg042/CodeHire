// 
// RIGHT NOW: filters against static JSON locally
// LATER: swap the body of fetchJobs() to call your real API — the rest of your app stays the same

import jobsData from "../data/jobs.json"

export interface JobFilters {
    experience: string[];
    employmentType: string[];
    locations: string[];
    workMode: string[];
    languages: string[];
    datePosted: string;
    country: string[];
}

export interface Job {
    job_id: string;
    job_title: string;
    employer_name: string;
    employer_logo: string | null;
    job_employment_types: string[];
    job_city: string;
    job_state: string;
    job_country: string;
    job_is_remote: boolean;
    job_employment_type: string;
    job_min_salary: number | null;
    job_max_salary: number | null;
    job_posted_at: string | null;
    job_posted_at_datetime_utc: string | null;
    job_highlights: {
        Qualifications?: string[];
        Responsibilities?: string[];
        Benefits?: string[];
    };
    [key: string]: unknown;
}

//------------------------
//EXPERIENCE LEVEL MAPPING
//our json does not have a direct "experience_level" field - so get from the job title
//Does API return structured experiece data???
//------------------------
const inferExperienceLevel = (title: string): string => {
    const t = title.toLowerCase();
    if (t.includes("senior") || t.includes("sr")) return "senior";
    if (t.includes("lead") || t.includes("director")) return "lead";
    if (t.includes("junior") || t.includes("jr")) return "entry";
    return "mid";
}



//------------------------
//WORK MODE MAPPING
//------------------------
const inferWorkMode = (job: Job): string => {
    if (job.job_is_remote) return "remote";
    const t = job.job_title?.toLocaleLowerCase() ?? "";
    const desc = (job.job_description as string)
    if (job.job_is_remote) return "remote"
    if (t.includes("hybrid") || t.includes("hybrid")) return "hybrid";
    return ("in-person")
}

//------------------------
//DATE FITLER HELPER
//------------------------

const isWithinDateRange = (dateUTC: string | null, range: string): boolean => {
    if (range == "all" || !dateUTC) return true;

    const posted = new Date(dateUTC).getTime();
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    const rangeMap: Record<string, number> = {
        "most-recent": 1,
        "3-days": 3,
        "week": 7,
        "month": 30,
    };

    const days = rangeMap[range];
    if (!days) return true;
    return now - posted <= days * dayMs;
}

// ─────────────────────────────────────────────
// LANGUAGE EXTRACTION 
// ─────────────────────────────────────────────
const CODING_LANGUAGES = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Ruby",
    "React", "HTML", "CSS", "Go", "Rust", "Swift", "Kotlin", "PHP",
    "SQL", "R", "Scala", "Matlab", "PyTorch", "TensorFlow", "Pandas", "NumPy",
];

const extractLanguagesFromJob = (qualifications: string[] = []): string[] => {
    const found = new Set<string>();
    for (const sentence of qualifications) {
        const words = sentence.replace(/[.,]/g, " ").split(" ");
        for (const word of words) {
            const match = CODING_LANGUAGES.find(
                (lang) => word.toUpperCase() === lang.toUpperCase()
            );
            if (match) found.add(match);
        }
    }
    return [...found];
};

//------------------------
//EMPLOYMENT TYPE  MAPPING
//------------------------
const findEmploymentTypes = (job: Job): string[] => {
    const found = new Set<string>();
    for (const item of job.job_employment_types) {
        //add matches with the "value" in checkboxes
        if (item.includes("FULLTIME")) found.add("fulltime");
        if (item.includes("PARTTIME")) found.add("parttime");
        if (item.includes("CONTRACTOR")) found.add("contractor");
        if (item.includes("INTERNSHIP")) found.add("internship");
    }
    return [...found]


}



export async function fetchJobs(filters: JobFilters): Promise<Job[]> {
    //simulate async behavior so swappint ot a real fetch() later requires no refactoring
    await Promise.resolve();

    let results = jobsData as Job[];

    //Experience filter
    if (filters.experience.length > 0) {
        console.log(filters.experience)

        results = results.filter((job) =>
            filters.experience.includes(inferExperienceLevel(job.job_title))
        )
    }

    // //Country filter 
    // if (filters.country.length > 0){
    //     results = results.filter((job) =>
    //     filters.country(
    //         (c) => job.job_country?.toLowerCase() === c.toLocaleLowerCase() ||
    //             c.toLowerCase() ==="united states" && job.job_country === "US"
    //     )
    //     );

    // }

    // --- Work mode filter ---
    if (filters.workMode.length > 0) {
        results = results.filter((job) =>
            filters.workMode.includes(inferWorkMode(job))
        );
    }

    // --- Language filter ---
    if (filters.languages.length > 0) {
        console.log(filters.languages)

        results = results.filter((job) => {
            const jobLangs = extractLanguagesFromJob(job.job_highlights?.Qualifications);
            return filters.languages.some((lang) =>
                jobLangs.map((l) => l.toUpperCase()).includes(lang.toUpperCase())
            );
        });
    }

    //--- Employment Type filter ---
    if (filters.employmentType.length > 0) {
        console.log(filters.employmentType)
        results = results.filter((job) => {
            const employmentTypes = findEmploymentTypes(job);
            return filters.employmentType.some((type) =>
                employmentTypes.includes(type)
            );
        })
    }

    // --- Date posted filter ---
    if (filters.datePosted && filters.datePosted !== "all") {
        results = results.filter((job) =>
            isWithinDateRange(job.job_posted_at_datetime_utc, filters.datePosted)
        );
    }

    return results;
    // returns the filtered job array

}

