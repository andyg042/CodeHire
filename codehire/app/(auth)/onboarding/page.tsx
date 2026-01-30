'use client';
import React, { useState } from 'react';
import AutocompleteInput from '../../components/AutocompleteInput';
import BadgeSelector from '../../components/BadgeSelector';




// Types for form data
interface OnboardingFormData {
    name: string;
    major: string;
    graduationYear: number;
    graduationMonth: string;
    jobTitles: [];
    experienceLevel: string;
    jobPreferences: {
        fullTime: boolean;
        partTime: boolean;
        contract: boolean;
        internship: boolean;
        coOp: boolean;

    };
    workLocations: {
        remote: boolean;
        hybrid: boolean;
        inPerson: boolean;
    };
    companyStages: {
        startup: boolean;
        earlyStage: boolean;
        publicTech: boolean;
        faang: boolean;
    };
    pay: number;
    payPeriod: {
        hourly: boolean;
        yearly: boolean;
    };
    skills: string[];
    location: string;
    resume?: File | null;
}

// Initial form state
const initialFormData: OnboardingFormData = {
    name: '',
    major: '',
    graduationMonth: '',
    graduationYear: 0,
    jobTitles: [],
    experienceLevel: '',
    jobPreferences: {
        fullTime: false,
        partTime: false,
        contract: false,
        internship: false,
        coOp: false,
    },
    workLocations: {
        remote: false,
        hybrid: false,
        inPerson: false,
    },
    companyStages: {
        startup: false,
        earlyStage: false,
        publicTech: false,
        faang: false,
    },
    pay: 0,
    payPeriod: {
        hourly: false,
        yearly: false,
    },
    skills: [],
    location: '',
    resume: null,
};

export default function OnboardingPage() {
    const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
    const [currentStep, setCurrentStep] = useState(1);
    const [skillInput, setSkillInput] = useState('');

    const [selectedFruit, setSelectedFruit] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [selectedCodingLanguages, setSelectedCodingLanguages] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);


    const majors = [
        'Artificial Intelligence (AI) & Machine Learning',
        'Computer Engineering',
        'Computer Information Systems (CIS)',
        'Computer Science (CS)',
        'Cybersecurity/Information Security',
        'Data Science/Analytics',
        'Digital Forensics',
        'Game Development',
        'Health Information Technology',
        'Human-Computer Interaction (HCI)',
        'Information Technology (IT)',
        'Instructional Technology',
        'Management Information Systems (MIS)',
        'Network Engineering/Cloud Computing',
        'Robotics Technology/Mechatronics',
        'Software Engineering/Development',
        'Web Development/Frontend/Backend']

    const JOB_TITLES = [
        'AI/Machine Learning Engineer',
        'Business Systems Analyst',
        'Chief Technology Officer (CTO)/Chief Information Officer (CIO)',
        'Cloud Engineer/Architect',
        'Computer Systems Analyst',
        'Data Analyst/Engineer',
        'Data Scientist',
        'Database Administrator (DBA)',
        'DevOps Engineer/SRE',
        'Information Security Analyst/Cybersecurity Specialist',
        'IT Manager/Director',
        'Network Engineer/Architect',
        'Product Manager',
        'QA Engineer',
        'Software Engineer/Developer',
        'Technical Support Specialist/Engineer',
        'UX/UI Designer',
        'Web Developer']

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

    const INDUSTRIES = [
        'Aerospace',
        'Arts & Entertainment',
        'Construction',
        'Defense',
        'Education',
        'Energy',
        'Finance & Insurance',
        'Government/Public Administration',
        'Healthcare',
        'Hospitality & Tourism',
        'Information Technology',
        'Manufacturing',
        'Media & Communication',
        'Professional & Business Services',
        'Real Estate',
        'Retail',
        'Transportation & Logistics',
    ]

    // Update text input fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update select fields
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update job preferences checkboxes
    const handleJobPreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            jobPreferences: {
                ...prev.jobPreferences,
                [name]: checked,
            },
        }));
    };

    // Update work locations preferences checkboxes
    const handleWorkLocationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            workLocations: {
                ...prev.workLocations,
                [name]: checked,
            },
        }));
    };

    // Update job preferences checkboxes
    const handleCompanyStagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            companyStages: {
                ...prev.companyStages,
                [name]: checked,
            },
        }));
    };


    // Add skill to array
    const handleAddSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
            setSkillInput('');
        }
    };

    // Remove skill from array
    const handleRemoveSkill = (skillToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove),
        }));
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            resume: file,
        }));
    };

    // Form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData, { selectedMajor, selectedCountry });
        // Add your submission logic here (API call, etc.)
        alert('Onboarding form submitted successfully!');
        alert(`Fruit: ${selectedFruit}\nCountry: ${selectedCountry}`);
    };

    // Navigation
    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));


    return (
        // TODO: implement a container with padding or margins in css to apply to all pages
        <div>
            <div style={{ padding: "1rem 1rem" }}>

                <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-[#313749] rounded-lg shadow-md p-8 text-white">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-white mb-2">
                                    Welcome to CodeHire
                                </h1>
                                <p className="text-2xl font-bold text-white pt-5">
                                    Let's get you set up with your profile.
                                </p>
                                <p className="text-white">
                                    Tell us what you are looking for, and we’ll tailor your job matches to fit your goals and skills.
                                </p>
                            </div>

                            {/* Progress indicator */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    {[1, 2, 3].map(step => (
                                        <div
                                            key={step}
                                            className={`flex-1 h-2 rounded ${step <= currentStep ? 'bg-[#42e0ff]' : 'bg-gray-200'
                                                } ${step !== 3 ? 'mr-2' : ''}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm  text-white">
                                    STEP {currentStep} of 3
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Basic Information */}
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-white mb-4">
                                            BASIC INFO
                                        </h2>

                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        {/* <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-white2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="john@example.com"
                                            />
                                        </div> */}

                                        {/* <div>
                                            <label htmlFor="major" className="block text-sm font-medium text-white mb-2">
                                                Major *
                                            </label>
                                            <input
                                                type="text"
                                                id="major"
                                                name="major"
                                                value={formData.major}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder=""
                                            />
                                        </div> */}


                                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                            Major
                                        </label>
                                        <AutocompleteInput
                                            label="Major"
                                            options={majors}
                                            value={selectedMajor}
                                            onChange={setSelectedMajor}
                                            placeholder="e.g., Computer Science, Software Engineering..."
                                            maxSuggestions={5}
                                        />

                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                Expected Graduation Date *
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <select
                                                        id="graduationMonth"
                                                        name="graduationMonth"
                                                        value={formData.graduationMonth}
                                                        onChange={handleSelectChange}
                                                        required
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="">Month</option>
                                                        <option value="01">January</option>
                                                        <option value="02">February</option>
                                                        <option value="03">March</option>
                                                        <option value="04">April</option>
                                                        <option value="05">May</option>
                                                        <option value="06">June</option>
                                                        <option value="07">July</option>
                                                        <option value="08">August</option>
                                                        <option value="09">September</option>
                                                        <option value="10">October</option>
                                                        <option value="11">November</option>
                                                        <option value="12">December</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <select
                                                        id="graduationYear"
                                                        name="graduationYear"
                                                        value={formData.graduationYear || ''}
                                                        onChange={handleSelectChange}
                                                        required
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="">Year</option>

                                                        {Array.from({ length: 20 }, (_, i) => {
                                                            const year = (new Date().getFullYear() - 10) + i;
                                                            return (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Job Preferences */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-white mb-4">
                                            JOB PREFERENCES
                                        </h2>

                                        {/* <div>
                                            <label htmlFor="jobTitle" className="block text-sm font-medium text-white mb-2">
                                                Desired Job Title *
                                            </label>
                                            <input
                                                type="text"
                                                id="jobTitle"
                                                name="jobTitle"
                                                value={formData.jobTitles}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Software Engineer"
                                            />
                                        </div> */}

                                        <div>
                                            <label htmlFor="jobTitles" className="block text-sm font-bold text-white mb-2">
                                                Job Titles
                                            </label>
                                            {/* Job Titles Section */}
                                            <div className="pb-6 border-b border-gray-200">
                                                <BadgeSelector
                                                    options={JOB_TITLES}
                                                    selectedItems={selectedJobs}
                                                    onSelectionChange={setSelectedJobs}
                                                    placeholder="Search job titles..."
                                                    // label="Job Titles"
                                                    description="What types of roles are you interested in?"
                                                    maxSuggestions={5}
                                                    allowCustom={true}
                                                />
                                            </div>
                                        </div>


                                        <div>
                                            <label htmlFor="experienceLevel" className="block text-sm font-bold text-white mb-2">
                                                Experience Level *
                                            </label>
                                            <select
                                                id="experienceLevel"
                                                name="experienceLevel"
                                                value={formData.experienceLevel}
                                                onChange={handleSelectChange}
                                                required
                                                className="w-full px-4 py-2 border border-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select experience level</option>
                                                <option value="entry">Entry Level (0-2 years)</option>
                                                <option value="mid">Mid Level (3-5 years)</option>
                                                <option value="senior">Senior Level (6-10 years)</option>
                                                <option value="lead">Lead/Principal (10+ years)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                Employment Type *
                                            </label>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="fullTime"
                                                        checked={formData.jobPreferences.fullTime}
                                                        onChange={handleJobPreferenceChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Full-time</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="partTime"
                                                        checked={formData.jobPreferences.partTime}
                                                        onChange={handleJobPreferenceChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Part-time</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="contract"
                                                        checked={formData.jobPreferences.contract}
                                                        onChange={handleJobPreferenceChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Contract</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="internship"
                                                        checked={formData.jobPreferences.internship}
                                                        onChange={handleJobPreferenceChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Internship</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="coOp"
                                                        checked={formData.jobPreferences.coOp}
                                                        onChange={handleJobPreferenceChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Co-op</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                Work Location Preferneces *
                                            </label>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="remote"
                                                        checked={formData.workLocations.remote}
                                                        onChange={handleWorkLocationsChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Remote</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="hybrid"
                                                        checked={formData.workLocations.hybrid}
                                                        onChange={handleWorkLocationsChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Hybrid</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="inPerson"
                                                        checked={formData.workLocations.inPerson}
                                                        onChange={handleWorkLocationsChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">In Person</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                What company stages are you intersted in? *
                                            </label>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="startup"
                                                        checked={formData.companyStages.startup}
                                                        onChange={handleCompanyStagesChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Startup</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="earlyStage"
                                                        checked={formData.companyStages.earlyStage}
                                                        onChange={handleCompanyStagesChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Early Sage</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="publicTech"
                                                        checked={formData.companyStages.publicTech}
                                                        onChange={handleCompanyStagesChange}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white rounded"
                                                    />
                                                    <span className="ml-2 text-white">Public Tech</span>
                                                </label>

                                            </div>
                                        </div>


                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2 ">
                                                Country
                                            </label>
                                            <AutocompleteInput
                                                label="Country"
                                                options={countries}
                                                value={selectedCountry}
                                                onChange={setSelectedCountry}
                                                placeholder="e.g., United States, Canada, or your own..."
                                                maxSuggestions={5}
                                            />
                                        </div>


                                        <div>
                                            <label htmlFor="industries" className="block text-sm font-bold text-white mb-2">
                                                Industries
                                            </label>
                                            {/* Industries Section */}
                                            <div className="pb-6 border-b border-gray-200">
                                                <BadgeSelector
                                                    options={INDUSTRIES}
                                                    selectedItems={selectedIndustries}
                                                    onSelectionChange={setSelectedIndustries}
                                                    placeholder="Search industries titles..."
                                                    // label="Job Titles"
                                                    description="What types of industries do you want to work in??"
                                                    maxSuggestions={5}
                                                    allowCustom={true}
                                                />
                                            </div>
                                        </div>





                                        {/* TODO: add pay and pay period here */}
                                    </div>
                                )}

                                {/* Step 3: Skills & Resume */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold text-white mb-4">
                                            SKILLS & RESUME
                                        </h2>

                                        {/* <div>
                                            <label className="block text-sm font-medium text-white mb-2">
                                                Skills *
                                            </label>
                                            <div className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={skillInput}
                                                    onChange={(e) => setSkillInput(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="e.g., React, TypeScript, Node.js"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddSkill}
                                                    className="px-4 py-2 bg-[#42e0ff] text-gray-600 rounded-md hover:bg-gray-300"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.skills.map(skill => (
                                                    <span
                                                        key={skill}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                                    >
                                                        {skill}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSkill(skill)}
                                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div> */}


                                        <div>
                                            <label htmlFor="experienceLevel" className="block text-sm font-bold text-white mb-2">
                                                Coding Languages
                                            </label>
                                            {/* Coding languages section */}
                                            <div className="pb-6 border-b border-gray-200">
                                                <BadgeSelector
                                                    options={CODING_LANGUAGES}
                                                    selectedItems={selectedCodingLanguages}
                                                    onSelectionChange={setSelectedCodingLanguages}
                                                    placeholder="Search coding languages..."
                                                    // label="cCding Languages
                                                    // description="What types of roles are you interested in?"
                                                    maxSuggestions={5}
                                                    allowCustom={true}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                                                Upload Resume (Optional)
                                            </label>
                                            <input
                                                type="file"
                                                id="resume"
                                                name="resume"
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            {formData.resume && (
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Selected: {formData.resume.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Navigation buttons */}
                                <div className="flex justify-between mt-8">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={currentStep === 1}
                                        className={`px-6 py-2 rounded-md border-white ${currentStep === 1
                                            ? 'bg-gray-500 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                            }`}
                                    >
                                        Previous
                                    </button>

                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-[#42e0ff] text-gray-600 "
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Complete Onboarding
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
