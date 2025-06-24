import React, { useContext } from 'react'
import JournalCard from './cards/JournalCard'
import { journalContext } from '../context/JournalContext'

const WeeklyJournalSection = ({ week }) => {
  const { journalObject, monthYear } = useContext(journalContext)

  const data = Object.entries(journalObject[monthYear][week])
  console.log("data in weekly journal : ", data)
  data.map((item, i) => {
    const d = item[1]
    console.log(d.title)
  })
  return (
    <div>
      <h1 className='text-3xl text-yellow-100  mb-10 border-b-2 border-gray-600 p-2'>
        {week}
      </h1>
      <div className="grid grid-cols-5 gap-4">
        {data && data.map((item, index) => {
          const dateObj = new Date(item[1].date);

          // Format: "June 18, 2025"
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
          return (
            <JournalCard
              key={index}
              id={item[1]._id}
              title={item[1].title}
              subtitle={item[1].subtitle}
              body={item[1].body}
              date={formattedDate}
            />
          )
        })}
      </div>
    </div>
  )
}

export default WeeklyJournalSection
