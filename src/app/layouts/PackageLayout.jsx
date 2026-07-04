import { Outlet } from 'react-router-dom'

const PackageLayout = () => {
  return (
    <section className="bg-white">
      <div className="border-b border-gray-200 bg-primary-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
            Curated journeys
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Travel Packages
          </h1>
          <p className="mt-3 max-w-2xl text-gray-700">
            Compare destinations, durations, and budgets to find a trip that fits your plan.
          </p>
        </div>
      </div>
      <Outlet />
    </section>
  )
}

export default PackageLayout
