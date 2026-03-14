# shadcn/ui Component Patterns

## Installation & Setup
```bash
npx shadcn@latest init
# Choose: New York style, Tailwind CSS, CSS variables, aliases (@/components)

# Add components individually
npx shadcn@latest add button card dialog sheet input form toast
```

## Component Usage Patterns
```jsx
// Button variants
import { Button } from '@/components/ui/button'

<Button variant="default">Add to Cart</Button>
<Button variant="outline" size="sm">View Details</Button>
<Button variant="ghost" size="icon"><Heart /></Button>
<Button variant="destructive">Remove</Button>
<Button asChild><Link href="/shop">Browse</Link></Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Adding...
</Button>
```

## Card Pattern (Product Cards)
```jsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function ProductCard({ product }) {
  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0 relative">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square object-cover transition-transform group-hover:scale-105"
        />
        {product.sale && (
          <Badge className="absolute top-2 right-2" variant="destructive">Sale</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-lg">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
```

## Dialog & Sheet (Modals & Drawers)
```jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

// Quick view modal
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Quick View</Button>
  </DialogTrigger>
  <DialogContent className="max-w-3xl">
    <DialogHeader>
      <DialogTitle>{product.name}</DialogTitle>
    </DialogHeader>
    <ProductQuickView product={product} />
  </DialogContent>
</Dialog>

// Cart drawer
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="relative">
      <ShoppingCart />
      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
        {count}
      </Badge>
    </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Cart ({count})</SheetTitle>
    </SheetHeader>
    <CartItems />
  </SheetContent>
</Sheet>
```

## Form with Validation (React Hook Form + Zod)
```jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile'),
  address: z.string().min(10, 'Full address required'),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
})

function CheckoutForm({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: '', email: '', phone: '', address: '', pincode: '' },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl><Input placeholder="Ansh" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {/* Repeat for other fields */}
        <Button type="submit" className="w-full">Place Order</Button>
      </form>
    </Form>
  )
}
```

## Dark Mode
```jsx
// tailwind.config.js
module.exports = { darkMode: 'class' }

// Theme toggle
import { useTheme } from 'next-themes' // or custom context

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

## Custom Theme Colors
```css
/* globals.css — customize your brand */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 262 83% 58%;        /* your brand purple */
    --primary-foreground: 0 0% 98%;
    --accent: 35 100% 50%;         /* your brand orange */
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --destructive: 0 84% 60%;
    --ring: 262 83% 58%;
    --radius: 0.75rem;
  }
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 262 83% 68%;
    /* ... dark variants */
  }
}
```

## Toast Notifications
```jsx
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

// In layout
<Toaster />

// Usage
const { toast } = useToast()

toast({
  title: 'Added to cart',
  description: `${product.name} × 1`,
  action: <ToastAction altText="View cart" onClick={() => router.push('/cart')}>View Cart</ToastAction>,
})

// Destructive
toast({
  variant: 'destructive',
  title: 'Payment failed',
  description: 'Please try again or use a different method.',
})
```

## Common Patterns
- Use `cn()` utility (from `lib/utils`) to merge Tailwind classes conditionally
- Use `asChild` prop to render shadcn styling on your own element/Link
- Extend components by wrapping, not modifying source files
- Icons: use `lucide-react` (already a shadcn dependency)
- Use `Separator`, `Skeleton`, `ScrollArea` for polish
- Combine `Command` + `Popover` for searchable dropdowns (combobox)
