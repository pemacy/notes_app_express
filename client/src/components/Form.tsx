import type { FormProps } from "../utils/types"

const Form = ({ onSubmit }: FormProps) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <fieldset className="space-x-2">
          <label htmlFor="content">Enter Content</label>
          <input
            id="content"
            type="text"
            className='border border-white rounded-md py-1 px-2' />
        </fieldset>
        <button
          type="submit"
          className="w-full mt-2 py-1 border border-sky-800 hover:border-sky-700 hover:bg-gray-800"
        >Submit</button>
      </form>
    </>
  )
}

export default Form
