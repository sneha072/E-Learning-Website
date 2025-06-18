import React from 'react'

const DashboardPage = () => {
  const stats = {
    totalCourses: 9,
    enrolledStudents: 23,
    lessonsCompleted: 3,
    progress: 56,
  };

  return (
    <div>
      {/* Section 1: Dashboard Heading */}
      <section className="bg-gradient-to-l from-white to-green-300 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800">📊 Welcome to Your Dashboard</h2>
          <p className="mt-4 text-lg text-gray-700">Track your course progress, student enrollments, and overall learning stats.</p>
        </div>
      </section>

      {/* Section 2: Stats Grid */}
      <section className="py-16 bg-gradient-to-l from-white to-green-300 text-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold text-green-400">📚 Total Courses</h4>
              <p className="mt-4 text-3xl font-bold text-gray-700">{stats.totalCourses}</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold text-green-400">👩‍🎓 Enrolled Students</h4>
              <p className="mt-4 text-3xl font-bold text-gray-700">{stats.enrolledStudents}</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold text-green-400">✅ Lessons Completed</h4>
              <p className="mt-4 text-3xl font-bold text-gray-700">{stats.lessonsCompleted}</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold text-green-400">📈 Overall Progress</h4>
              <div className="w-full bg-gray-300 h-4 rounded-full mt-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${stats.progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm font-semibold">{stats.progress}% Complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="bg-gradient-to-l from-white to-green-300 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800">Keep Pushing Forward!</h3>
          <p className="mt-4 text-lg text-gray-700">Stay consistent and complete your MERN stack journey. You’re doing great!</p>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage;
