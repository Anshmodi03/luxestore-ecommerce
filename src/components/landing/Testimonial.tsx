import { Quotes } from '@phosphor-icons/react'
import ScrollReveal from '../common/ScrollReveal'

export default function Testimonial() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16">
      <ScrollReveal variant="fade-up" className="max-w-4xl mx-auto text-center">
        <Quotes weight="fill" size={48} className="text-primary/30 mb-8 inline-block" />
        <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-12 leading-tight">
          "LuxeStore has completely transformed how I shop for home essentials. The quality is unmatched and the aesthetic is exactly what I was looking for."
        </h2>
        <div className="flex items-center justify-center gap-4">
          <img
            alt="Sam Lee"
            className="w-14 h-14 rounded-full object-cover border-2 border-primary p-0.5"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMIMKl93shz5XTJC2_H1-5zJaVgvj-fqq4q69MDyQApI5Kj4hRE5t-070FFvNRfoVrJt1J8OojGCxzvUXoVyKWcNC7x5o_2P0q5ChpWMBQyH34S3HWe_QvsAFvR9grjyY7Viu54RJtDPEyjstPWrx_B9S8DOgUSN-HNJc4H1ja-cpiQvleg30PfKVP2FcVYPMyevllnlYTVA7dZibooVY7yU4gW_8nzxsH-bsy53UvTzhgSOCAkE6gRDbfS2BmywJonXuqVnDzU-M"
          />
          <div className="text-left">
            <h4 className="font-bold text-gray-900 dark:text-white">Isabella V.</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Interior Designer</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
