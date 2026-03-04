export default function FoundersQuote() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-background-dark overflow-hidden transition-colors duration-500">
      <div className="max-w-[1000px] mx-auto relative">
        <div className="absolute -top-16 -left-10 text-[200px] leading-none text-slate-100 dark:text-gray-800 font-serif select-none transition-colors duration-500">“</div>
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-serif font-medium leading-snug italic mb-8 transition-colors duration-500">
              "We wanted to create objects that didn't just occupy space, but <span className="text-primary not-italic font-bold">elevated the moments</span> in which they were used."
            </h2>
            <div className="flex flex-col gap-1">
              <span className="text-gray-900 dark:text-white font-bold text-lg uppercase tracking-wide transition-colors duration-500">Elena &amp; Marco Rossi</span>
              <span className="text-primary text-sm font-medium">Co-Founders, LuxeStore</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-72 h-96">
              <div className="absolute top-4 -right-4 w-full h-full border-2 border-primary rounded-lg z-0"></div>
              <img alt="Portrait of two founders in a studio setting" loading="lazy" decoding="async" className="w-full h-full object-cover rounded-lg relative z-10 shadow-xl grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTGm6JVzb6xR9PeHOdGJcOxNcq5qbZDlZuBoFFuHgbSJhPCC_QMAYSfnRdmDLUbaScgeN7Ez8BBujI5nomlCrd4k3oaXaQy77rdY-1Hm2SJlwRqMhdFwX05eMKWjfl6WyLmSmDPVm3yUd7J3XU41smE11HQ3KKjACokIKc2MG9h5dn-sddA4fVIDjwZF-WFLII0n9Wur6uz2eoMS52WwpLOtMCvBSwH6r12MsUA0owtN6_DD4L0LHxALrolCAgqiqe57aRB6Nduoc"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
