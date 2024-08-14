import React from 'react';
import { Link } from 'react-router-dom';
import './Timeline.css';

function Timeline({ currentStep }) {
    const steps = [
        { name: 'Building Details', path: '/buildingdetails' },
        { name: 'Utilization', path: '/utilization' },
        { name: 'Equipment', path: '/equipment' },
        { name: 'Analysis', path: '/analysis' },
    ];

    return (
        <div className="timeline">
            {steps.map((step, index) => (
                <Link to={step.path} key={index} className={`timeline-item ${currentStep === step.name ? 'active' : ''}`}>
                    {step.name}
                </Link>
            ))}
        </div>
    );
}

export default Timeline;
