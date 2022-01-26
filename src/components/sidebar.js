import React from 'react'
import { Element } from 'react-ui'

function Sidebar(props) {
  return (
    <Element
      as="aside"
      {...props}
      css={{
        display: 'block',
        width: 250,
        height: '100vh',
        borderRight: '2px solid',
        borderColor: 'grays.500',
        paddingTop: 3
      }}
    />
  )
}

export default Sidebar
