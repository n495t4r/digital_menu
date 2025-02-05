import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Bell, Search, Settings } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import Breadcrumbs from '@/Components/Breadcumbs/Breadcrumbs';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const appName = usePage().props.appName;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Navigation */}
            <nav className="border-b border-gray-100 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Left section - Logo and primary navigation */}
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="flex items-center space-x-3">
                                <ApplicationLogo className="h-10 w-auto fill-current text-indigo-600" />
                                <span className="hidden text-xl font-semibold text-gray-900 sm:inline-block">
                                    {appName}
                                </span>
                            </Link>

                            <div className="hidden md:flex md:space-x-6">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href="/"
                                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                                >
                                    Team
                                </NavLink>
                            </div>
                        </div>

                        {/* Right section - Search, notifications, and profile */}
                        <div className="flex items-center space-x-6">
                            {/* Search */}
                            <div className="hidden md:block">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className={`w-64 rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${showSearch ? 'block' : 'hidden md:block'
                                            }`}
                                        placeholder="Search..."
                                    />
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Notifications */}
                            <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600">
                                <Bell className="h-5 w-5" />
                                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
                            </button>

                            {/* Settings */}
                            <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600">
                                <Settings className="h-5 w-5" />
                            </button>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-3 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                                                alt={user.name}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <span className="hidden md:inline-block">{user.name}</span>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className="w-48">
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center space-x-2">
                                            <span>Profile</span>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center space-x-2">
                                            <span>Log Out</span>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex md:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} md:hidden`}>
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href="/">Home</ResponsiveNavLink>
                        <ResponsiveNavLink href="#">Team</ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-4">
                        <div className="flex items-center space-x-3">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                                alt={user.name}
                                className="h-10 w-10 rounded-full"
                            />
                            <div>
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="md:flex md:items-center md:justify-between">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Pass header as a prop to Breadcrumbs */}
                <Breadcrumbs header={typeof header === 'string' ? header : header?.props?.children} />
                <div className="rounded-lg bg-white p-6 shadow-sm">{children}</div>
            </main>
        </div>
    );
}