import React from 'react'
import Highlight from 'react-highlight'
import { Element } from 'react-ui'
import './highlight.css'

function Code({ selectedFile, ...props }) {
  if (!selectedFile) return null

  const code = selectedFile.code
  let extension = selectedFile.name.split('.').pop()

  return (
    <Element
      as="pre"
      css={{
        width: 'calc(100% - 250px)',
        margin: 0,
        paddingY: 2,
        paddingX: 3,
        fontSize: 4,
        height: '100vh',
        overflow: 'scroll',
        '> pre': { margin: 0 }
      }}
      {...props}
    >
      <Highlight className={extension}>{code}</Highlight>
    </Element>
  )
}

export default Code
