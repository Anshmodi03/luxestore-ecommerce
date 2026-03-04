const logos = [
  { alt: 'Vogue Logo', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2hdtCWfChEho98nDce9OUELG-1EqP3toxQJfV9f_elD4jZ0U-7Ag-1rY6mhh1mZEaKCyTT9GBUZCI8pGAdhxZmYDKbKc-k1IocCWBrZ4oWz0qY4a2SOPrN1UzOy3JL20uHmmRz--aprelcM3PuClCNdtbgQQPujT2QgV4tXKxh-ADrKnzuujZzOH2bjUjTV8JhxFZ_A1pB-Z1bEHmM7DmJwzJs37sKoRc71vjlS764Ex1Ysj-p1S15CDnrDEgFU21VUSdmq_hvEg' },
  { alt: 'GQ Logo', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhshX87r5w4iti3YiMMVVpxMOEvVOn67eoAFOCOrOViR9dXYUOOz2QI3JD6EwA4CoOjo5OHu2XGjEEaeNAg6P60OYkskd1r-5cOtZE3QX0pNAAgvAyq5crchH5PQ2jIkHtkHLixDywNr07dLY9t7_macNDMur9ZkeqUSSdhVBaTxaKuierJ_MYtV9usm-SUPo2lQrnQzBVzSLyMAUTpKYT9GZSELiO_3dWrDI48ekQswuLG0ZFS0VCebNofn6skyNUhFsCq-SW3s' },
  { alt: 'Architectural Digest Logo', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCn32u0BBV9YNgymNtBbadQYHfxNhxvnJC7SheabuYvjv1hRLJBU4QQIsSaUnQqgyPQ2sKLh4Gz-gyUMHG7wi1ZwF_25Q5ZyGN1CzFett5xkBcauJvgFsmlEIEGUSQ07eEd_kAaYrShUEB8G_ZC4TjDz1F4BHNZFK0sAMn7Rs04YSxgSuyaZY7yK8AzwqpvZZs3-MQdgPdmwd-tNiMU2iq-Xj8PMhhywnk-9mkyxdG1xwEx1eFRxxboeTyGPL8VKpfMh0Oqwqcue4' },
  { alt: 'Wired Logo', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKysk06-WoxI2xbnO-KPIBI76sOQMgQ5c68VRT2ce6zqsAYMTSQ3B4pWMNOA9QddTDHxRYFQ1FBOStd32Mvrlle2CUs0rc1vxTzXu06dNwA6Org68Kqj8ZRc3ji3nFlIs3ggmyXdKzU2-bT_zxsKiz1XoPnevR0AVdrtdonsNjE6lQPIpu2hJliMOCoLmlB7Rs48OGcAuKSDZwm3jo2pvxD4_2YpjJbiNTVUEPNRZixoN_7NHn6I27a4Fy0Fmd52DLXrsCbZTf1Jo' },
  { alt: 'Elle Decor Logo', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6JC8GxadI7hBCnejtlt1PyKsAuKtt-ZZTPBXAvsyAgaGujmTDVcLEhNZsBSyOK4EDMc6y9n2xq9K_CpB9y8MbcOD9FD9RJLK-4Xc6iBo4d29C3n2Kq74G9mGyZHrRXUVw3CVoInNQ3QYHZc-eg9ozjyKxsKsiofa1RIAYgZOJQvlHFSpPE24iJ9s_voBQElBANcQ5czBC9xgiSEMeJiuZTM-e56NTrVUG6m7mqm0xeZueJYwQmXw8J3BAxdFqc_CXgdu9cyJqt2o' },
  { alt: "Harper's Bazaar Logo", src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa6LFFALG56TAJsEFTke3j7QXAYy0FELQRJHi_rVGO2PrXVPAbEZoICHwcBDpKGSg-nahoJRlEVd_AQHp_ePzSXylg-agGZWu5Y61pFVZ616z4wEAruMva2GMONH-zX_jzjDh6bHy3T9FSflHQIBm44NFeuLbyCY3i8k9NxJW_0Dt96PN9FrSLNC-ezaq_jk0fnNtC6bPQsuzu3QP7lJK8qydcynM6mQZU2xpAxUnDvmwHPOvQY7Qbz6rvPfKe3y4e1gkYZH9TdaQ' },
]

export default function BrandMarquee() {
  return (
    <section className="py-16 bg-gray-50/50 dark:bg-surface-dark border-y border-border-light dark:border-border-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Featured In</p>
      </div>
      <div className="relative w-full overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-linear-to-r from-gray-50/50 dark:from-surface-dark to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-linear-to-l from-gray-50/50 dark:from-surface-dark to-transparent"></div>
        <div className="flex w-[200%] animate-scroll-loop group-hover:[animation-play-state:paused]">
          {[0, 1].map((set) => (
            <div key={set} className="flex items-center justify-around w-1/2 shrink-0 px-8 gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {logos.map((logo) => (
                <img
                  key={`${set}-${logo.alt}`}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-8 md:h-10 w-auto object-contain dark:invert"
                  src={logo.src}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
