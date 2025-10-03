import React from 'react';
// Fix: Replaced non-existent BugIcon with VulnerabilityScanningIcon.
import { ShieldCheckIcon, VulnerabilityScanningIcon, LockIcon } from './Icons';

const expertiseData = [
    {
        icon: ShieldCheckIcon,
        color: 'blue',
        title: 'System Security Engineer',
        description: 'I bring extensive experience in identifying and mitigating potential threats. My tenure as an Incident Responder and SOC Analyst honed my skills in incident response, malware analysis, and reverse engineering.',
    },
    {
        icon: VulnerabilityScanningIcon,
        color: 'orange',
        title: 'Penetration Tester - Web application / Mobile & Web',
        description: 'I specialize in identifying and mitigating security vulnerabilities in web and mobile applications. I perform detailed security assessments using both automated tools and manual techniques to reveal potential weaknesses.',
    },
    {
        icon: LockIcon,
        color: 'pink',
        title: 'Red Teamer',
        description: 'My role involves learning and applying various tactics, techniques, and procedures to perform controlled attacks; I work with experienced members to conduct vulnerability assessments, and execute penetration tests on systems and applications.',
    }
];

interface InfoCardProps {
    icon: React.ComponentType<{ className?: string }>;
    color: 'blue' | 'orange' | 'pink';
    title: string;
    description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, color, title, description }) => {
    const colorClasses = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
        pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
    };

    const selectedColor = colorClasses[color];

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center flex flex-col items-center transition-shadow hover:shadow-xl">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${selectedColor.bg}`}>
                <Icon className={`w-10 h-10 ${selectedColor.text}`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    );
};

export const AboutPage: React.FC = () => {
    return (
        <div className="animate-fade-in max-w-7xl mx-auto">
            <div className="text-center mb-12">
                 <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    Saying that a person could be an expert in all these fields is a lie. What I do have are strong bases to be able to change from one field to another, or either become an expert in one of them as I have more than enough knowledge for entry level positions in each of these fields.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {expertiseData.map((item, index) => (
                    <InfoCard 
                        key={index}
                        icon={item.icon}
                        color={item.color as 'blue' | 'orange' | 'pink'}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};