import { twMerge } from 'tailwind-merge'

/**
 * FIX: the previous version built buttonClass via plain string
 * concatenation (`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`).
 * That looks like "className wins because it's last," but Tailwind doesn't
 * work that way — two utility classes that target the same CSS property
 * (e.g. variants.outline's `border-primary-800` vs a caller's
 * `border-dark-800`) have equal specificity, so the winner is whichever
 * rule appears later in the COMPILED stylesheet, not later in this string.
 * That happened to work across the app so far purely because of Tailwind's
 * build-time class insertion order — fragile, and the exact kind of
 * "looks right today, breaks silently tomorrow" issue worth closing off
 * at the source rather than re-discovering per call site.
 *
 * twMerge resolves this correctly: it understands which utilities
 * conflict and always keeps the rightmost one, regardless of how the
 * compiled CSS happens to be ordered. Every existing call site
 * (Button variant="outline" className="border-dark-800 ...") now
 * resolves deterministically.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-primary-800 text-white shadow-sm shadow-primary-900/10 hover:bg-primary-900 focus:ring-primary-500 disabled:bg-primary-300',
    secondary: 'bg-sand-100 text-dark-900 hover:bg-sand-200 focus:ring-sand-400 disabled:bg-sand-100',
    outline: 'border border-primary-800 bg-white text-primary-800 hover:bg-primary-50 focus:ring-primary-500 disabled:border-primary-300 disabled:text-primary-300',
    ghost: 'text-primary-800 hover:bg-primary-50 focus:ring-primary-500 disabled:text-primary-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
  }

  const sizes = {
    sm: 'px-3.5 py-2 text-sm leading-none',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  }

  const buttonClass = twMerge(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
    className
  )

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClass}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button