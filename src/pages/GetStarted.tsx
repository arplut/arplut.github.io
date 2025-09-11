import WorkInProgressOverlay from "@/components/WorkInProgressOverlay";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle relative">
      <WorkInProgressOverlay />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Get Started with GEODHA
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Step-by-step guide to using our app for environmental reporting.
          </p>
          
          {/* Content will be added here later */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-500">
              Detailed instructions will be added here soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
