import React from 'react'
import { Element } from 'react-ui'
import * as Icons from './icon'

function FileTree(props) {
  return <SubTree allFiles={props.files} {...props} />
}

function SubTree({ files, allFiles, selectedFile, onSelect, ...props }) {
  return (
    <Element {...props}>
      {files
        .filter(child => isRootLevel(files, child))
        .sort(sortingFunction)
        .map(child => (
          <React.Fragment key={child.id}>
            {child.type === 'directory' ? (
              <Directory
                files={files}
                allFiles={allFiles}
                selectedFile={selectedFile}
                onSelect={onSelect}
                {...child}
              />
            ) : (
              <File
                selectedFile={selectedFile}
                allFiles={allFiles}
                onClick={_ => onSelect(child)}
                {...child}
              />
            )}
          </React.Fragment>
        ))}
    </Element>
  )
}

function Directory(props) {
  const children = props.allFiles.filter(file => file.directory === props.id)

  const defaultOpen = isChildSelected({
    allFiles: props.allFiles,
    directory: props,
    selectedFile: props.selectedFile
  })

  const [open, setOpen] = React.useState(defaultOpen)
  const toggle = () => setOpen(!open)

  return (
    <>
      <File
        icon="ClosedDirectory"
        selectedFile={props.selectedFile}
        allFiles={props.allFiles}
        onClick={toggle}
        {...props}
      />
      {open ? (
        <SubTree
          files={children}
          allFiles={props.allFiles}
          selectedFile={props.selectedFile}
          onSelect={props.onSelect}
        />
      ) : null}
    </>
  )
}

function FileIcon({ name, extension }) {
  const Icon = Icons[extension] || Icons[name]
  return (
    <Element
      as="span"
      css={{
        display: 'flex',
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Icon />
    </Element>
  )
}

function File(props) {
  const isSelected = props.selectedFile && props.selectedFile.id === props.id
  const depth = getDepth(props.allFiles, props)

  return (
    <Element
      as="div"
      {...props}
      css={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme => theme.space[3] * (depth + 1),
        backgroundColor: isSelected ? 'grays.500' : 'transparent',
        ':hover': {
          cursor: 'pointer',
          backgroundColor: 'grays.500'
        },
        ...props.css
      }}
    >
      <FileIcon
        name={props.icon || 'File'}
        extension={props.name.split('.').pop()}
      />
      <Element as="span" css={{ marginLeft: 1 }}>
        {props.name}
      </Element>
    </Element>
  )
}

function sortingFunction(a, b) {
  // directories come first, sorted alphabetically
  // then files, also sorted alphabetically
  let first

  if (a.type === b.type) {
    if (a.name < b.name) first = a
    else first = b
  } else if (a.type === 'directory') {
    first = a
  } else {
    first = b
  }

  // js be weird
  if (first === a) return -1
  else return 1
}

function isRootLevel(files, file) {
  // find out if parent directory is in sub-tree

  const parentId = file.directory
  if (!parentId) return true

  const parent = files.find(file => file.id === parentId)
  if (!parent) return true
}

function getDepth(allFiles, file) {
  let depth = 0

  let parent = getParentDirectory(allFiles, file)

  while (parent) {
    depth++
    parent = getParentDirectory(allFiles, parent)
  }

  return depth
}

function isChildSelected({ allFiles, directory, selectedFile }) {
  const filesInCurrentSubTree = getFilesInSubTree(allFiles, selectedFile)

  return filesInCurrentSubTree.find(file => file.id === directory.id)
}

function getFilesInSubTree(allFiles, selectedFile) {
  if (!selectedFile) return []
  const currentModuleTree = [selectedFile]

  let parentDirectory = getParentDirectory(allFiles, selectedFile)

  while (parentDirectory) {
    currentModuleTree.push(parentDirectory)
    // get parent directory of the parent directory
    parentDirectory = getParentDirectory(allFiles, parentDirectory)
  }

  return currentModuleTree
}

function getParentDirectory(allFiles, file) {
  if (file.directory) {
    return allFiles.find(parent => parent.id === file.directory)
  }
}

export default FileTree
