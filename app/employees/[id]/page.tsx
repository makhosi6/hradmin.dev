import React from 'react'


type Props = {
    params: {
        id: string
    }
}



export default function Employee({params: {id}}: Props) {
  return (
    <div>Employee - {id} </div>
  )
}
