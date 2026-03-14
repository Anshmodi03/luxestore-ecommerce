import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PageTransition from '../components/common/PageTransition';

import EditorialHero from '../components/editorial/EditorialHero';
import EditorialArticle from '../components/editorial/EditorialArticle';
import EditorialCraftsmanship from '../components/editorial/EditorialCraftsmanship';
import EditorialImageGallery from '../components/editorial/EditorialImageGallery';
import EditorialFooter from '../components/editorial/EditorialFooter';

export default function EditorialPage() {
  const [isDark, setIsDark] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <PageTransition>
      <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
        <div className="bg-off-white dark:bg-zinc-950 font-display text-charcoal dark:text-gray-100 antialiased overflow-x-hidden selection:bg-charcoal selection:text-white dark:selection:bg-white dark:selection:text-charcoal transition-colors duration-500">
          <Navbar 
            onMenuOpen={() => setIsMenuOpen(true)} 
            onToggleDark={() => setIsDark(!isDark)}
            isDark={isDark}
          />
          
          <main className="relative flex min-h-screen w-full flex-col">
             <EditorialHero />
             <EditorialArticle />
             <EditorialCraftsmanship />
             <EditorialImageGallery />
             <EditorialFooter />
          </main>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}
