"use client";

import { useEffect, useState } from "react";

export default function Jobs() {
    // State to hold job listings
    // Using any[] for simplicity; in a real app, define a proper type/interface
    const [jobs, setJobs] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/jobs/search?query=machine learning engineer")
        .then(res => res.json())
        .then(data => setJobs(data.data));
    }, []);

     return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div
            key={job.job_id}
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{job.job_title}</h2>
            <p className="font-medium text-gray-700">
              {job.employer_name}
            </p>
            <p className="text-gray-500">
              {job.job_city}, {job.job_country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

}
