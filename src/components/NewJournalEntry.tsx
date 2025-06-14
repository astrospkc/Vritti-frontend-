import React from 'react'
import Sidebar from './Sidebar'
import Button from '../UIComponent/Button'

const NewJournalEntry = () => {

    const handleAddJournal = async () => {

    }
    return (
        <div className='flex flex-row w-full h-screen'>
            <Sidebar currentPage="community" />
            <div className='w-[80%] overflow-y-auto no-scrollbar m-4'>

                <h1 className='text-5xl font-bold font-sans text-yellow-100 mb-10 p-2 rounded-2xl shadow-lg shadow-black w-fit'>New Journal Entry</h1>
                <div className='m-3 bg-gray-800/40 min-h-screen p-4 rounded-2xl py-6 text-white '>
                    <input type="file" />
                    <input type="text" placeholder='title' className='p-4 rounded-3xl bg-gray-700 w-full my-3' />
                    <input type="text" placeholder='sub-title' className='p-4 rounded-3xl bg-gray-700 w-full my-3' />
                    <textarea id="body"
                        rows={20}
                        className='my-3 rounded-2xl bg-gray-700 p-4'
                        placeholder='body' style={{
                            width: '100%',
                            height: '100%',
                            resize: 'none'
                        }}></textarea>
                    <div className='flex flex-row '>
                        <Button onclick={handleAddJournal}>Save</Button>
                        <Button>Discard</Button>



                    </div>

                </div>





            </div>

        </div>
    )
}

export default NewJournalEntry
