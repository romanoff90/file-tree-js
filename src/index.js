import React from 'react'
import ReactDOM from 'react-dom'
import { Element, ThemeProvider } from 'react-ui'

import Sidebar from './components/sidebar'
import FileTree from './components/file-tree'
import Code from './editor/code'
import OpenInSandbox from './editor/open-in-sandbox'
import { useFilesFromSandbox } from './utils'

import './styles.css'
import theme from './theme'

/* SANDBOX ID
 *
 *
 *
 */
const CURRENT_SANDBOX_ID = '84jkx'
/*
 *
 *
 *
 */

const dummyFiles = [
  { dummy: true, id: 1, name: 'loading...', type: 'directory' }
]

function App() {
  const [files, setFiles] = React.useState(dummyFiles)
  const [selectedFile, setSelectedFile] = React.useState(null)

  useFilesFromSandbox(CURRENT_SANDBOX_ID, files => {
    // default selection, find any index.js
    if (!selectedFile) {
      setSelectedFile(files.find(file => file.name === 'index.js'))
    }

    setFiles(files)
  })

  const onSelect = file => setSelectedFile(file)

  return (
    <ThemeProvider theme={theme}>
      <Element as="main" css={{ display: 'flex' }}>
        <Sidebar>
          <FileTree
            files={files}
            selectedFile={selectedFile}
            onSelect={onSelect}
          />
        </Sidebar>
        <Code selectedFile={selectedFile} />
        <OpenInSandbox id={CURRENT_SANDBOX_ID} />
      </Element>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
