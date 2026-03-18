import { AboutPreview } from "./About-Preview";
import { GraduationCap, Users, Briefcase } from "lucide-react";

export const About: React.FC = () => {
  return (
    <div id="about" className="min-h-screen">
      <div className="w-full flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              About the App
            </h1>
            <div className="w-20 h-1 bg-primary"></div>
          </div>

          {/* What the App Does */}
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Our Guidance Care Application is designed to streamline the
              process of managing appointments and scheduled sessions for
              students at the Guidance Office of the Jose Rizal Memorial State
              University Katipunan Campus. This intuitive platform simplifies
              scheduling, ensuring that students can easily book appointments
              for personal or academic support with just a few clicks.
            </p>
          </section>

          {/* Who It's For */}
          <section className="mb-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
              Who It's For
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    Students
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Easily book appointments for counseling, testing, or other
                    support services. Stay organized and get the help you need
                    from the Guidance Office on time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    Counselor
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Support students by coordinating with the Guidance Office
                    efficiently. Manage appointments and ensure students receive
                    timely assistance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    Staff
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Coordinate and manage appointments for counseling and
                    testing services. Keep scheduling organized and accessible
                    across the department.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* App Preview */}
          <AboutPreview />
        </div>
      </div>
    </div>
  );
};
