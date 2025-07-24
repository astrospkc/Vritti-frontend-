"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const Dashboard_Page = dynamic(() => import("../../components/DashboardPage"), { ssr: false })

const Dashboard = () => {
  return (
    <div>
      <Dashboard_Page />
    </div>
  )
}

export default Dashboard
