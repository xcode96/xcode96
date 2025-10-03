import React from 'react';
import { 
    YoutubeIcon, BookIcon, BugBountyIcon, CTFsIcon, CertificationsIcon, EventsIcon, DownloadsIcon,
    ToolSitesIcon, ToolLinksIcon, AiGptsIcon, FrameworksIcon, FeedsIcon, DataLeaksIcon, LastNewsIcon
} from './Icons';

const usefulLinks = [
    { name: 'Youtubers', icon: YoutubeIcon, color: 'text-red-500' },
    { name: 'Books', icon: BookIcon, color: 'text-blue-500' },
    { name: 'Bug Bounty', icon: BugBountyIcon, color: 'text-red-600' },
    { name: 'CTFs', icon: CTFsIcon, color: 'text-yellow-500' },
    { name: 'Certifications', icon: CertificationsIcon, color: 'text-green-500' },
    { name: 'Events', icon: EventsIcon, color: 'text-orange-500' },
    { name: 'Downloads', icon: DownloadsIcon, color: 'text-green-400' },
    { name: 'Tool Sites', icon: ToolSitesIcon, color: 'text-purple-500' },
    { name: 'Tool Links', icon: ToolLinksIcon, color: 'text-orange-400' },
    { name: 'AI GPTs', icon: AiGptsIcon, color: 'text-blue-400' },
    { name: 'Frameworks', icon: FrameworksIcon, color: 'text-yellow-400' },
    { name: 'Updates & Feeds', icon: FeedsIcon, color: 'text-orange-600' },
    { name: 'Data Leaks', icon: DataLeaksIcon, color: 'text-red-400' },
    { name: 'Last News', icon: LastNewsIcon, color: 'text-green-600' },
];

export const AboutPage: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">About & Useful Links</h1>
            <p className="text-gray-600 mb-8">A collection of valuable resources for security professionals and enthusiasts.</p>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {usefulLinks.map((link, index) => (
                        <a 
                            key={index} 
                            href="#"
                            className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                        >
                            <link.icon className={`w-6 h-6 ${link.color}`} />
                            <span className="text-gray-700 group-hover:text-gray-900 font-medium">{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};