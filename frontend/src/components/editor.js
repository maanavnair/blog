import React from 'react'

const Editor = ({value, onChange}) => {
  return (
    <div>
        <label htmlFor='body'>Body</label>
        <textarea  
            value={value}
            className='body'
            onChange={e => onChange(e.target.value)} 
        />
    </div>
  )
}

export default Editor