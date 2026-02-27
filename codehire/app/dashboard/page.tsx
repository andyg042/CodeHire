// "use client";

// import { useEffect, useState } from "react";

// export default function Jobs() {
//     // State to hold job listings
//     // Using any[] for simplicity; in a real app, define a proper type/interface
//     const [jobs, setJobs] = useState<any[]>([]);

//     useEffect(() => {
//         fetch("/api/jobs/search?query=machine learning engineer")
//         .then(res => res.json())
//         .then(data => setJobs(data.data));
//     }, []);

//      return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

//       <div className="grid gap-4">
//         {jobs.map((job) => (
//           <div
//             key={job.job_id}
//             className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
//           >
//             <h2 className="text-xl font-semibold">{job.job_title}</h2>
//             <p className="font-medium text-gray-700">
//               {job.employer_name}
//             </p>
//             <p className="text-gray-500">
//               {job.job_city}, {job.job_country}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

// }
"use client";

import { useState, useEffect, useCallback, Component } from "react";
import jobsData from "../../data/jobs.json";
// import { auth } from '@/auth';
// import { redirect } from 'next/navigation';
import SearchCheckboxes from "../components/SearchCheckboxes";
import { fetchJobs, Job, JobFilters } from "@/services/jobsServices";
import { Changa_One, Redressed } from "next/font/google";




const CODING_LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'React',
  'HTML',
  'CSS',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'PHP',
  'SQL',
  'R',
  'Scala',
  'Matlab',
  'SQL',
  'PyTorch',
  'TensorFlow',
  'Pandas',
  'NumPy',
];

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Mexico',
];

// Filter state
// const [filters, setFilters] = useState({
//   experience: [] as string[],
//   locations: [] as string[],
//   workMode: [] as string[],
//   languages: [] as string[],
//   datePosted: 'most-recent'
// });

const DEFAULT_FILTERS: JobFilters = {
  query: " ",
  experience: [],
  employmentType: [],
  locations: [],
  workMode: [],
  languages: [],
  country: [],
  datePosted: "all",
};

export default function Jobs() {

  // Initialize state with JSON data
  // const [jobs] = useState(jobsData);



  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCodingLanguages, setSelectedCodingLanguages] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS);


  useEffect(() => {
    fetch("/api/jobs/search?query=machine learning engineer")
      .then(res => res.json())
      .then(data => setJobs(data.data));
  }, []);

  // how set filter runs:
  // 1. updates the filters state value
  // 2. Triggers a re-render of the Component
  // 3. after the re-render, Reach checks if anything in the dependency array change?
  // 4. it sees the filters object is different from the last render:
  // 5. so it runs the useEffect Body again 

  //Synch Searchcheckboxes selections into th main filters object --
  useEffect(() => {
    setFilters((prev) => ({ ...prev, languages: selectedCodingLanguages }));
  }, [selectedCodingLanguages]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, country: selectedCountry }));

  }, [selectedCountry]
  );

  // ─── Fetch jobs whenever filters change ───
  // When you switch to a real API, only jobsService.ts needs to change — not this.
  useEffect(() => {
    setIsLoading(true);
    fetchJobs(filters) //run this useEffect whenever filters changes - compares the value in [filters] between the current render and the previous render -> checks after every render whetehr it needs to run again 
      .then(setJobs) //after fetchJobs is run, then the jobs state updates
      .finally(() => setIsLoading(false));
  }, [filters]);

  // Handle checkbox changes
  // const handleCheckboxChange = (category: keyof typeof filters, value: string) => {
  //   setFilters(prev => {
  //     const updated = { ...prev };
  //     const array = updated[category] as string[];

  //     if (array.includes(value)) {
  //       (updated[category] as string[]) = array.filter(item => item !== value);
  //     } else {
  //       (updated[category] as string[]) = [...array, value];
  //     }

  //     return updated;
  //   });
  // };

  // ─── Handlers ───
  const handleCheckboxChange = useCallback(
    // function being passed into useCallback
    (category: keyof JobFilters, value: string) => {
      //React State setter - instad of passing a value directly - pass in a function with (prev) - react will call this function and hand it the current state as prev
      setFilters((prev) => {
        const current = prev[category] as string[]; //uses braket notation to look up propery of prev - equivelant to prev.experience or prev.employmentType --> then treat result as a string array
        const updated = current.includes(value) // checking whether value already exists in the array
          ? current.filter((item) => item !== value) //if it already contains he value --> create a new array with the value removed - .filter() loops over every time andkeeps items where the condition is true, keep everything except the mating value
          : [...current, value]; //if item not in the array, create a new array with all the existing items in spread [...current] plus the new value appended at the end
        return { ...prev, [category]: updated }; //...prev - keeps all the existing filters so nothing else changes, [category]: updated --> aka experience:updated
        //...prev creates a BRAND NEW object every time - so that it compare the value to the previous state to see if anything changed
      });
    },
    []
  );

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSelectedCodingLanguages([]);
    setSelectedCountry([]);
  };

  const FilterCheckbox = ({ category, value, label }: {
    category: keyof typeof filters,
    value: string,
    label: string
  }) => (
    <label className="flex items-center gap-2 cursor-pointer hover:text-gray-400 transition-colors">
      <input
        type="checkbox"
        checked={(filters[category] as string[]).includes(value)}
        onChange={() => handleCheckboxChange(category, value)}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <span className="text-sm">{label}</span>
    </label>
  );

  //TODO: This is different - as badges using [...found].map
  //extract the coding languages and libraries from job description and display them in pill-shaped badges
  const extractLanguages = (jobQualifications: string[]) => {
    // let descriptionLanguages: string[] = [];
    const found = new Set<string>();


    for (const sentence of jobQualifications) {
      let result = sentence.replace(/[.,]/g, " "); //remove commas and periods
      const words: string[] = result.split(" ");

      //search word list for coding languages
      words.forEach((word) => {
        const match = CODING_LANGUAGES.find(
          (lang) => word.toUpperCase() === lang.toUpperCase());
        if (match) found.add(match);
      })

    }

    return (
      <div className="flex flex-wrap gap-2">
        {[...found].map((lang: string) => (
          <span
            key={lang}
            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {lang}
          </span>
        ))}
      </div>

    )
  }

  const hasActiveFilters =
    filters.experience.length > 0 ||
    filters.employmentType.length > 0 ||
    filters.locations.length > 0 ||
    filters.workMode.length > 0 ||
    filters.languages.length > 0 ||
    filters.country.length > 0 ||
    filters.datePosted !== "all";


  return (

    <div className="max-w-7xl mx-auto p-6">
      {/* Contains everything */}
      <div className="flex flex-col gap-5">

        {/* Filters & Job Card List */}
        <div className="flex flex-row gap-5">

          {/* Filter Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-[#313749] rounded-lg shadow p-6 sticky top-6">

              <input
                type="text"
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                placeholder="Search job titles..."
                className="w-full bg-[#313749] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <h2 className="text-2xl font-bold mb-6">Filters</h2>

              {/* Experience Level */}
              <section className="mb-6">
                <h3 className="text-lime-600 font-bold text-sm mb-3 uppercase tracking-wide">
                  Experience
                </h3>
                <div className="space-y-2.5">
                  <FilterCheckbox category="experience" value="entry" label="Entry Level" />
                  <FilterCheckbox category="experience" value="mid" label="Mid Level" />
                  <FilterCheckbox category="experience" value="senior" label="Senior Level" />
                  <FilterCheckbox category="experience" value="lead" label="Lead/Principal" />
                </div>
              </section>

              {/* Employment Type */}
              <section className="mb-6">
                <h3 className="text-[#ede769] font-bold text-sm mb-3 uppercase tracking-wide">
                  Employment Type
                </h3>
                <div className="space-y-2.5">
                  <FilterCheckbox category="employmentType" value="fulltime" label="Full-time" />
                  <FilterCheckbox category="employmentType" value="parttime" label="Part-time" />
                  <FilterCheckbox category="employmentType" value="contractor" label="Contractor" />
                  <FilterCheckbox category="employmentType" value="internship" label="Internship" />
                </div>
              </section>

              {/* Locations - make into a search bar then have check boxes with locations */}
              <section className="mb-6">
                <h3 className="text-yellow-600 font-bold text-sm mb-3 uppercase tracking-wide">
                  Locations
                </h3>
                {/* Search bar div */}
                <div className="space-y-2.5">

                </div>

                <div className="space-y-2.5">

                  {/* <input
                    type="text"
                    name="locationQuery"
                    value=""
                    className=" text-sm w-full bg-[#626C88] space-y-2.5 shadow border border-gray-300 rounded px-3 py-2  ">
                  </input> */}


                  <div className="max-w-2xl mx-auto">
                    <SearchCheckboxes
                      options={COUNTRIES}
                      selectedItems={selectedCountry}
                      onSelectionChange={setSelectedCountry}
                      placeholder="Search for a location..."
                    // maxSuggestions={5}
                    />

                  </div>
                  {/* <FilterCheckbox category="locations" value="nyc" label="New York City" />
                  <FilterCheckbox category="locations" value="la" label="Los Angeles" />
                  <FilterCheckbox category="locations" value="sf" label="San Francisco" /> */}
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="space-y-2.5">
                  <FilterCheckbox category="workMode" value="remote" label="Remote" />
                  <FilterCheckbox category="workMode" value="hybrid" label="Hybrid" />
                  <FilterCheckbox category="workMode" value="in-person" label="In Person" />
                </div>
              </section>

              {/* Date Posted */}
              <section className="mb-6">
                <h3 className="text-cyan-600 font-bold text-sm mb-3 uppercase tracking-wide">
                  Date Posted
                </h3>
                <select
                  value={filters.datePosted}
                  onChange={(e) => setFilters(prev => ({ ...prev, datePosted: e.target.value }))}
                  className="w-full bg-[#313749] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="most-recent">Most Recent</option>
                  <option value="3-days">3 Days</option>
                  <option value="week">Past Week</option>
                  <option value="past-month"> Past month</option>
                  <option value="all">all</option>

                </select>
              </section>

              {/* Languages */}
              <section>
                <h3 className="text-pink-600 font-bold text-sm mb-3 uppercase tracking-wide">
                  Languages
                </h3>
                <div className="space-y-2.5">
                  {/* <input
                    type="text"
                    name="locationQuery"
                    value=""
                    className=" text-sm w-full bg-[#626C88] space-y-2.5 shadow border border-gray-300 rounded px-3 py-2 "
                    placeholder="Search Languages">
                  </input> */}

                  {/* <SearchCheckboxes
                    options={CODING_LANGUAGES}
                    selectedItems={selectedCodingLanguages}
                    onSelectionChange={setSelectedCodingLanguages}
                    allowCustom={false}

                  /> */}

                  <div className="max-w-2xl mx-auto">

                    <SearchCheckboxes
                      options={CODING_LANGUAGES}
                      selectedItems={selectedCodingLanguages}
                      onSelectionChange={setSelectedCodingLanguages}
                      placeholder="Search for a language..."
                      maxSuggestions={5}
                    />

                    {/* Display selected languages */}

                  </div>
                </div>
              </section>
            </div>
          </aside>

          {/* Job Card List */}
          <main className="flex-1">
            <div className="rounded-lg shadow p-6">
              <h1 className="text-3xl font-bold mb-6">
                {isLoading ? "Loading..." : `Job Listings (${jobs.length})`}
              </h1>


              {isLoading ? (
                <div className="text-gray-400 text-center py-12">Fetching jobs...</div>
              ) : jobs.length === 0 ? (
                <div className="text-gray-400 text-center py-12">
                  No jobs match your filters. Try adjusting or clearing them.
                </div>
              ) : (
                <div className="grid gap-4">
                  {jobs.map((job) => (
                    //whole job card
                    <div
                      key={job.job_id}
                      className="border rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-row gap-3.5"
                    >
                      <div>
                        {job.employer_logo && (
                          <img
                            src={job.employer_logo}
                            alt={`${job.employer_name} logo`}
                            className="h-12 w-12 object-contain mb-2 border rounded-md"
                          />
                        )}
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">{job.job_title}</h2>
                        <p className="font-medium text-gray-700">{job.employer_name}</p>
                        <p className="text-gray-500">
                          {job.job_city}, {job.job_country}
                        </p>
                        {/* extractLanguages expects a sting [], so provide fall back empty array if undefined */}
                        <div className="mt-2">{extractLanguages(job.job_highlights?.Qualifications ?? [])}</div>
                        <div className="mt-2"> {((job.job_min_salary !== null) && (job.job_max_salary !== null)) ? (<div>${job.job_min_salary} - ${job.job_max_salary}</div>) : ("")} </div>
                        <div className="mt-2  text-gray-700"> {job.job_posted_at} </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div >
    </div >
  );


  //outer div (red)
  //   <div className="max-w-4xl mx-auto p-6 border-amber-600">
  //     {/* contains everything */}
  //     <div className="flex flex-col gap-5">

  //       {/* //search bar div - ORANGE */}
  //       <div className="border-yellow-600 border-2 bg-red-500 h-1/2">
  //         <div><p>Search Bar </p></div>
  //       </div>

  //       {/* Filters & Job Card List - ORANGE */}
  //       <div className=" flex flex-row gap-3 border-yellow-600 border-2 bg-orange-500 h-1/2">

  //         {/* Filter - GREEN */}
  //         <div className="flex flex-col gap-5 w-[25%] border-yellow-600 border-2 bg-green-500 h-1/2">
  //           <div className="border-yellow-600 bg-blue-400">
  //             <p> FILTERS</p>

  //           </div>
  //           <div className="border-yellow-600 bg-blue-400">
  //             <p> Experience </p>


  //           </div>
  //           <div className="border-yellow-600 bg-blue-400">
  //             <p> Location </p>

  //           </div>
  //         </div>

  //         {/* Job Card List - GREEN */}
  //         <div className="border-yellow-600 border-2 bg-green-500 h-1/2">
  //           <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

  //           <div className="grid gap-4">
  //             {jobs.map((job) => (
  //               <div
  //                 key={job.job_id}
  //                 className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
  //               >
  //                 <h2 className="text-xl font-semibold">{job.job_title}</h2>
  //                 <p className="font-medium text-gray-700">{job.employer_name}</p>
  //                 <p className="text-gray-500">
  //                   {job.job_city}, {job.job_country}
  //                 </p>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>




  //     </div >
  //   </div >
  // );
}
