const Input = ({
  type = 'text',
  placeholder = '',
  error = false,
  disabled = false,
  label = '',
  required = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none'
  const errorStyles = error
    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
    : 'border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-100'
  const disabledStyles = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'

  const inputClass = `${baseStyles} ${errorStyles} ${disabledStyles} ${className}`.trim().replace(/\s+/g, ' ')

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input
