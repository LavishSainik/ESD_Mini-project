import React from "react";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home(){
  
   // login validation
   const [email,setEmail] = useState("")
   const [password,setPassword]=useState("")
   const usenavigate=useNavigate()
   const login = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:8080/api/home/authenticate", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            
            username:email,
            password:password,
            mode: 1, 
          }),
        });

        if (response.status === 200) {
          console.log("Authentication successful");
          toast.success("Login successful by "+ email)
          usenavigate('/dashboard')
          
          // Handle successful login
        } else if (response.status === 401) {
          console.log("Authentication failed: Invalid email or password");
          toast.error('Invalid email or password');
        } else {
          console.log("Authentication failed: Something went wrong");
          toast.error('Authentication failed. Please try again later.');
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error('Network error. Please try again later.');
      }
    }
  };
   const validate=()=>{
    let result = true
    if(email==='' || email===null){
      result= false;
      toast.warning('please enter email')
    }
    if(password==='' || password===null){
      result = false;
      toast.warning('please enter password')
    }
    return result
   }
      
     
    return(
        <>
          <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        progressBarStyle={{ background: 'blue' }} 
        pauseOnHover
      />
      <div className="flex">
          <section className="ml-80">
  <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <div className="mb-2 flex justify-center">
        <svg
          width="50"
          height="56"
          viewBox="0 0 50 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          
         
        </svg>
        <img src="src/assets/logo.jpg" className='flex  w-1/3 justify-center relative left-80 ml-28 pb-9 bottom-10  ' alt="" />
      </div>
      <div className='relative bottom-12'>
      <h2 className="text-center text-2xl font-bold leading-tight text-black first-letter:text-blue-500">
          Faculty-Login
      </h2>
      
      
      <form action="#" onSubmit={login}  className="mt-3" >
        <div className="space-y-5">
          <div>
            <label  className="text-base font-medium text-gray-900 first-letter:text-blue-500"  >
              Email address
            </label>
            <div className="mt-2">
              <input onChange={(e)=>{setEmail(e.target.value)}}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Email"
                
                
              />
              
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label    className="text-base font-medium text-gray-900" placeholder="password first-letter:text-blue-500"> 
                Password
              </label>
              <a
                href="#"
                title=""
                className="text-sm font-semibold text-black hover:underline"
              >
                {" "}
                Forgot password?{" "}
              </a>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} type="password"
              />
               
            </div>
          </div>
          <div>
            <button
               type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
            
              Get started
             
            </button>
          </div>
        </div>
      </form>
      <div className="mt-3 space-y-3">
        <button
          type="button"
          className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          <span className="mr-2 inline-block">
          
          </span>
          Student Login
        </button>
        <button
          type="button"
          className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          
           Sign in
        </button>
        </div>
      </div>
      
    </div>
  </div>
</section>

<section className="ml-80 mt-80 ">
  <div className="flex">
   <div  className=" text-3xl font-extrabold text-center first-letter:text-blue-500" >
     ESD 
   </div>
   <div className="text-3xl font-extrabold text-center first-letter:text-blue-500 ml-6"> {"  "} MINI</div>
   <div className="text-3xl font-extrabold text-center first-letter:text-blue-500 ml-6"> {"  "} PROJECT</div>

   </div>
     <h1 className="mt-5 text-2xl relative left-32 font-extrabold ">2.4</h1>
   <p className="text-center relative right-28 mt-7 font-semibold first-letter:text-blue-500" >
   Ask the faculty to login and allow him to register <br /> a student as a TA  and then allocate him to a
particular course among the <br /> courses(Drop Down Selection) that the faculty teaches.
   </p>
   
</section>

</div>
        </>
    )
}
export default Home