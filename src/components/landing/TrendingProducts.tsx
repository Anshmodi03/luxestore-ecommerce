import { ArrowRight, ShoppingBag } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
const products = [
  {
    name: 'Pro Audio ANC',
    category: 'Tech Accessories',
    price: '$254.99',
    oldPrice: '$299.00',
    badge: '-15% OFF',
    badgeClass: 'bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-900 dark:text-white',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPo8P4cDxfdUKmudDqePbAHX7zlYOJs13ae7xww1fEo3xASV-mBZoG-dNjSY0FoyCbSku_LPnCIwtZoYSWAnxIFPqC8OSYUwty71F3V-wDzdGDNfjKXq3SzzauZG0N4r486WMbOupdxI5Fv59HZIBsWqb2OScbdVLNlj9yLvQUynGHODZW2SFUPkDdXR2oP62ypFaYQISJdhCPRtu_FDma_ScZdsYv_gZASC3gF4PSvF6VH94TEFKVcR8AQzVFDZ_Ui42kUka_TH8',
  },
  {
    name: 'Series 7 Watch',
    category: 'Wearable Tech',
    price: '$399.00',
    oldPrice: null,
    badge: null,
    badgeClass: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj_r02CdbyrBNWXEw_9y-z1czwF7ud5m7rnVUOU1U6Y0KljdvPTGy3gtyCba1SCOuLyeAA8d0v_cogfg4TNwU9MS7v03famvMNC7rXNew1RVikSTJExzsyZfEUsHDLQnI37Frkv8lLvLb2meqXI1FX8o3wlu95AxWzLn1HOAknaQ4JUZk4tERGe0-MzwBxLgONP3i0OKpAK1Prh4-7J86P5Nme2IUJlIfZtssEaMsbF7vnXQU4TtphOGxhbaKe6VpNUw9dgZjgETw',
  },
  {
    name: 'Urban Runner X',
    category: 'Footwear',
    price: '$129.50',
    oldPrice: null,
    badge: 'New In',
    badgeClass: 'bg-primary text-white',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClpuBCmqyopMT5mRC7eSwOmR_UFjtw5St-WrBm90Syh18ysH6XU7YB7UWrhwMGouD421q1-i9uOaBfD7XqYnvAivjDxfhMfi3cOE7bm2VRXcK0RLS9iNpeP5RC_A5U_WWwrhHWIY4M_wUj_43siKuaYfbBk3blTCSs3-ufUNWUiFBY8esRh5Our-f_q1vGHZN6eTitDX41HcgqkwDTSyIiOZ72b-oURYNHXyVfQpIGtMdMGVbPolcrWhaS0nYL5qvAGK2eMxSv8ds',
  },
  {
    name: 'Radiance Serum',
    category: 'Skincare',
    price: '$75.00',
    oldPrice: '$89.00',
    badge: null,
    badgeClass: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA109h_srujTmf7cOHEilmenxQlFZ7dP5E-xEoK8zD12Kehq7QRZxUbC04YTlNg1pK-JEu4x_eb1dAGzYJP_k8VAmutKMYvMrqLKbdb0vaIgeFNynGQGFG6HXcdIPlt2KxZrzXn4rbmm1PpifiQk1zWv0wkeerfbFMY_Jepq_WhODi4WYGnf1nlt8SmqgqQrBG9ZIDPNTmUDMPzYEDEMrlugIYuX3kgJXrqZQlSqXTcTWI561nuCDiCd_lO-w5QM7XEtcaTEj-GuaA',
  },
]

export default function TrendingProducts() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-8xl mx-auto" id="trending">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-4">Trending Now</h2>
          <p className="text-gray-500 dark:text-gray-400 font-light text-lg">Curated favorites loved by our community.</p>
        </div>
        <Link className="group inline-flex items-center gap-2 font-medium text-gray-900 dark:text-white hover:text-primary transition-colors" to="/collection">
          View All Collection
          <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((p) => (
          <div key={p.name} className="group hover-lift">
            <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800 aspect-[4/5]">
              <img
                alt={p.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                src={p.image}
              />
              {p.badge && (
                <div className={`absolute top-4 left-4 ${p.badgeClass} text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm shadow-sm`}>
                  {p.badge}
                </div>
              )}
              <button className="absolute bottom-4 right-4 w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary hover:text-white">
                <ShoppingBag weight="fill" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-serif font-medium text-gray-900 dark:text-white mb-1">{p.name}</h3>
              <p className="text-gray-500 text-sm mb-3 font-light">{p.category}</p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{p.price}</p>
                {p.oldPrice && <span className="text-sm text-gray-400 line-through">{p.oldPrice}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
