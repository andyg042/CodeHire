import React from 'react'

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-network">
                {/* Network nodes - positioned absolutely */}
                {/* <div className="network-node node-green" style={{ top: '18%', left: '2%' }}>
                    <span className="node-icon">C</span>
                </div>
                <div className="network-node node-red" style={{ top: '15%', left: '50%', transform: 'translateX(-50%)' }}>
                    <span className="node-icon">★</span>
                </div>
                <div className="network-node node-orange" style={{ top: '25%', right: '8%' }}>
                    <span className="node-icon">☰</span>
                </div>
                <div className="network-node node-purple" style={{ bottom: '30%', left: '8%' }}>
                    <span className="node-icon">⚙</span>
                </div>
                <div className="network-node node-pink" style={{ bottom: '25%', left: '25%' }}>
                    <span className="node-icon">◆</span>
                </div>
                <div className="network-node node-cyan" style={{ top: '40%', left: '3%' }}>
                    <span className="node-icon">λ</span>
                </div>
                <div className="network-node node-yellow" style={{ bottom: '20%', right: '10%' }}>
                    <span className="node-icon">JS</span>
                </div>
                <div className="network-node node-blue" style={{ bottom: '15%', right: '5%' }}>
                    <span className="node-icon">≡</span>
                </div>
                <div className="network-node node-gray" style={{ top: '30%', right: '3%' }}>
                    <span className="node-icon">⚡</span>
                </div> */}

                {/* Connection lines */}
                {/* <svg className="network-lines" width="100%" height="100%">
                    <line x1="5%" y1="20%" x2="50%" y2="15%" className="connection-line" />
                    <line x1="50%" y1="15%" x2="92%" y2="25%" className="connection-line" />
                    <line x1="5%" y1="20%" x2="8%" y2="70%" className="connection-line" />
                    <line x1="8%" y1="70%" x2="25%" y2="75%" className="connection-line" />
                    <line x1="25%" y1="75%" x2="90%" y2="80%" className="connection-line" />
                    <line x1="3%" y1="40%" x2="8%" y2="70%" className="connection-line" />
                </svg> */}
            </div>

            <div className="hero-content">
                <h1 className="hero-title">
                    Find CS jobs that actually<br />match your skills
                </h1>
                <p className="hero-description">
                    CodeHire helps students discover jobs based on their<br />
                    programming languages, interests, and experience level<br />
                    where spelling just just you back qualified for you.
                </p>
            </div>


            <div className="hero-section-2-gradient">
                <h2 className="section-title">
                    Built to simplify the<br />CS job search
                </h2>
                <p className="section-description">
                    CodeHire is a personalized job discovery platform designed for computer science<br />
                    students. Instead of searching through multiple job boards or applying to roles you're not<br />
                    qualified for, CodeHire curates job listings that align with your skills, experience, and<br />
                    preferences—so you can focus on what matters most: finding the role that's right for you.
                </p>
            </div>



        </section>
    )
}