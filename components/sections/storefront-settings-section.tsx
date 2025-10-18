export function StorefrontSettingsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Storefront Settings
        </h1>
        <button className="bg-base-green hover:bg-base-green/90 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">
          Storefront settings content will be displayed here
        </p>
      </div>
    </div>
  );
}
