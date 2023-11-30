import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TaList() {
  const { facultyId,courseId } = useParams();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    // Fetch course information based on facultyId
    fetch(`http://localhost:8080/api/home/faculty/courses/${facultyId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched course data:', data);
        setCourseList(data);
        console.log(courseId);
      })
      .catch((error) => {
        console.error('Fetch course error:', error);
      });
  }, [facultyId]);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">TA List</h1>

      {courseList.map((course)   => (
        <div key={course.courseId}>
          <h2 className="text-2xl font-bold mt-4">{course.courseName}</h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Student Roll No</th>
                <th className="py-2 px-4 border">Student Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(course.ta) && course.ta.length > 0 ? (
                course.ta.map((ta, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4 border">{ta.studentRollNo}</td>
                    <td className="py-2 px-4 border">{ta.studentName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 px-4 border text-center">
                    No TA information available for this course.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TaList;
