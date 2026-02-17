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

import { useState } from "react";
import jobsData from "../../data/jobs.json";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SearchCheckboxes from "../components/SearchCheckboxes";

export default function Jobs() {

  // Initialize state with JSON data
  const [jobs] = useState(jobsData);
  const [selectedCodingLanguages, setSelectedCodingLanguages] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);


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
  ];

  const countries = [
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
  const [filters, setFilters] = useState({
    experience: [] as string[],
    locations: [] as string[],
    workMode: [] as string[],
    languages: [] as string[],
    datePosted: 'most-recent'
  });

  // Handle checkbox changes
  const handleCheckboxChange = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      const array = updated[category] as string[];

      if (array.includes(value)) {
        (updated[category] as string[]) = array.filter(item => item !== value);
      } else {
        (updated[category] as string[]) = [...array, value];
      }

      return updated;
    });
  };

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter(job => {
    // Add your filtering logic here based on your job data structure
    // For now, returning all jobs - you'll need to match against job properties

    // Example filtering (adjust based on your actual job data structure):
    // if (filters.experience.length > 0 && !filters.experience.includes(job.experience_level)) {
    //   return false;
    // }

    return true;
  });

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

  const extractLanguages = (jobQualifications: string[]) => {
    let descriptionLanguages: string[] = [];

    // const punctuationRegex = /[\p{P}]/gu;

    for (const sentence of jobQualifications) {
      // let result = sentence.replace(punctuationRegex, "");
      let result = sentence.replace(/[.,]/g, " ");
      console.log(result)

      const words: string[] = result.split(" ");
      console.log(words)

      words.forEach((word) => {
        CODING_LANGUAGES.forEach((language) => {
          // word.localeCompare(language, undefined, { sensitivity: 'base' })
          if (word === language) {
            if (!descriptionLanguages.includes(word)) {
              descriptionLanguages.push(word);
            }
          }
        });
      });
    }
    console.log(descriptionLanguages);

    return descriptionLanguages;
  }


  return (

    <div className="max-w-7xl mx-auto p-6">
      {/* Contains everything */}
      <div className="flex flex-col gap-5">

        {/* Filters & Job Card List */}
        <div className="flex flex-row gap-5">

          {/* Filter Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-[#313749] rounded-lg shadow p-6 sticky top-6">
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
                      options={countries}
                      selectedItems={selectedCountry}
                      onSelectionChange={setSelectedCountry}
                      placeholder="Search for a location..."
                      maxSuggestions={5}
                    />

                    {/* Display selected languages */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h2 className="font-semibold mb-2">Selected Languages:</h2>
                      <p className="text-sm text-gray-700">
                        {selectedCountry.length > 0
                          ? selectedCountry.join(', ')
                          : 'None selected'}
                      </p>
                    </div>
                  </div>


                  <FilterCheckbox category="locations" value="nyc" label="New York City" />
                  <FilterCheckbox category="locations" value="la" label="Los Angeles" />
                  <FilterCheckbox category="locations" value="sf" label="San Francisco" />
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
                  <option value="week">Week</option>
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
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h2 className="font-semibold mb-2">Selected Languages:</h2>
                      <p className="text-sm text-gray-700">
                        {selectedCodingLanguages.length > 0
                          ? selectedCodingLanguages.join(', ')
                          : 'None selected'}
                      </p>
                    </div>
                  </div>
                  <FilterCheckbox category="languages" value="python" label="Python" />
                  <FilterCheckbox category="languages" value="cpp" label="C++" />
                  <FilterCheckbox category="languages" value="java" label="Java" />
                  <FilterCheckbox category="languages" value="html" label="HTML" />
                  <FilterCheckbox category="languages" value="css" label="CSS" />
                  <FilterCheckbox category="languages" value="other" label="....." />
                </div>
              </section>
            </div>
          </aside>

          {/* Job Card List */}
          <main className="flex-1">
            <div className="rounded-lg shadow p-6">
              <h1 className="text-3xl font-bold mb-6">
                Job Listings ({filteredJobs.length})
              </h1>

              <div className="grid gap-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.job_id}
                    className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
                  >
                    <h2 className="text-xl font-semibold">{job.job_title}</h2>
                    <p className="font-medium text-gray-700">{job.employer_name}</p>
                    <p className="text-gray-500">
                      {job.job_city}, {job.job_country}
                    </p>
                    <p> {job.job_highlights.Qualifications}</p>
                    <p> {extractLanguages(job.job_highlights.Qualifications)}</p>


                  </div>
                ))}
              </div>
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
