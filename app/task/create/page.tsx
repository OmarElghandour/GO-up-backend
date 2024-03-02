'use client';
import { PrismaClient } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
import { AppProps } from 'next/app';
import React, { useState, FormEvent, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { User } from '@prisma/client'; // Import User type from Prisma

const prisma = new PrismaClient();

type Task = {
  id: string,
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  title : string;
  user : User
};

type Users = {
  name: string | undefined | null;
  email: string | undefined | null;
}

export default function Page({pageProps }: AppProps) {



  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask]  = useState<Task | null>(null);
  const [user, setUser]  = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userSession, setuserSession] = useState<any>(null);

  const { data: session } = useSession();


  useEffect(() => {
    if (session && session.user) {
      const newUser = {
        email: session.user.email,
        name: session.user.name
      };
      // console.log(newUser);
      setuserSession(session?.user);
    }
  }, [session]);

  const [inputFields, setInputFields] = useState({
     name : '',
     description : ''
   });

   useEffect(() => {
    if (userSession?.email) {

      console.log(userSession);

      (async () => {
        const response = await fetch('/api/user/', {
          method: 'POST',
          body: JSON.stringify( {
            email: userSession?.email,
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to submit the data. Please try again.')
        }


        // Handle response if necessary
        const data = await response.json();
        console.log(data);
      }
        
      )();
    }
   },[user]);

  const createTask = (event: FormEvent<HTMLFormElement>) => {

    console.log(inputFields);
    // Create a new object with a unique id
    const newObject: Task = {
      id: Math.random().toString(),
      title : inputFields.name,
      name: inputFields.name,
      description: inputFields.description,
      startDate : new Date(startDate).getTime().toString(),
      endDate : new Date(startDate).getTime().toString(),
      user : user
    };

    console.log('==========================');
    setTask(newObject);
    // Use the callback form of setState to ensure you are working with the latest state
    setTasks((prevArray) => [...prevArray, newObject]);
  };


  useEffect(() => {
    console.log(tasks);
  },[tasks])

  useEffect(() => {
    console.log(inputFields);
  },[inputFields]);


  async function onSubmit(event: any) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts
 
    console.log(event.target.value);
    try {
      createTask(event);


      console.log('----------------------------');

      const response = await fetch('/api/task/create', {
        method: 'POST',
        body: JSON.stringify(task),
      })
 
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      // Handle response if necessary
      const data = await response.json();

      // ...
    } catch (error: any) {
      // Capture the error message to display to the user
      // setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
 
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFields(
      prev => ({
        ...prev,
        [name] : value
      })
     )
  }
  
  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="names"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="name"
                  onChange={event => handleFormChange(event)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="description"
                  onChange={event => handleFormChange(event as any)}
                />
              </div>
            </div>
            
            <div>
                <label htmlFor="startDate">
                    Start Date
                </label>

            <DatePicker
              selected={startDate}
              onChange={(date: React.SetStateAction<Date>) => setStartDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
            </div>

            <div>
                <label htmlFor="endDate">
                    End Date
                </label>
                <DatePicker
                 selected={endDate} 
                 onChange={(date: React.SetStateAction<Date>) => setEndDate(date)}
                 dateFormat="MM/dd/yyyy h:mm aa"
                 id="endDate" 
                 timeInputLabel="Time:"
                 showTimeInput
                />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </form>
      <div>
        {
          tasks.map(item => {
            return( <div key={item.id}>
              <p>{item.name}</p>
            </div>)
          })
        }
      </div>
    </div>



  )
}


