export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
}

export const collectionProducts: Product[] = [
  {
    id: "pro-audio-anc",
    name: "Pro Audio ANC",
    category: "Tech",
    price: 254.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPo8P4cDxfdUKmudDqePbAHX7zlYOJs13ae7xww1fEo3xASV-mBZoG-dNjSY0FoyCbSku_LPnCIwtZoYSWAnxIFPqC8OSYUwty71F3V-wDzdGDNfjKXq3SzzauZG0N4r486WMbOupdxI5Fv59HZIBsWqb2OScbdVLNlj9yLvQUynGHODZW2SFUPkDdXR2oP62ypFaYQISJdhCPRtu_FDma_ScZdsYv_gZASC3gF4PSvF6VH94TEFKVcR8AQzVFDZ_Ui42kUka_TH8",
    description: "This item represents the pinnacle of our craftsmanship. Designed for the modern aesthete, it combines functionality with timeless elegance."
  },
  {
    id: "series-7-watch",
    name: "Series 7 Watch",
    category: "Accessories",
    price: 399.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj_r02CdbyrBNWXEw_9y-z1czwF7ud5m7rnVUOU1U6Y0KljdvPTGy3gtyCba1SCOuLyeAA8d0v_cogfg4TNwU9MS7v03famvMNC7rXNew1RVikSTJExzsyZfEUsHDLQnI37Frkv8lLvLb2meqXI1FX8o3wlu95AxWzLn1HOAknaQ4JUZk4tERGe0-MzwBxLgONP3i0OKpAK1Prh4-7J86P5Nme2IUJlIfZtssEaMsbF7vnXQU4TtphOGxhbaKe6VpNUw9dgZjgETw",
    description: "Keep perfect time with a masterpiece of micro-engineering, wrapped in aerospace-grade titanium."
  },
  {
    id: "urban-runner-x",
    name: "Urban Runner X",
    category: "Footwear",
    price: 129.50,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClpuBCmqyopMT5mRC7eSwOmR_UFjtw5St-WrBm90Syh18ysH6XU7YB7UWrhwMGouD421q1-i9uOaBfD7XqYnvAivjDxfhMfi3cOE7bm2VRXcK0RLS9iNpeP5RC_A5U_WWwrhHWIY4M_wUj_43siKuaYfbBk3blTCSs3-ufUNWUiFBY8esRh5Our-f_q1vGHZN6eTitDX41HcgqkwDTSyIiOZ72b-oURYNHXyVfQpIGtMdMGVbPolcrWhaS0nYL5qvAGK2eMxSv8ds",
    description: "Seamlessly transition from the morning commute to evening runs with unmatched comfort."
  },
  {
    id: "radiance-serum",
    name: "Radiance Serum",
    category: "Beauty",
    price: 75.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA109h_srujTmf7cOHEilmenxQlFZ7dP5E-xEoK8zD12Kehq7QRZxUbC04YTlNg1pK-JEu4x_eb1dAGzYJP_k8VAmutKMYvMrqLKbdb0vaIgeFNynGQGFG6HXcdIPlt2KxZrzXn4rbmm1PpifiQk1zWv0wkeerfbFMY_Jepq_WhODi4WYGnf1nlt8SmqgqQrBG9ZIDPNTmUDMPzYEDEMrlugIYuX3kgJXrqZQlSqXTcTWI561nuCDiCd_lO-w5QM7XEtcaTEj-GuaA",
    description: "A potent blend of active ingredients designed to restore your skin's natural luminance."
  },
  {
    id: "arc-floor-lamp",
    name: "Arc Floor Lamp",
    category: "Home",
    price: 329.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5kLHcqLz_lJ5IICU7pcgfgUl6dFr3OZigARypjwtzNZoBOt33ldc6SMqYmN84ZqNFJy89CmLchoUWxr74eTQs7brB_fJ0ULgI03T9yOu_GoTLctFCehT3HK4suwYkhmm6z45pe4HJAgu7UD2FEgIOVF-plNTWSzg541feNHRIxAuHDgjyO--UUFSq2BNN8dt9zqOrMyYCyk6Y3CKu7Ri1Ai8r9y8Y7xcWHnDknMHOQBg13mxL0iyhlfw9x_VMOdyAPZB9maHF_QQ",
    description: "Sculptural lighting that transforms any room into a gallery space with warm, ambient glow."
  },
  {
    id: "velvet-lounge-chair",
    name: "Velvet Lounge Chair",
    category: "Furniture",
    price: 850.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqw8xzMl7mB8PaL9Zjc7P3YswgWlPh6TO6uN-wnPvR7NvNyTvuLOgo9U3oeNxo22SeCwl5dNjhj_J8iMbnj2anuvS4e5QNIdSv3-vJ0BqNuv_Rb5RAYDxOaNde84RQEt9Z4mVo48xmq9ml7a1ZCFRld4ag4R3bNh-5R5ZTRhNObz_b5gs2sW-G5PnBv3PulIX4dOxd1F7N0u2e61ud8sACfxkedvYklkZg0YXYKDZ-3kMNnradL13aJN9bTlJM2I5cban544dMPF0",
    description: "Sink into premium velvet upholstery paired with mid-century modern architectural lines."
  },
  {
    id: "aviator-classic",
    name: "Aviator Classic",
    category: "Eyewear",
    price: 145.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu38LODM6F6ETMFe7VUQkqeJuKd5qhruCwyto_oih1a4RjHfHWP9HQR1GfCKCIFxd_yz7Pl_jhZzTj_HCQCIx57in0taOrGfWFgpAMNt5FAiOieCEZaP7a0gKYgzudLp40i1N4anemEBkJVVDG4axA786f2AEiWsQtFf75rBdAlnk5aQaigsUzOxrZj83tWnOCNuJoWyiG-6Qa9lCI3YVZzwX4a8GHVBs4E45yCJkvHt6G0Pp8iXokQDW_L8eUIRIo9X1ob4nfcfI",
    description: "Iconic teardrop frames updated with polarized lenses and ultra-lightweight titanium."
  },
  {
    id: "minimalist-vase",
    name: "Minimalist Vase",
    category: "Decor",
    price: 45.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFdH1pTN8IGGn7L2N8lub2v68G4T9o2YcO-727NFTBTe3gF_eWEWyjgspzGke20vSHTlTklCGowZdnCTtNgWMt4RiAUjDHdrD_fywwRCkSzv9KkJuccZQ846limJKNAEkzYySj_vQgHiCdDnKFrzEFKnI_czLsxXm2upg7_D6aXQ5Vp6R297dy0QeOFZKhS82DUl0SjPH1lnG6HBHlj7ThC_sQfnXSEtOW11v-KMRN4IzrwwRyjs5SJezo8O-xoG-nStSh44XEA6s",
    description: "Matte ceramic beautifully shaped to enhance any floral arrangement."
  }
]
