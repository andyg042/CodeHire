'use client';

import { useState } from 'react';
import SearchCheckboxes from "../components/SearchCheckboxes";

// ── Static option lists ────────────────────────────────────────────────────────

const JOB_TITLE_OPTIONS = [
  'Software Engineer', 'Frontend Engineer', 'Backend Engineer',
  'Full Stack Engineer', 'Mobile Engineer', 'iOS Engineer',
  'Android Engineer', 'DevOps Engineer', 'Site Reliability Engineer',
  'Data Engineer', 'Machine Learning Engineer', 'Data Scientist',
  'Product Manager', 'Engineering Manager', 'QA Engineer',
  'Security Engineer', 'Cloud Architect', 'UI/UX Designer',
  'Blockchain Engineer', 'Embedded Systems Engineer',
];

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const WORK_LOCATION_PREFS = ['Remote', 'Hybrid', 'In-Person'];

const LOCATION_OPTIONS = [
  'United States', 'Canada', 'United Kingdom', 'Germany',
  'France', 'Australia', 'India', 'Singapore', 'Netherlands', 'Sweden',
];

const COMPANY_STAGES = ['Startup', 'Early Stage', 'Public Tech', 'Series'];

const INDUSTRIES = [
  'Aerospace', 'Arts & Entertainment', 'Software', 'Technology',
  'Energy', 'Finance & Insurance', 'Government & Public',
  'Administration', 'Healthcare', 'Information Technology',
  'Sourcing/Hiring', 'Media & Communication',
  'Professional & Business Services', 'Retail',
];

const SKILLS_OPTIONS = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go',
  'Rust', 'Ruby', 'Swift', 'Kotlin', 'PHP', 'Scala', 'R', 'MATLAB',
  'SQL', 'HTML', 'CSS', 'React', 'Next.js', 'Vue', 'Angular', 'Node.js',
  'Django', 'Flask', 'Spring Boot', 'GraphQL', 'REST APIs', 'Docker',
  'Kubernetes', 'AWS', 'GCP', 'Azure', 'Git', 'PostgreSQL', 'MongoDB',
  'Redis', 'TensorFlow', 'PyTorch',
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MAJORS = [
  'Computer Science', 'Software Engineering', 'Electrical Engineering',
  'Mechanical Engineering', 'Mathematics', 'Physics', 'Data Science',
  'Information Systems', 'Cybersecurity', 'Other',
];

const YEARS = Array.from({ length: 10 }, (_, i) =>
  String(new Date().getFullYear() - 4 + i)
);

// ── Reusable components ────────────────────────────────────────────────────────

function SectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <h3 style={{ color }} className="font-bold text-sm mb-3 uppercase tracking-wide">
      {title}
    </h3>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-light-gray)' }}>
      {children}
    </label>
  );
}

function TextInput({ placeholder, value, onChange }: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded px-3 py-2 text-sm focus:outline-none transition-colors"
      style={{
        backgroundColor: 'var(--color-placeholder)',
        border: '1px solid var(--color-gray)',
        color: 'var(--color-offwhite)',
      }}
    />
  );
}

function SelectInput({ options, value, onChange, placeholder }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded px-3 py-2 text-sm focus:outline-none cursor-pointer"
      style={{
        backgroundColor: 'var(--color-placeholder)',
        border: '1px solid var(--color-gray)',
        color: 'var(--color-offwhite)',
      }}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function CheckboxGroup({ options, selected, onChange, columns = 1 }: {
  options: string[];
  selected: string[];
  onChange: (items: string[]) => void;
  columns?: number;
}) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt)
      ? selected.filter((s) => s !== opt)
      : [...selected, opt]);

  return (
    <div
      className="grid gap-x-4 gap-y-2.5"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}
    >
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 cursor-pointer text-sm transition-colors"
          style={{ color: 'var(--color-text-light-gray)' }}
        >
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
            className="w-4 h-4 rounded cursor-pointer"
            style={{ accentColor: 'var(--color-cyan)' }}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function UserProfilePage() {
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState('');
  const [gradMonth, setGradMonth] = useState('');
  const [gradYear, setGradYear] = useState('');

  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [workLocations, setWorkLocations] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [companyStages, setCompanyStages] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [minPay, setMinPay] = useState('');
  const [payType, setPayType] = useState<'Hourly' | 'Salary'>('Salary');

  const [skills, setSkills] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleSave = () => {
    console.log({
      fullName, major, gradMonth, gradYear,
      jobTitles, employmentTypes, workLocations, location,
      companyStages, industries, minPay, payType,
      skills, resumeFile,
    });
  };

  return (
    // Background + font come from globals.css — no overrides needed here
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col gap-5">

        {/* Page title */}
        <div>
          <h1 className="text-3xl font-bold">User Profile</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-mid-gray)' }}>
            Change your user settings &amp; job preferences here.
          </p>
        </div>

        {/* Card — matches Jobs sidebar bg */}
        <div className="rounded-lg shadow p-6 space-y-8" style={{ backgroundColor: '#313749' }}>

          {/* ── BASIC INFO ── */}
          <section>
            <SectionHeader title="Basic Info" color="var(--color-green)" />
            <div className="space-y-4 max-w-lg">
              <div>
                <FieldLabel>Full Name</FieldLabel>
                <TextInput placeholder="Full name" value={fullName} onChange={setFullName} />
              </div>
              <div>
                <FieldLabel>Major</FieldLabel>
                <SelectInput options={MAJORS} value={major} onChange={setMajor} placeholder="Select a major" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel>Graduation Month</FieldLabel>
                  <SelectInput options={MONTHS} value={gradMonth} onChange={setGradMonth} placeholder="Month" />
                </div>
                <div>
                  <FieldLabel>Graduation Year</FieldLabel>
                  <SelectInput options={YEARS} value={gradYear} onChange={setGradYear} placeholder="Year" />
                </div>
              </div>
            </div>
          </section>

          <div style={{ borderTop: '1px solid var(--color-gray)', opacity: 0.4 }} />

          {/* ── JOB PREFERENCES ── */}
          <section>
            <SectionHeader title="Job Preferences" color="var(--color-yellow)" />
            <div className="space-y-6">

              <div>
                <SectionHeader title="Job Titles" color="var(--color-cyan)" />
                <p className="text-xs mb-2" style={{ color: 'var(--color-text-mid-gray)' }}>
                  What types of roles are you interested in?
                </p>
                <div className="max-w-2xl">
                  <SearchCheckboxes
                    options={JOB_TITLE_OPTIONS}
                    selectedItems={jobTitles}
                    onSelectionChange={setJobTitles}
                    placeholder="Search job title..."
                    maxSuggestions={6}
                  />
                </div>
              </div>

              <div>
                <SectionHeader title="Employment Type" color="var(--color-pink)" />
                <CheckboxGroup
                  options={EMPLOYMENT_TYPES}
                  selected={employmentTypes}
                  onChange={setEmploymentTypes}
                  columns={2}
                />
              </div>

              <div>
                <SectionHeader title="Work Location Preferences" color="var(--color-cyan)" />
                <CheckboxGroup
                  options={WORK_LOCATION_PREFS}
                  selected={workLocations}
                  onChange={setWorkLocations}
                  columns={3}
                />
              </div>

              <div>
                <SectionHeader title="Location" color="var(--color-yellow)" />
                <div className="max-w-2xl space-y-2">
                  <TextInput placeholder="Search city and country" value={location} onChange={setLocation} />
                  <CheckboxGroup
                    options={LOCATION_OPTIONS.slice(0, 3)}
                    selected={[location]}
                    onChange={(items) => setLocation(items[items.length - 1] ?? '')}
                    columns={1}
                  />
                </div>
              </div>

              <div>
                <SectionHeader title="Company Stage" color="var(--color-green)" />
                <CheckboxGroup
                  options={COMPANY_STAGES}
                  selected={companyStages}
                  onChange={setCompanyStages}
                  columns={2}
                />
              </div>

              <div>
                <SectionHeader title="Industries" color="var(--color-pink)" />
                <CheckboxGroup
                  options={INDUSTRIES}
                  selected={industries}
                  onChange={setIndustries}
                  columns={2}
                />
              </div>

              <div>
                <SectionHeader title="Minimum Pay" color="var(--color-cyan)" />
                <div className="max-w-xs">
                  <TextInput placeholder="$" value={minPay} onChange={setMinPay} />
                </div>
                <div className="mt-2 flex gap-2">
                  {(['Hourly', 'Salary'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setPayType(t)}
                      className="px-3 py-1 text-xs rounded cursor-pointer transition-colors"
                      style={{
                        border: `1px solid ${payType === t ? 'var(--color-cyan)' : 'var(--color-gray)'}`,
                        color: payType === t ? 'var(--color-cyan)' : 'var(--color-text-mid-gray)',
                        backgroundColor: payType === t ? 'rgba(66,224,255,0.08)' : 'transparent',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div style={{ borderTop: '1px solid var(--color-gray)', opacity: 0.4 }} />

          {/* ── RESUME ── */}
          <section>
            <SectionHeader title="Resume" color="var(--color-green)" />
            <div className="space-y-5">

              <div>
                <SectionHeader title="Skills / Coding Languages" color="var(--color-pink)" />
                <div className="max-w-2xl">
                  <SearchCheckboxes
                    options={SKILLS_OPTIONS}
                    selectedItems={skills}
                    onSelectionChange={setSkills}
                    placeholder="Search coding languages..."
                    maxSuggestions={6}
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Upload Resume (Optional)</FieldLabel>
                <label
                  className="flex items-center gap-3 w-full max-w-sm rounded px-3 py-2 cursor-pointer transition-colors"
                  style={{
                    backgroundColor: 'var(--color-placeholder)',
                    border: '1px solid var(--color-gray)',
                  }}
                >
                  <span className="text-sm flex-1 truncate" style={{ color: 'var(--color-text-mid-gray)' }}>
                    {resumeFile ? resumeFile.name : 'Choose File'}
                  </span>
                  <span className="text-sm font-medium shrink-0" style={{ color: 'var(--color-cyan)' }}>
                    Browse
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </div>
          </section>

          {/* ── Save Button ── */}
          <div className="pt-2">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 text-sm font-semibold rounded cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--color-green)', color: '#000' }}
            >
              Save User Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
