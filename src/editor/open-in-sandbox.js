import React from 'react'
import { Element } from 'react-ui'

function OpenInSandbox(props) {
  return null
  return (
    <Element
      as="a"
      href={'https://codesandbox.io/s/' + props.id}
      css={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        border: '1px solid',
        borderColor: 'grays.200',
        color: 'white',
        backgroundColor: 'grays.700',
        borderRadius: 3,
        padding: 2,
        textDecoration: 'none'
      }}
    >
      Open Sandbox
    </Element>
  )
}

export default OpenInSandbox
