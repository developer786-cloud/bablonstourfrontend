const EmptyState = ({
  icon = null,
  title = 'No Data Found',
  description = 'There is no data to display',
  action = null,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-4 py-12">
      {icon ? <div className="mb-4 text-5xl">{icon}</div> : null}
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mb-6 max-w-md text-center text-gray-600">{description}</p>
      {action}
    </div>
  )
}

export default EmptyState
