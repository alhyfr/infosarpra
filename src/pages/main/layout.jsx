import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, Search, Bell, User, BarChart3, Users, FolderOpen, Settings, LogOut } from 'lucide-react'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'team', label: 'Team', icon: Users, path: '/team' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/projects' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo & Menu Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleSidebar}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SIP</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">SIP Info</h1>
            </motion.div>
          </div>

          {/* Header Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            {/* Search */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </motion.div>

            {/* Notifications */}
            <motion.button
              className="relative p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-6 h-6 text-gray-700" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Profile */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <span className="text-gray-800 font-medium hidden md:block">Admin</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-lg z-50 lg:translate-x-0 lg:fixed lg:z-auto"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 border-b border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">SIP</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">SIP Info</h2>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-6">
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <motion.button
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeMenu === item.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30'
                        : 'hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className={`font-medium ${activeMenu === item.id ? 'text-gray-800' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                    {activeMenu === item.id && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-purple-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          {/* Sidebar Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 border-t border-gray-200"
          >
            <motion.button
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-600">Logout</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`pt-20 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-80' : 'lg:ml-0'
        }`}
      >
        <div className="p-8">
          {children}
        </div>
      </motion.main>
    </div>
  )
}

export default Layout