import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import ScrollReveal from '../common/ScrollReveal'

export default function AtelierGallery() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-8xl mx-auto">
      <ScrollReveal variant="fade-up" className="text-center mb-16 space-y-4">
        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase font-body">The Atelier</span>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 dark:text-white">Elevate Your Surroundings</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
        <ScrollReveal variant="scale" className="md:col-span-7 h-[500px] md:h-full relative group overflow-hidden rounded-3xl">
          <img
            alt="Modern living room furniture"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYgqkTQqli4JK8nNm_A9wdyvrqSyTZOYSpox3ACyNhBteoRd7ac3DRyzg-ZSqjdNKMpAufagLRJ36QsQrHDvaeXYymoJ1EBBWScfUMESwWwc9m8VY8quUiiE5-jSE5QWoGeXFT2vpvLUn24JPIrf-Zhdb_0oI6VfbQtMIVdRjFjBLdslf9XAwnRca_VrJZ29fS43YeD2j6D3626Ha62e8t6oM8fHpbp_F9QLyLBzr5jJPsF5kacdRT1m3K95SQO0tEzsYKYyMGpH8"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-xl p-8 rounded-2xl max-w-md transform transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100">
              <h3 className="font-serif text-2xl text-gray-900 dark:text-white mb-2 italic">Interior Collection</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-light">Minimalist furniture designed for the modern sanctuary.</p>
              <Link to="/collection" className="group inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-900 dark:border-white pb-1 hover:text-primary hover:border-primary transition-colors">
                Discover Collection
                <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
        <div className="md:col-span-5 flex flex-col gap-6 h-full">
          <ScrollReveal variant="fade-right" delay={0.2} className="flex-1 relative group overflow-hidden rounded-3xl min-h-[300px]">
            <img
              alt="Detail shot of texture"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb8z3oZ9Jw5txmgQQKnsRVIr274SriCA_I6FOgGPzovCHiDVFwhhFbC2FvTR6d9cR3Sv1TusHfNL5fA-I0mj8AVjxAwDsJIEHN7sIAKgVRE3R0On0pqIuL6tdvcvKcjaMhqd_aVSxhGp2rblGEU8hvTrwQBKmas4wme31qj1NhLn9MagQK37JHSZP0x-oWwtYAm4-ll4VCyRNADSTxWkAM8tUFawBt28yyV4pBM-i0NrPkr5Pq3vcOmgCdjE9rO209T5bfA4zXFzI"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="font-serif text-xl italic mb-1">Textural Depth</h4>
              <p className="text-sm font-light text-white/80">Sustainable fabrics &amp; weaves</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-right" delay={0.4} className="flex-1 relative group overflow-hidden rounded-3xl min-h-[300px]">
            <img
              alt="Minimalist decor object"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFdH1pTN8IGGn7L2N8lub2v68G4T9o2YcO-727NFTBTe3gF_eWEWyjgspzGke20vSHTlTklCGowZdnCTtNgWMt4RiAUjDHdrD_fywwRCkSzv9KkJuccZQ846limJKNAEkzYySj_vQgHiCdDnKFrzEFKnI_czLsxXm2upg7_D6aXQ5Vp6R297dy0QeOFZKhS82DUl0SjPH1lnG6HBHlj7ThC_sQfnXSEtOW11v-KMRN4IzrwwRyjs5SJezo8O-xoG-nStSh44XEA6s"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="font-serif text-xl italic mb-1">Artisan Objects</h4>
              <p className="text-sm font-light text-white/80">Hand-crafted perfection</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
