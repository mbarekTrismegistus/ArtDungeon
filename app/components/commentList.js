import React from 'react'
import Comment from './comment'

export default function CommentList(props) {

  return (
    <div className=''>
      {
        props.comments.map((c) => {
            return(
              <div key={c.id} className='dark:border-zinc-800 border-zinc-200 border-1 shadow rounded-xl p-3 my-3 bg-zinc-100 dark:bg-zinc-900 mx-7'>
                <Comment userId={props.userId} cg={props.cg} comment={c}/>
              </div>
            )
        })
      }
    </div>
  )
}
