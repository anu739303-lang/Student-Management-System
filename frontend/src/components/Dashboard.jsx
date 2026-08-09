import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ students }) {
  const totalStudents = students.length;

  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  const totalCities = new Set(
    students.map((student) => student.city)
  ).size;

  // Course-wise student count
  const courseData = Object.values(
    students.reduce((acc, student) => {
      const course = student.course || "Unknown";

      if (!acc[course]) {
        acc[course] = {
          course: course,
          students: 0,
        };
      }

      acc[course].students += 1;

      return acc;
    }, {})
  );

const cityData = Object.values(
  students.reduce((acc, student) => {
    const city = student.city || "Unknown";

    if (!acc[city]) {
      acc[city] = {
        city: city,
        students: 0,
      };
    }

    acc[city].students += 1;

    return acc;
  }, {})
);



  return (
    <>
      {/* Dashboard Cards */}
      <div className="dashboard">

        <div className="stat-card students-card">
          <div className="stat-icon">👨‍🎓</div>

          <div className="stat-content">
            <p>Total Students</p>
            <h3>{totalStudents}</h3>
            <span>Registered students</span>
          </div>
        </div>

        <div className="stat-card courses-card">
          <div className="stat-icon">🎓</div>

          <div className="stat-content">
            <p>Total Courses</p>
            <h3>{totalCourses}</h3>
            <span>Available courses</span>
          </div>
        </div>

        <div className="stat-card cities-card">
          <div className="stat-icon">🏙️</div>

          <div className="stat-content">
            <p>Total Cities</p>
            <h3>{totalCities}</h3>
            <span>Student locations</span>
          </div>
        </div>

      </div>

      {/* Course Chart */}
      <div className="course-chart">

        <div className="chart-header">
          <h2>Course-wise Students</h2>
          <p>Number of students enrolled in each course</p>
        </div>

        {courseData.length === 0 ? (
          <p className="no-chart-data">
            No course data available.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={courseData}>
              <XAxis dataKey="course" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar
                dataKey="students"
                name="Students"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}

      </div>

{/* City Chart */}
<div className="course-chart city-chart">

  <div className="chart-header">
    <h2>City-wise Students</h2>
    <p>Number of students from each city</p>
  </div>

  {cityData.length === 0 ? (
    <p className="no-chart-data">
      No city data available.
    </p>
  ) : (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={cityData}>
        <XAxis dataKey="city" />

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Bar
          dataKey="students"
          name="Students"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )}

</div>


    </>
  );
}

export default Dashboard;