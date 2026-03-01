import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recovery Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive recovery platform for case management and workforce re-entry
          </p>
          <div className="space-y-4">
            <Link
              href="/programs"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Programs
            </Link>
            <div className="block">
              <Link
                href="/intake"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Start Intake Process
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Case Management</h3>
            <p className="text-gray-600">
              Trauma-informed case management with CCM-aligned workflows
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Workforce Re-entry</h3>
            <p className="text-gray-600">
              Safety-sensitive workforce re-entry compliance and SAP lane support
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Second Chance Trucking</h3>
            <p className="text-gray-600">
              CDL pathway with DBE packet support and Apache Driven model
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
