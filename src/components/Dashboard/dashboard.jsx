import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Dashboard() {
  const { facultyId } = useParams();
  const [facultyData, setFacultyData] = useState(null);

  useEffect(() => {
    // Fetch faculty data after login
    fetchFacultyData();
  }, [facultyId]); // This effect runs once after the component mounts
   
  
  const fetchFacultyData = () => { 
    // Assume you have some way to identify the logged-in faculty, e.g., from authentication state
    // Replace with the actual faculty code
   

    // Fetch faculty data based on faculty code
    fetch(`http://localhost:8080/api/home/faculty/courses/${facultyId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        setFacultyData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Assuming you have a toast library for showing notifications
        toast.error('Failed to fetch faculty data');
      });
  };

  return (
    <>
    <div>
    {facultyData ? (
            facultyData.slice(0, 1).map((course) => (  
                
               <div className='py-16'>
                <h1 className='text-2xl text-center font-extrabold  '>Courses Offered by  {course.faculty.name}</h1>
                <h1 className='text-xl text-center font-extrabold  '>{course.faculty.email}</h1>
                <h1 className='text-xl text-center font-extrabold  '>{course.faculty.facCode}</h1>

                </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
    </div>
    <div className='flex justify-center'> 
    <div className="w-full max-w-md p-4  shadow-lg bg-white border border-gray-200 rounded-2xl sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex items-center justify-center mb-4 ">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Courses Offering
        </h5>
        
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {facultyData ? (
            facultyData.map((course) => (
              <li key={course.courseId} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* Assuming you have some logic to generate the image source */}
                    
                  </div>
                  <div className='flex'>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {course.courseName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {course.courseCode}
                    </p>
                     
                  </div>
                  <Link
                  to={`/course/${facultyId}/${course.courseCode}`} 
                  className='pl-20 pb-4 text-sm text-white hover:text-blue-500 font-medium'
                >
                  Explore
                </Link>                  </div>
                 
                </div>
              </li>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </div>
    </div>
    </>
  );
}

export default Dashboard;
