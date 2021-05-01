import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { FIREBASE_AUTH_URL, BACKEND_URL } from '../../config/config'
import { User } from '../../interfaces/Interface'

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [registering, setRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    // const ref = Firebase.firestore().collection('users');

    const signUpWithEmailAndPassword = async () => {
      const url = FIREBASE_AUTH_URL;
     
      const req = {
          email: email,
          password: password, 
          returnSecureToken: true
      };
      
      const res: any = await axios.post(url, req)
    

    };


    // const createUser = async (id: string) => {
    //   const user: Partial<User> = {
    //       id: id,
    //       email: email, 
    //       fullName: firstName + lastName,
    //       doctorId: 
    //   };

    //   const res = await axios.post(BACKEND_URL, user);
      
    //   // set local storage doctor value

        
    // };

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img
                src="https://source.unsplash.com/random"
                alt=""
                className="w-full h-full object-cover"
                />
            </div>

            <div
                className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                        flex items-center justify-center"
            >
                <div className="w-full h-100">
                <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                    Create an account
                </h1>

                <form className="mt-6">
                    <div className="flex flex-col md:flex-row pb-4 justify-between">
                        <div>
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter First Name"
                            className="w-full lg:w-11/12 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none flex justify-end"
                            autoFocus
                            required
                            onChange={event => setFirstName(event.target.value)}
                        />
                        </div>
                        <div>
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter Last Name"
                            className="w-full lg:w-11/12 px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            autoFocus
                            required
                            autoComplete="new-password"
                            onChange={event => setLastName(event.target.value)}
                        />
                        </div>
                    </div>
                    <div>
                    <label className="block text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        required
                        autoComplete="new-password"
                        onChange={event => setEmail(event.target.value)}
                    />
                    </div>

                    <div className="mt-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                                focus:bg-white focus:outline-none"
                        required
                        autoComplete="new-password"
                        onChange={event => setPassword(event.target.value)}
                    />
                    </div>

                    <div className="mt-4">
                    <label className="block text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Enter Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                                focus:bg-white focus:outline-none"
                        required
                        autoComplete="new-password"
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                    </div>


                    <button
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                        px-4 py-3 mt-6"
                        type="button"
                        // onClick={() => signUpWithEmailAndPassword()}
                    >
                        Register
                    </button>
                </form>

                <hr className="my-6 border-gray-300 w-full" />

                <button
                    type="button"
                    className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                    disabled={registering}
                >
                    <div className="flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="w-6 h-6"
                        viewBox="0 0 48 48"
                    >
                        <defs>
                        <path
                            id="a"
                            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                        />
                        </defs>
                        <clipPath id="b">
                        <use xlinkHref="#a" overflow="visible" />
                        </clipPath>
                        <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                        <path
                        clipPath="url(#b)"
                        fill="#EA4335"
                        d="M0 11l17 13 7-6.1L48 14V0H0z"
                        />
                        <path
                        clipPath="url(#b)"
                        fill="#34A853"
                        d="M0 37l30-23 7.9 1L48 0v48H0z"
                        />
                        <path
                        clipPath="url(#b)"
                        fill="#4285F4"
                        d="M48 48L17 24l-4-3 35-10z"
                        />
                    </svg>

                    <span className="ml-4">Log in with Google</span>
                    </div>
                </button>
                <h2 className="my-4 flex items-center justify-center flex-col">
                    <Link to="/login">
                        <p className="text-blue-500 hover:text-blue-700 font-semibold">
                            Go back to Login
                        </p>
                    </Link>
                </h2>
                </div>
            </div>
        </section>
    )
}

export default Register
