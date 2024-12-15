import Navbar from '@/Components/me/sideNav'
import React from 'react'

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="container w-layout-grid me-wrapper">
      <div className="left-side">
        <Navbar />
      </div>
      <div className="right-side">
        {children}
      </div>
    </div>
  )
}
