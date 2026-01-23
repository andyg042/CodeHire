// app/components/HowItWorks.tsx
import React from 'react'

interface StepProps {
    number: number
    title: string
    description: string
}

function Step({ number, title, description }: StepProps) {
    return (
        <div className="step-card">
            <div className="step-number">{number}.</div>
            <div className="step-content">
                <h3 className="step-title">{title}</h3>
                <p className="step-description">{description}</p>
            </div>
            <div className="step-placeholder"></div>
        </div>
    )
}

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: "SELECT YOUR SKILLS & PREFERENCES",
            description: "Choose the programming languages you know, the roles you're interested in, and your experience level."
        },
        {
            number: 2,
            title: "GET TAILORED JOB RECOMMENDATIONS",
            description: "CodeHire filters and recommends job postings using skills your relevant interests and skill—removing noise for irrelevant results."
        },
        {
            number: 3,
            title: "EXPLORE ROLES WITH CONFIDENCE",
            description: "View clear job requirements, skill matches, qualifications, and direct links to apply—all from your profile before applying."
        },
        {
            number: 4,
            title: "APPLY STRAIGHT AWAY",
            description: "Save time compiling and save your top results for later, then use our tracker to stay organized."
        }
    ]

    return (
        <section className="how-it-works">
            <h2 className="how-it-works-title">How CodeHire Works</h2>
            <div className="steps-container">
                {steps.map((step) => (
                    <Step key={step.number} {...step} />
                ))}
            </div>
        </section>
    )
}
