import { FaMicrophoneAlt } from 'react-icons/fa'

export const Header = () => {
  return (
    <div className="flex mt-4 mb-10 pb-4 border-b-2 border-y-gray-300 md:text-6xl text-3xl">
      <h1 className="tracking-widest mr-4 ml-4">
        <FaMicrophoneAlt />
      </h1>
      <h1 className="tracking-widest ">Quiz Rhyme</h1>
    </div>
  )
}
