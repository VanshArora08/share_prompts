
import Link from "next/link"
import {motion} from 'framer-motion'


export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit}) {
  return (
    <div>
      <section className="w-full max-w-full flex-start flex-col">
        <motion.h1 className="head_text text-left"
        initial={{
          // y:-10,
          rotateX:-90
        }}
        animate={{rotateX:0}}
        transition={{delay:0.5}}
        >

          <span className="blue_gradient">
            {type} Post
          </span>
        </motion.h1>
        <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
        </p>
        <form action=""
          onSubmit={handleSubmit}
          className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'

        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Your AI prompt
            </span>
            <textarea 
              value={post.prompt}
              onChange={(e)=>setPost({...post,prompt:e.target.value})}
              placeholder="Write your prompt here..."
              required
              className="form_textarea"
            >

            </textarea>
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag
              <span className="font-normal"> (#product, #webdevelopment, #idea)</span>
            </span>
            <input 
              value={post.tag}
              onChange={(e)=>setPost({...post,tag:e.target.value})}
              placeholder="#tag"
              required
              className="form_input"
            >

            </input>
          </label>
          <div className="flex-end mx-3 mb-5 gap-4">
            <Link
              href="/"
              className="text-gray-500 text-sm"
            >Cancel</Link>
            <button type="submit"
              disabled={submitting}
              className="px-5 py-1.5 bg-primary-orange text-sm rounded-full text-white"
            >
              {submitting?`${type}...`:type}
            </button>
          </div>

         </form>
      </section>
    </div>
  )
}
