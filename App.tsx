import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToolCard } from './components/ToolCard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Pagination } from './components/Pagination';
import { AboutPage } from './components/AboutPage';
import { Chatbot } from './components/Chatbot';
import { GptIcon } from './components/Icons';
import { initialTools, categories as baseCategories } from './constants';
import type { Tool, AdminUser } from './types';

type View = 'home' | 'admin_login' | 'admin_dashboard' | 'about';

const TOOLS_PER_PAGE = 12;

const getViewFromHash = (): View => {
    const hash = window.location.hash.substring(1); // remove '#'
    switch (hash) {
        case '/login': return 'admin_login';
        case '/dashboard': return 'admin_dashboard';
        case '/about': return 'about';
        case '/':
        case '':
        default: return 'home';
    }
}

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [view, setView] = useState<View>(getViewFromHash());
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
        const savedUsers = localStorage.getItem('adminUsers');
        return savedUsers ? JSON.parse(savedUsers) : [
            { id: 1, username: 'admin', email: 'admin@xcode96.io', role: 'Super Admin', createdAt: new Date().toISOString() }
        ];
    } catch (error) {
        console.error("Failed to parse admin users from localStorage", error);
        return [
            { id: 1, username: 'admin', email: 'admin@xcode96.io', role: 'Super Admin', createdAt: new Date().toISOString() }
        ];
    }
  });

  const [tools, setTools] = useState<Tool[]>(() => {
      try {
        const savedTools = localStorage.getItem('tools');
        return savedTools ? JSON.parse(savedTools) : initialTools;
      } catch (error) {
        console.error("Failed to parse tools from localStorage", error);
        return initialTools;
      }
  });

  // Effect to save data to localStorage whenever it changes
  useEffect(() => {
    try {
        localStorage.setItem('tools', JSON.stringify(tools));
    } catch (error) {
        console.error("Failed to save tools to localStorage", error);
    }
  }, [tools]);
  
  useEffect(() => {
    try {
        localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
    } catch (error) {
        console.error("Failed to save admin users to localStorage", error);
    }
  }, [adminUsers]);

  // Effect to handle hash changes (browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
        setView(getViewFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
        window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Effect for route protection
  useEffect(() => {
    const currentView = getViewFromHash();
    if (currentView === 'admin_dashboard' && !isLoggedIn) {
        window.location.hash = '/login'; // Redirect to login
    }
  }, [isLoggedIn, view]);


  const navigate = (path: string) => {
    if (window.location.hash.substring(1) !== path) {
      window.location.hash = path;
    } else {
      // If hash is already correct, but view might be out of sync (e.g. initial load), force a view update.
      setView(getViewFromHash());
    }
  };

  const handleNavigation = (targetView: 'home' | 'admin_login' | 'about') => {
    switch (targetView) {
        case 'home':
            navigate('/');
            break;
        case 'admin_login':
            navigate('/login');
            break;
        case 'about':
            navigate('/about');
            break;
    }
    setIsMobileSidebarOpen(false);
  };

  const handleSetSelectedCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsMobileSidebarOpen(false);
  };

  const categories = useMemo(() => {
    const sourceTools = tools;
    const toolCountsByCategory = sourceTools.reduce((acc, tool) => {
        acc[tool.category] = (acc[tool.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return baseCategories.map(category => ({
        ...category,
        count: category.name === 'All Categories' 
            ? sourceTools.length 
            : toolCountsByCategory[category.name] || 0,
    }));
  }, [tools]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };
  
  const handleAddAdminUser = (newUser: Omit<AdminUser, 'id' | 'createdAt'>) => {
    setAdminUsers(prevUsers => [
      ...prevUsers,
      {
        ...newUser,
        id: prevUsers.length > 0 ? Math.max(...prevUsers.map(u => u.id)) + 1 : 1,
        createdAt: new Date().toISOString(),
      }
    ]);
  };

  const handleAddTool = (newToolData: Omit<Tool, 'id' | 'author'>) => {
    const newTool: Tool = {
      ...newToolData,
      id: `${newToolData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      author: { name: 'Admin', avatarUrl: 'https://picsum.photos/seed/admin/32/32' },
    };
    setTools(prevTools => [newTool, ...prevTools]);
  };

  const handleEditTool = (updatedTool: Tool) => {
    setTools(prevTools => prevTools.map(tool => tool.id === updatedTool.id ? updatedTool : tool));
  };

  const handleDeleteTool = (toolId: string) => {
    setTools(prevTools => prevTools.filter(tool => tool.id !== toolId));
  };

  const handleImportData = (data: { tools: Tool[]; adminUsers: AdminUser[] }) => {
    if (data.tools) setTools(data.tools);
    if (data.adminUsers) setAdminUsers(data.adminUsers);
  };
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const fullyFilteredTools = useMemo(() => {
    const sourceTools = tools;

    const filteredByCategory = sourceTools
      .filter((tool) => {
        if (selectedCategory === 'All Categories') return true;
        return tool.category === selectedCategory;
      });

    const filteredBySearch = filteredByCategory.filter((tool) => {
      if (searchTerm.trim() === '') return true;
      const term = searchTerm.toLowerCase();
      return (
        tool.name.toLowerCase().includes(term) ||
        tool.description.toLowerCase().includes(term)
      );
    });
    
    // Prioritize name matches
    return filteredBySearch.sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
        const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        return 0;
    });
  }, [selectedCategory, searchTerm, tools]);

  const totalPages = Math.ceil(fullyFilteredTools.length / TOOLS_PER_PAGE);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
    return fullyFilteredTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);
  }, [currentPage, fullyFilteredTools]);

  const renderContent = () => {
    switch (view) {
      case 'admin_login':
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      case 'admin_dashboard':
        return (
          <AdminDashboard 
            users={adminUsers} 
            onAddUser={handleAddAdminUser} 
            onLogout={handleLogout}
            tools={tools}
            categories={categories}
            onAddTool={handleAddTool}
            onEditTool={handleEditTool}
            onDeleteTool={handleDeleteTool}
            onImport={handleImportData}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-sm text-gray-500">
                Showing {paginatedTools.length} of {fullyFilteredTools.length} tool(s)
              </h1>
            </div>
            {paginatedTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {paginatedTools.map((tool: Tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-xl font-semibold text-gray-600">No tools found</h2>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSetSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onNavigateHome={() => navigate('/')}
        isMobileOpen={isMobileSidebarOpen}
      />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header onNavigate={handleNavigation} onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[rgb(224,232,255)]">
          {renderContent()}
        </main>
      </div>
      <button 
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-500 text-white z-20">
        <GptIcon />
      </button>
      {isChatbotOpen && (
        <Chatbot 
          tools={tools} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;