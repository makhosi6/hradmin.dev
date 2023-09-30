import React from 'react'

type Props = {
    params: {
        id: string
    }
}

export default function Dept({params: {id}}: Props) {
    return (
      <div>Dept - {id} </div>
    )
  }
  