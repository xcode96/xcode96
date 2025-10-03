import React from 'react';

export const SearchIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const StarIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 21.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
);

export const LockIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export const GptIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
   <path d="M12.55 3.1a1 1 0 0 0-1.1 0l-7.7 5.4a1 1 0 0 0 .55 1.8L8 9.5v5.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9.5l3.75.8a1 1 0 0 0 .55-1.8Z"/>
   <path d="M22 17.5a2.5 2.5 0 0 1-5 0V15a2.5 2.5 0 0 1 5 0Z"/>
   <path d="M2 17.5a2.5 2.5 0 0 1 5 0V15a2.5 2.5 0 0 1-5 0Z"/>
   <path d="M12 18v-5"/>
 </svg>
);

export const MenuIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const HomeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
  </svg>
);

export const ToolsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.495-2.495a1.125 1.125 0 0 1 1.591 0l3.982 3.982a1.125 1.125 0 0 1 0 1.591l-2.495 2.495M11.42 15.17 3 22.592l2.495-2.495M3.75 7.5h6M3.75 12h6m-6 4.5h6M3.75 19.5h6.75" />
    </svg>
);

export const ChevronDownIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);

export const ShieldCheckIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

// FIX: Add missing UserIcon component
export const UserIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

export const PlusIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const UserPlusIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3.375 19.5h17.25a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 20.625 4.5H3.375A2.25 2.25 0 0 0 1.125 6.75v10.5A2.25 2.25 0 0 0 3.375 19.5Z" />
  </svg>
);

export const LogoutIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

export const PencilIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

export const TrashIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const DownloadIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const UploadIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

export const ChevronLeftIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);

export const ChevronRightIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);


// Category Icons
export const AllCategoriesIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
export const ReconnaissanceIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M21.75 12h-2.25m-1.666 5.834L16.5 16.5M4.5 12H2.25m1.666-5.834L5.25 7.5M12 21.75v-2.25m-5.834-1.666L7.5 16.5" />
  </svg>
);
export const WebAppIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);
export const PostExploitationIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
);
export const ThreatIntelIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.25-7.5a1.012 1.012 0 0 1 1.732 0l4.25 7.5a1.012 1.012 0 0 1 0 .639l-4.25 7.5a1.012 1.012 0 0 1-1.732 0l-4.25-7.5Zm17.066 0a1.012 1.012 0 0 1 0-.639l-4.25-7.5a1.012 1.012 0 0 1 1.732 0l4.25 7.5a1.012 1.012 0 0 1 0 .639l-4.25 7.5a1.012 1.012 0 0 1-1.732 0l-4.25-7.5Z" />
    </svg>
);
export const AISecurityIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M12 4.5v-1.5m0 18v-1.5M15.75 21v-1.5m-6.428-11.25L6.75 6.75m8.846 2.397L18 6.75m-9.196 9.196 2.397-2.397m0 0 2.397 2.397M9.196 9.143l2.397 2.397m0 0 2.397-2.397" />
    </svg>
);
export const DFIRIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
export const DetectionIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
);
export const DevSecOpsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
);
export const IoTSecurityIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
    </svg>
);
export const MalwareAnalysisIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5-4.72-4.72a.75.75 0 0 0-1.06 1.06L14.69 12l-4.72 4.72a.75.75 0 1 0 1.06 1.06l4.72-4.72a.75.75 0 0 0 0-1.06Zm-6 0L5.03 5.78a.75.75 0 0 0-1.06 1.06L8.69 12l-4.72 4.72a.75.75 0 1 0 1.06 1.06l4.72-4.72a.75.75 0 0 0 0-1.06Z" />
    </svg>
);
export const ExploitationFrameworksIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

export const RedTeamOpsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
    </svg>
);
export const VulnerabilityScanningIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
    </svg>
);
export const NetworkPenetrationIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.186 2.25 2.25 0 0 0-3.933 2.186Z" />
    </svg>
);
export const SecurityAuditingIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25v3.375c0 .621.504 1.125 1.125 1.125h3.375M16.5 12.75l-6 6-3-3" />
    </svg>
);
export const WirelessHackingIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
    </svg>
);
export const C2Icon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5 9 9.75l-2.25 2.25M13.5 14.25h4.5" />
    </svg>
);
export const MobileSecurityIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 0h10.5c.621 0 1.125-.504 1.125-1.125v-15c0-.621-.504-1.125-1.125-1.125H6.75c-.621 0-1.125.504-1.125 1.125v15c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
);
export const SocialEngineeringIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.742-.72m-4.742.72a9.094 9.094 0 0 1-3.742-.72m-4.742.72a9.094 9.094 0 0 0-3.742-.72M12 18.72v-2.223m0 2.223c-1.849 0-3.51-.354-5.002-.977M12 18.72c1.849 0 3.51-.354 5.002-.977M12 15c-2.22 0-4-1.78-4-4s1.78-4 4-4 4 1.78 4 4-1.78 4-4 4Zm-6 4.625a2.625 2.625 0 0 1-2.625-2.625V15.375a2.625 2.625 0 0 1 2.625-2.625h12a2.625 2.625 0 0 1 2.625 2.625v1.625a2.625 2.625 0 0 1-2.625 2.625H6Z" />
    </svg>
);
export const InformationCircleIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);

// About Page Icons
export const YoutubeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M19.802 5.322a3.684 3.684 0 0 1 2.604 2.605C23 9.47 23 12 23 12s0 2.53-.594 4.073a3.684 3.684 0 0 1-2.604 2.605C18.069 19.27 12 19.27 12 19.27s-6.069 0-7.602-.594a3.684 3.684 0 0 1-2.604-2.605C1.2 14.53 1.2 12 1.2 12s0-2.53.594-4.073a3.684 3.684 0 0 1 2.604-2.605C5.931 4.73 12 4.73 12 4.73s6.069 0 7.802.592ZM9.73 14.47l5.2-2.47-5.2-2.47v4.94Z" clipRule="evenodd"/>
    </svg>
);
export const BookIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4 3.75A2.75 2.75 0 0 0 1.25 6.5v11A2.75 2.75 0 0 0 4 20.25h16A2.75 2.75 0 0 0 22.75 17.5V6.5A2.75 2.75 0 0 0 20 3.75H4Zm.908 12.44a.75.75 0 0 1 .834-.944h3.752a.75.75 0 0 1 0 1.5H5.742a.75.75 0 0 1-.834-.556Zm0-4.5a.75.75 0 0 1 .834-.944h6.752a.75.75 0 0 1 0 1.5H5.742a.75.75 0 0 1-.834-.556Zm0-4.5a.75.75 0 0 1 .834-.944h3.752a.75.75 0 0 1 0 1.5H5.742a.75.75 0 0 1-.834-.556Z"/></svg>
);
export const BugBountyIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M9.331 4.25a.75.75 0 0 1 1.054-.225 3.001 3.001 0 0 1 3.23 3.23.75.75 0 0 1-.225 1.054l-2.61 1.508a.75.75 0 0 0-.288.558v1.549a.75.75 0 0 0 1.5 0v-.636a.75.75 0 0 0-.07-.31l1.19-2.06a4.5 4.5 0 0 0-4.845-4.845L9.33 4.251Zm4.015 6.56a.75.75 0 0 0-1.054.225 3 3 0 0 0-3.23 3.23.75.75 0 0 0 .225 1.054l2.61 1.508a.75.75 0 0 1 .288.558v1.549a.75.75 0 0 1-1.5 0v-.636a.75.75 0 0 1 .07-.31l-1.19-2.06a4.5 4.5 0 0 1 4.845-4.845l.484.279ZM5.25 12a.75.75 0 0 1 .75-.75h2.155a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Zm9-3.75a.75.75 0 0 1 .75-.75h2.155a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm0 7.5a.75.75 0 0 1 .75-.75h2.155a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75ZM12 5.25a.75.75 0 0 0-.75.75v2.155a.75.75 0 0 0 1.5 0V6a.75.75 0 0 0-.75-.75Zm-3.75 9a.75.75 0 0 0-.75.75v2.155a.75.75 0 0 0 1.5 0V15a.75.75 0 0 0-.75-.75Zm7.5 0a.75.75 0 0 0-.75.75v2.155a.75.75 0 0 0 1.5 0V15a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" /></svg>
);
export const CTFsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M5.25 3A.75.75 0 0 0 4.5 3.75v16.5a.75.75 0 0 0 1.5 0V15h11.25a.75.75 0 0 1 0 1.5H6v3.75a.75.75 0 0 0 1.5 0V18h11.25a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 18.75 4.5H6.375a.75.75 0 0 1 0-1.5H18.75A3.75 3.75 0 0 1 22.5 6.75v8.5A3.75 3.75 0 0 1 18.75 19.5H5.25a.75.75 0 0 0 0 1.5H18a.75.75 0 0 1 0 1.5H5.25A2.25 2.25 0 0 1 3 18.75V3.75A.75.75 0 0 1 4.5 3H5.25Z" clipRule="evenodd" /></svg>
);
export const CertificationsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Z" clipRule="evenodd" /></svg>
);
export const EventsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" /></svg>
);
export const DownloadsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
);
export const ToolSitesIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M11.06 2.09a1.5 1.5 0 0 1 1.88 0l2.72 2.04a1.5 1.5 0 0 0 .94 0l2.72-2.04a1.5 1.5 0 0 1 1.88 0l2.04 2.72a1.5 1.5 0 0 0 0 .94l-2.04 2.72a1.5 1.5 0 0 1 0 1.88l2.04 2.72a1.5 1.5 0 0 0 0 .94l-2.04 2.72a1.5 1.5 0 0 1-1.88 0l-2.72-2.04a1.5 1.5 0 0 0-.94 0l-2.72 2.04a1.5 1.5 0 0 1-1.88 0l-2.72-2.04a1.5 1.5 0 0 0-.94 0l-2.72 2.04a1.5 1.5 0 0 1-1.88 0l-2.04-2.72a1.5 1.5 0 0 0 0-.94l2.04-2.72a1.5 1.5 0 0 1 0-1.88l-2.04-2.72a1.5 1.5 0 0 0 0-.94l2.04-2.72a1.5 1.5 0 0 1 1.88 0l2.72 2.04a1.5 1.5 0 0 0 .94 0l2.72-2.04ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" clipRule="evenodd" /></svg>
);
export const ToolLinksIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M15.75 2.25a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V4.432l-3.32 3.32a.75.75 0 0 1-1.06-1.06l3.32-3.32H13.5a.75.75 0 0 1 0-1.5h2.25ZM8.25 15.75a.75.75 0 0 1 .75.75v2.568l3.32-3.32a.75.75 0 0 1 1.06 1.06l-3.32 3.32h2.568a.75.75 0 0 1 0 1.5H8.25a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75ZM2.25 8.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H4.432l3.32 3.32a.75.75 0 0 1-1.06 1.06l-3.32-3.32V13.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75ZM15.75 8.25a.75.75 0 0 1 .75-.75h2.568l-3.32 3.32a.75.75 0 0 1-1.06-1.06l3.32-3.32V4.5a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75Z" clipRule="evenodd" /></svg>
);
export const AiGptsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M14.25 6a.75.75 0 0 0-1.5 0v.258a3.752 3.752 0 0 0-2.835 1.295l-.253.253a3.752 3.752 0 0 0-1.295 2.835l-.007.258a.75.75 0 0 0 1.5 0l.007-.258c.02-.71.28-1.385.736-1.92a2.253 2.253 0 0 1 1.636-1.012l.258-.007a.75.75 0 0 0 0-1.5l-.258-.007A3.752 3.752 0 0 0 9.742 8.358l-.253.253A3.752 3.752 0 0 0 6.654 11.45l-.007.258a.75.75 0 0 0 1.5 0l.007-.258A2.253 2.253 0 0 1 9.166 9.814l.253-.253a2.253 2.253 0 0 1 1.636-1.012l.258-.007h.007l.258.007c.582.02.946.212 1.218.484l.253.253a.75.75 0 0 0 1.5 0l-.253-.253a2.253 2.253 0 0 1-.484-1.218l-.007-.258V6Z"/><path fillRule="evenodd" d="M3 11.25a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.036a3.743 3.743 0 0 1 2.296-.964h2.207a3.75 3.75 0 0 0 3.75-3.75v-2.207a3.743 3.743 0 0 1 .964-2.296H18a.75.75 0 0 0 0-1.5h-5.25a.75.75 0 0 0-.75.75v5.25a.75.75 0 0 0 .75.75H18a.75.75 0 0 0 0-1.5h-5.25a2.25 2.25 0 0 1-2.25-2.25v-2.207a2.242 2.242 0 0 0-1.5-2.176V11.25Zm19.5 7.5a.75.75 0 0 1-1.5 0V11.25a.75.75 0 0 1 1.5 0v2.036a3.743 3.743 0 0 0-2.296.964h-2.207a3.75 3.75 0 0 1-3.75 3.75v2.207a3.743 3.743 0 0 0-.964 2.296V21a.75.75 0 0 1-1.5 0h-1.5a.75.75 0 0 1 0-1.5H12v-5.25a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H12.75a2.25 2.25 0 0 0 2.25 2.25h2.207a2.242 2.242 0 0 1 1.5 2.176V18.75Z" clipRule="evenodd" /></svg>
);
export const FrameworksIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
);
export const FeedsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4.5 6.375a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z" /></svg>
);
export const DataLeaksIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M11.25 4.533A9.708 9.708 0 0 0 6 3a9.708 9.708 0 0 0-5.25 1.533v13.084A11.233 11.233 0 0 1 6 16.5a11.233 11.233 0 0 1 5.25 1.117V4.533Zm-3.75 6.13a.75.75 0 0 0-1.5 0v.172a1.31 1.31 0 0 0 .44 1.012l.176.177a.75.75 0 0 0 1.06-1.06l-.176-.177a.124.124 0 0 1-.057-.107v-.172Zm2.25-3.32a.75.75 0 0 0-1.5 0v3.546l-1.55-1.55a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l2.75-2.75a.75.75 0 0 0-1.06-1.06l-1.39 1.39V7.343Z"/><path d="M12.75 4.533V17.61a11.233 11.233 0 0 0 5.25-1.117 11.233 11.233 0 0 0 5.25-1.117V4.533A9.708 9.708 0 0 0 18 3a9.708 9.708 0 0 0-5.25 1.533Zm3.75 6.13a.75.75 0 0 0-1.5 0v.172c0 .043-.023.082-.057.107l-.176.177a.75.75 0 1 0 1.06 1.06l.176-.177c.28-.28.44-.66.44-1.012v-.172Zm2.25-3.32a.75.75 0 0 0-1.5 0v3.546l-1.39-1.39a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l2.75-2.75a.75.75 0 1 0-1.06-1.06L18 10.89V7.343Z"/></svg>
);
export const LastNewsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V5.25Zm1.5 0v1.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Zm0 4.5v9a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Zm2.25-3a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm2.25.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
);
