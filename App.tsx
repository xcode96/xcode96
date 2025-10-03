import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToolCard } from './components/ToolCard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Pagination } from './components/Pagination';
import { SuggestionModal } from './components/SuggestionModal';
import { Toast } from './components/Toast';
import { initialTools, categories as baseCategories } from './constants';
import type { Tool, AdminUser, SuggestedTool } from './types';

type View = 'home' | 'admin_login' | 'admin_dashboard';

const TOOLS_PER_PAGE = 12;

const getViewFromHash = (): View => {
    const hash = window.location.hash.substring(1); // remove '#'
    switch (hash) {
        case '/login': return 'admin_login';
        case '/dashboard': return 'admin_dashboard';
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
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
        const savedUsers = localStorage.getItem('adminUsers');
        return savedUsers ? JSON.parse(savedUsers) : [
            { id: 1, username: 'admin', password: 'dqadm', email: 'admin@xcode96.io', role: 'Super Admin', createdAt: new Date().toISOString() }
        ];
    } catch (error) {
        console.error("Failed to parse admin users from localStorage", error);
        return [
            { id: 1, username: 'admin', password: 'dqadm', email: 'admin@xcode96.io', role: 'Super Admin', createdAt: new Date().toISOString() }
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

  const [suggestions, setSuggestions] = useState<SuggestedTool[]>(() => {
    try {
      const savedSuggestions = localStorage.getItem('toolSuggestions');
      return savedSuggestions ? JSON.parse(savedSuggestions) : [];
    } catch (error) {
      console.error("Failed to parse suggestions from localStorage", error);
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
        const savedFavorites = localStorage.getItem('toolFavorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        return [];
    }
  });

  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    try {
        const savedRatings = localStorage.getItem('toolRatings');
        return savedRatings ? JSON.parse(savedRatings) : {};
    } catch (error) {
        console.error("Failed to parse ratings from localStorage", error);
        return {};
    }
  });

  const [minRating, setMinRating] = useState<number>(0);

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

  useEffect(() => {
    try {
        localStorage.setItem('toolSuggestions', JSON.stringify(suggestions));
    } catch (error) {
        console.error("Failed to save suggestions to localStorage", error);
    }
  }, [suggestions]);

  useEffect(() => {
    try {
        localStorage.setItem('toolFavorites', JSON.stringify(favorites));
    } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
        localStorage.setItem('toolRatings', JSON.stringify(ratings));
    } catch (error) {
        console.error("Failed to save ratings to localStorage", error);
    }
  }, [ratings]);

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
  
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleNavigation = (targetView: 'home' | 'admin_login') => {
    switch (targetView) {
        case 'home':
            navigate('/');
            break;
        case 'admin_login':
            navigate('/login');
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

    return baseCategories.map(category => {
        let count = 0;
        if (category.name === 'All Categories') {
            count = sourceTools.length;
        } else if (category.name === 'Favorites') {
            count = favorites.length;
        } else {
            count = toolCountsByCategory[category.name] || 0;
        }
        return { ...category, count };
    });
  }, [tools, favorites]);

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
    showToast('Admin user created successfully!');
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

  const handleImportData = (data: { tools: Tool[]; adminUsers: AdminUser[], suggestions?: SuggestedTool[] }) => {
    if (data.tools) setTools(data.tools);
    if (data.adminUsers) setAdminUsers(data.adminUsers);
    if (data.suggestions) setSuggestions(data.suggestions);
  };
  
  const handleSuggestTool = (suggestionData: Omit<SuggestedTool, 'suggestionId' | 'status'>) => {
      const newSuggestion: SuggestedTool = {
        ...suggestionData,
        suggestionId: `suggestion-${Date.now()}`,
        status: 'pending',
      };
      setSuggestions(prev => [...prev, newSuggestion]);
      setIsSuggestionModalOpen(false);
      showToast('Thank you! Your suggestion has been submitted for review.');
  };

  const handleApproveSuggestion = (suggestionId: string, finalToolData: Omit<Tool, 'id' | 'author'>) => {
    const suggestion = suggestions.find(s => s.suggestionId === suggestionId);
    if (suggestion && suggestion.status === 'pending') {
        handleAddTool(finalToolData);
        setSuggestions(prev => prev.map(s => s.suggestionId === suggestionId ? { ...s, status: 'approved' } : s));
        showToast('Suggestion approved and tool added.', 'success');
    }
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.map(s => s.suggestionId === suggestionId ? { ...s, status: 'rejected' } : s));
    showToast('Suggestion has been rejected.', 'error');
  };


  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => 
        prev.includes(toolId)
            ? prev.filter(id => id !== toolId)
            : [...prev, toolId]
    );
  };

  const handleSetRating = (toolId: string, rating: number) => {
    setRatings(prev => ({
        ...prev,
        [toolId]: rating,
    }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, minRating]);

  const fullyFilteredTools = useMemo(() => {
    let sourceTools = tools;

    if (selectedCategory === 'Favorites') {
        sourceTools = sourceTools.filter(tool => favorites.includes(tool.id));
    }
    
    if (minRating > 0) {
        sourceTools = sourceTools.filter(tool => (ratings[tool.id] || 0) >= minRating);
    }

    const filteredByCategory = sourceTools
      .filter((tool) => {
        if (selectedCategory === 'All Categories' || selectedCategory === 'Favorites') return true;
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
  }, [selectedCategory, searchTerm, tools, favorites, ratings, minRating]);

  const totalPages = Math.ceil(fullyFilteredTools.length / TOOLS_PER_PAGE);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
    return fullyFilteredTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);
  }, [currentPage, fullyFilteredTools]);

  const renderContent = () => {
    switch (view) {
      case 'admin_login':
        return <AdminLogin users={adminUsers} onLoginSuccess={handleLoginSuccess} />;
      case 'admin_dashboard':
        return (
          <AdminDashboard 
            users={adminUsers} 
            onAddUser={handleAddAdminUser} 
            onLogout={handleLogout}
            tools={tools}
            suggestions={suggestions}
            onApproveSuggestion={handleApproveSuggestion}
            onRejectSuggestion={handleRejectSuggestion}
            categories={categories}
            onAddTool={handleAddTool}
            onEditTool={handleEditTool}
            onDeleteTool={handleDeleteTool}
            onImport={handleImportData}
            showToast={showToast}
          />
        );
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
                  <ToolCard 
                    key={tool.id} 
                    tool={tool}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={toggleFavorite}
                    rating={ratings[tool.id]}
                    onSetRating={handleSetRating}
                  />
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
        minRating={minRating}
        setMinRating={setMinRating}
      />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header 
          onNavigate={handleNavigation} 
          onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
          onSuggestToolClick={() => setIsSuggestionModalOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[rgb(224,232,255)]">
          {renderContent()}
        </main>
      </div>
      <SuggestionModal
        isOpen={isSuggestionModalOpen}
        onClose={() => setIsSuggestionModalOpen(false)}
        onSave={handleSuggestTool}
        categories={categories.filter(c => c.id !== 'all' && c.id !== 'favorites')}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;