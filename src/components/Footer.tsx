import React from 'react'

function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-400">© 2026 TechStore. All rights reserved.</p>
                <div className="flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span className="hover:text-purple-600 cursor-pointer">Privacy</span>
                    <span className="hover:text-purple-600 cursor-pointer">Terms</span>
                    <span className="hover:text-purple-600 cursor-pointer">Support</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
