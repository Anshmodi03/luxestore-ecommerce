import { Plant, Medal, Heart } from '@phosphor-icons/react'

const values = [
  { icon: <Plant weight="fill" size={20} />, title: 'Consciously Crafted', desc: 'We prioritize partners who use sustainable materials and ethical practices.' },
  { icon: <Medal weight="fill" size={20} />, title: 'Uncompromising Quality', desc: 'Rigorous testing ensures that what you buy lasts a lifetime.' },
  { icon: <Heart weight="fill" size={20} />, title: 'Curated with Love', desc: 'Hand-picked selections that bring joy and utility to your daily routine.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 bg-gray-50 dark:bg-surface-dark/50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              alt="Portrait of two founders in a studio setting"
              className="w-full h-[500px] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTGm6JVzb6xR9PeHOdGJcOxNcq5qbZDlZuBoFFuHgbSJhPCC_QMAYSfnRdmDLUbaScgeN7Ez8BBujI5nomlCrd4k3oaXaQy77rdY-1Hm2SJlwRqMhdFwX05eMKWjfl6WyLmSmDPVm3yUd7J3XU41smE11HQ3KKjACokIKc2MG9h5dn-sddA4fVIDjwZF-WFLII0n9Wur6uz2eoMS52WwpLOtMCvBSwH6r12MsUA0owtN6_DD4L0LHxALrolCAgqiqe57aRB6Nduoc"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          </div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-40"></div>
        </div>
        <div className="w-full lg:w-1/2 space-y-10">
          <div>
            <h2 className="text-4xl font-serif font-medium text-gray-900 dark:text-white mb-6">Why discerning clients choose LuxeStore.</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg font-light leading-relaxed">
              We are a community of taste-makers and quality seekers. Every product has a story, a purpose, and a place in your life.
            </p>
          </div>
          <div className="space-y-6">
            {values.map((v) => (
              <div key={v.title} className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{v.title}</h4>
                  <p className="text-sm text-gray-500 font-light">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
