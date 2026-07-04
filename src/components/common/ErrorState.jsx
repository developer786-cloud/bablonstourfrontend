const ErrorState = ({ title = 'Something went wrong', description = 'Please try again after a moment.' }) => (
  <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
    <h2 className="text-xl font-black text-red-700">{title}</h2>
    <p className="mt-2 text-sm text-red-600">{description}</p>
  </div>
)

export default ErrorState
