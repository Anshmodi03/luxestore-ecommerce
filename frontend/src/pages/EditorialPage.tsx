import Footer from '../components/common/Footer';
import PageTransition from '../components/common/PageTransition';

import EditorialHero from '../components/editorial/EditorialHero';
import EditorialArticle from '../components/editorial/EditorialArticle';
import EditorialCraftsmanship from '../components/editorial/EditorialCraftsmanship';
import EditorialImageGallery from '../components/editorial/EditorialImageGallery';
import EditorialFooter from '../components/editorial/EditorialFooter';

export default function EditorialPage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="bg-off-white dark:bg-zinc-950 font-display text-charcoal dark:text-gray-100 antialiased overflow-x-hidden selection:bg-charcoal selection:text-white dark:selection:bg-white dark:selection:text-charcoal transition-colors duration-500">
          
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
