import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const activeStyles = {
        color: 'white',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('You logged out')
    }

     return (
        <div className='flex py-4 justify-between items-center'>
            <span className='flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm px-4 py-2'>
                Iryna's blog for posts
            </span>

            {isAuth && (
                <ul className='flex gap-8'>
                    <li>
                        <NavLink
                            to={'/'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Main
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            My posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className='text-xs text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Add post
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className='flex justify-center items-center bg-orange-600 text-xs text-white rounded-sm px-4 py-2'>
                {isAuth ? (
                    <button onClick={logoutHandler}>Exit</button>
                ) : (
                    <Link to={'/login'}> Enter </Link>
                )}
            </div>
        </div>
    )
}

