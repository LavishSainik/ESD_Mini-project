// src/components/FacultyDashboard.js
import React, { useState,useEffect } from 'react';

function Dashboard(){

  const [facultyData, setFacultyData] = useState(null);

  useEffect(() => {
    // Fetch faculty data after login
    fetchFacultyData();
  }, []); // This effect runs once after the component mounts

  const fetchFacultyData = () => {
    // Assume you have some way to identify the logged-in faculty, e.g., from authentication state
    const facultyCode = 'FC00#'; // Replace with the actual faculty code

    // Fetch faculty data based on faculty code
    fetch(`http://localhost:8080/aux/faculty?code=${facultyCode}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch faculty data');
        }
      })
      .then((data) => {
        setFacultyData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        toast.error('Failed to fetch faculty data');
      });
  };

  return (
    <div>
      <h2>Welcome to the Dashboard, {facultyData?.name}!</h2>

      {facultyData?.courses ? (
        <div className="course-cards">
          {facultyData.courses.map((course) => (
            <div key={course.id} className="card" onClick={() => handleCardClick(course)}>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const handleCardClick = (course) => {
  // Handle the click event for the course card, e.g., navigate to the course details page
  console.log(`Clicked on course: ${course.name}`);
  // Add your navigation logic or other actions here
};

export default Dashboard