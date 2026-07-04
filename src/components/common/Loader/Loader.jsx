const Loader = ({ size = 'md', variant = 'spinner', text = '' }) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size]

  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className={`${sizeClass} bg-primary-600 rounded-full animate-bounce`}
            style={{ animationDelay: `${dot * 0.2}s` }}
          ></div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClass} border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin`}></div>
      {text && <p className="mt-3 text-gray-600 text-sm">{text}</p>}
    </div>
  )
}

export default Loader
