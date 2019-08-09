const cellSize = '65px',
cellSizeNum = 65

const table = {
  column: {
    // flex
    display: 'flex',
    flexDirection: 'column',

    // size
    width: cellSize,
    minHeight: cellSize,

    // alignment
    textAlign: 'center',

  },
  row: {
    // flex
    display: 'flex',
    flexDirection: 'row',

    // alignment
    textAlign: 'center',
    
    // size
    minWidth: cellSize,
    height: cellSize,
  },
  nameContainer: {
    // border: '1px red solid',
    // borderRadius: '50%',

    // size
    width: cellSize,
    height: cellSize,

    // alignment
    textAlign: 'inherit',
    position: 'relative',

  },
  name: {
    appearance: 'none',
    border: 'none',
    background: 'transparent',
    padding: 0,
    outline: 0,
    borderRadius: 0,
    fontSize: 'small',
    fontWeight: 'normal',
    userSelect: 'none',

    width: cellSize,
    textAlign: 'inherit',
    lineHeight: cellSize,

  },
  controls: {
    width: cellSize,
    height: '7px',
    position: 'absolute',
    bottom: 0,
  },
  parameters: {
    height: cellSize,
    width: '7px',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  deleteContainer: {
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'center',
    flexGrow: 0,
    // border: '1px red solid',
    width: cellSize,
    margin: 'auto',
  },
}



export { cellSize, cellSizeNum, table }