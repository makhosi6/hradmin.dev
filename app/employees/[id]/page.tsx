import React from 'react'


type Props = {
    params: {
        id: string
    }
}



export default async function Employee({params: {id}}: Props) {

  // await fetch("https://byteestudio.com/terms-of-service");
  return (
    <div>Employee - {id} </div>
  )
}
