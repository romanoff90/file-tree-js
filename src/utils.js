import React from 'react'

function useFilesFromSandbox(id, callback) {
  React.useEffect(function() {
    fetch('https://codesandbox.io/api/v1/sandboxes/' + id)
      .then(response => response.json())
      .then(({ data }) => {
        const files = [...data.modules, ...data.directories]

        const prettyFiles = files.map(file => {
          return {
            id: file.shortid,
            name: file.title,
            directory: file.directory_shortid,
            type: file.code ? 'file' : 'directory',
            code: file.code
          }
        })

        callback(prettyFiles)
      })
  }, [])
}

export { useFilesFromSandbox }
