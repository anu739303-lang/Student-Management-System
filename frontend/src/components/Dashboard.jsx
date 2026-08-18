import "./Dashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ students = [] }) {

  /* =========================
     BASIC STATISTICS
  ========================= */

  const totalStudents = students.length;

  const totalCourses = new Set(
    students.map((student) => student.course).filter(Boolean)
  ).size;

  const totalCities = new Set(
    students.map((student) => student.city).filter(Boolean)
  ).size;


  /* =========================
     AVERAGE AGE
  ========================= */

  const validAges = students
    .map((student) => Number(student.age))
    .filter((age) => !isNaN(age) && age > 0);

  const averageAge =
    validAges.length > 0
      ? (
          validAges.reduce((sum, age) => sum + age, 0) /
          validAges.length
        ).toFixed(1)
      : 0;


  /* =========================
     COURSE-WISE STUDENT COUNT
  ========================= */

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


  /* =========================
     CITY-WISE STUDENT COUNT
  ========================= */

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


  /* =========================
     MOST POPULAR COURSE
  ========================= */

  const mostPopularCourse =
    courseData.length > 0
      ? courseData.reduce((max, current) =>
          current.students > max.students
            ? current
            : max
        )
      : null;


  /* =========================
     RECENT STUDENTS
  ========================= */

  const recentStudents = [...students]
    .reverse()
    .slice(0, 5);


  /* =========================
     RETURN
  ========================= */

  return (
    <>

      {/* =========================
          DASHBOARD CARDS
      ========================= */}

      <div className="dashboard">

        {/* Total Students */}

        <div className="stat-card students-card">

          <div className="stat-icon">
            👨‍🎓
          </div>

          <div className="stat-content">

            <p>
              Total Students
            </p>

            <h3>
              {totalStudents}
            </h3>

            <span>
              Registered students
            </span>

          </div>

        </div>


        {/* Total Courses */}

        <div className="stat-card courses-card">

          <div className="stat-icon">
            🎓
          </div>

          <div className="stat-content">

            <p>
              Total Courses
            </p>

            <h3>
              {totalCourses}
            </h3>

            <span>
              Available courses
            </span>

          </div>

        </div>


        {/* Total Cities */}

        <div className="stat-card cities-card">

          <div className="stat-icon">
            🏙️
          </div>

          <div className="stat-content">

            <p>
              Total Cities
            </p>

            <h3>
              {totalCities}
            </h3>

            <span>
              Student locations
            </span>

          </div>

        </div>


        {/* Average Age */}

        <div className="stat-card age-card">

          <div className="stat-icon">
            🎂
          </div>

          <div className="stat-content">

            <p>
              Average Age
            </p>

            <h3>
              {averageAge}
            </h3>

            <span>
              Student average age
            </span>

          </div>

        </div>

      </div>


      {/* =========================
          COURSE CHART
      ========================= */}

      <div className="course-chart">

        <div className="chart-header">

          <h2>
            Course-wise Students
          </h2>

          <p>
            Number of students enrolled in each course
          </p>

        </div>


        {courseData.length === 0 ? (

          <p className="no-chart-data">
            No course data available.
          </p>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={courseData}>

              <XAxis
                dataKey="course"
              />

              <YAxis
                allowDecimals={false}
              />

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


      {/* =========================
          CITY CHART
      ========================= */}

      <div className="course-chart city-chart">

        <div className="chart-header">

          <h2>
            City-wise Students
          </h2>

          <p>
            Number of students from each city
          </p>

        </div>


        {cityData.length === 0 ? (

          <p className="no-chart-data">
            No city data available.
          </p>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={cityData}>

              <XAxis
                dataKey="city"
              />

              <YAxis
                allowDecimals={false}
              />

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


      {/* =========================
          DASHBOARD INSIGHTS
      ========================= */}

      <div className="dashboard-insights">


        {/* Most Popular Course */}

        <div className="insight-card">

          <div className="insight-icon">
            🏆
          </div>

          <div>

            <span>
              Most Popular Course
            </span>

            <h3>
              {mostPopularCourse
                ? mostPopularCourse.course
                : "No data"}
            </h3>

            {mostPopularCourse && (
              <p>
                {mostPopularCourse.students}{" "}
                {mostPopularCourse.students === 1
                  ? "student"
                  : "students"}{" "}
                enrolled
              </p>
            )}

          </div>

        </div>


        {/* Average Age */}

        <div className="insight-card">

          <div className="insight-icon">
            📊
          </div>

          <div>

            <span>
              Student Average Age
            </span>

            <h3>
              {averageAge} Years
            </h3>

            <p>
              Based on registered students
            </p>

          </div>

        </div>


        {/* Total Locations */}

        <div className="insight-card">

          <div className="insight-icon">
            📍
          </div>

          <div>

            <span>
              Student Locations
            </span>

            <h3>
              {totalCities}
            </h3>

            <p>
              Different cities represented
            </p>

          </div>

        </div>

      </div>


      {/* =========================
          RECENT STUDENTS
      ========================= */}

      <div className="recent-students">

        <div className="chart-header">

          <h2>
            Recent Students
          </h2>

          <p>
            Recently registered students
          </p>

        </div>


        {recentStudents.length === 0 ? (

          <p className="no-chart-data">
            No students registered yet.
          </p>

        ) : (

          <div className="recent-table-wrapper">

            <table className="recent-table">

              <thead>

                <tr>

                  <th>
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Course
                  </th>

                  <th>
                    City
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentStudents.map(
                  (student, index) => (

                    <tr
                      key={
                        student._id || index
                      }
                    >

                      <td>

                        <strong>
                          {student.name}
                        </strong>

                      </td>


                      <td>
                        {student.email}
                      </td>


                      <td>

                        <span className="course-badge">

                          {student.course ||
                            "Unknown"}

                        </span>

                      </td>


                      <td>
                        {student.city ||
                          "Unknown"}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>
  );
}

export default Dashboard;