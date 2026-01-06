import { useEffect, useRef } from 'react'
import { Column } from 'react-datasheet-grid'

// Extended HTMLDivElement with custom properties for resize handles
interface ResizeHandleElement extends HTMLDivElement {
  __cellElement?: HTMLElement
  __columnName?: string
}

type UseColumnResizeHandlesProps = {
  wrapperRef: React.RefObject<HTMLDivElement | null>
  colValues: Column[]
  onColumnResize: (columnName: string, newWidth: number) => void
}

/**
 * Custom hook that manages interactive column resize handles for a data grid.
 * Creates, positions, and updates resize handles that allow users to drag column borders.
 * Handles virtualization, scrolling, and proper cleanup.
 */
export function useColumnResizeHandles({
  wrapperRef,
  colValues,
  onColumnResize,
}: UseColumnResizeHandlesProps) {
  const cleanupFunctionsRef = useRef<Array<(() => void) | HTMLDivElement>>([])
  const handlesMapRef = useRef<Map<string, ResizeHandleElement>>(new Map())
  const activeResizeRef = useRef<{
    columnName: string
    startX: number
    startWidth: number
    handle: HTMLDivElement
    initialLeft: number
  } | null>(null)

  // Store onColumnResize in a ref so event listeners always call the latest version
  const onColumnResizeRef = useRef(onColumnResize)
  onColumnResizeRef.current = onColumnResize

  useEffect(() => {
    // Don't recreate handles during resize
    if (activeResizeRef.current) {
      return
    }

    // Clean up previous event listeners and remove old handles
    cleanupFunctionsRef.current.forEach(item => {
      if (typeof item === 'function') {
        item()
      } else {
        // It's a handle element, remove it
        item.remove()
      }
    })
    cleanupFunctionsRef.current = []
    handlesMapRef.current.clear()

    // Track if component is still mounted to prevent memory leaks
    let isMounted = true

    // Small delay to ensure grid has rendered
    const timer = setTimeout(() => {
      // Check if component unmounted before timer completed
      if (!isMounted || !wrapperRef.current) {
        return
      }

      // Find the grid container directly in the wrapper
      const gridContainer = wrapperRef.current.querySelector(
        '.dsg-container',
      ) as HTMLElement

      if (!gridContainer) {
        return
      }

      const headerRow = gridContainer.querySelector('.dsg-row.dsg-row-header')

      if (!headerRow) {
        return
      }

      // Ensure grid container has position relative for absolute children
      const originalPosition = gridContainer.style.position
      if (!originalPosition || originalPosition === 'static') {
        gridContainer.style.position = 'relative'
      }

      // Global mousemove and mouseup handlers (only one set needed)
      const handleMouseMove = (e: MouseEvent) => {
        if (!activeResizeRef.current) return
        const { startX, handle, initialLeft } = activeResizeRef.current
        const deltaX = e.clientX - startX
        handle.style.left = `${initialLeft + deltaX}px`
      }

      const handleMouseUp = (e: MouseEvent) => {
        if (!activeResizeRef.current) return

        const { columnName, startX, startWidth, handle } =
          activeResizeRef.current
        const deltaX = e.clientX - startX
        const newWidth = Math.max(25, startWidth + deltaX)

        handle.classList.remove('is-resizing')
        document.body.classList.remove('col-resizing')
        activeResizeRef.current = null

        // Only update state when drag is complete
        onColumnResizeRef.current?.(columnName, newWidth)
      }

      // Also handle mouse leaving the window during drag
      const handleMouseLeave = (e: MouseEvent) => {
        // Only trigger if we're actually dragging
        if (!activeResizeRef.current) return
        handleMouseUp(e)
      }

      // Function to create or update a handle for a given cell
      const createOrUpdateHandle = (
        cellElement: HTMLElement,
        columnIndex: number,
      ) => {
        const columnName = colValues[columnIndex]?.title as string
        if (!columnName) return

        const gridHeight = gridContainer.scrollHeight
        const left = cellElement.offsetLeft + cellElement.offsetWidth - 3

        // Check if handle already exists
        let handle = handlesMapRef.current.get(columnName)

        if (!handle) {
          // Create new handle
          handle = document.createElement('div') as ResizeHandleElement
          handle.className = 'column-resize-handle'
          handle.dataset.columnName = columnName
          handle.style.position = 'absolute'
          handle.style.top = '0'
          handle.style.width = '8px'
          handle.style.cursor = 'col-resize'
          handle.style.pointerEvents = 'auto'
          handle.style.zIndex = '1000'

          // Capture handle in closure for event listener
          const capturedHandle = handle

          const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            // Read the column info fresh at mousedown time
            const currentColumnName = capturedHandle.__columnName
            const currentCellElement = capturedHandle.__cellElement

            if (!currentColumnName || !currentCellElement) return

            // Get current width and position at the time of mousedown
            const currentLeft = parseFloat(capturedHandle.style.left)

            activeResizeRef.current = {
              columnName: currentColumnName,
              startX: e.clientX,
              startWidth: currentCellElement.offsetWidth,
              handle: capturedHandle,
              initialLeft: currentLeft,
            }
            capturedHandle.classList.add('is-resizing')
            document.body.classList.add('col-resizing')
          }

          capturedHandle.addEventListener('mousedown', handleMouseDown)

          cleanupFunctionsRef.current.push(() => {
            capturedHandle.removeEventListener('mousedown', handleMouseDown)
          })

          gridContainer.appendChild(capturedHandle)
          cleanupFunctionsRef.current.push(capturedHandle)
          handlesMapRef.current.set(columnName, capturedHandle)
        }

        // Update handle properties (cell might have moved/resized)
        handle.__cellElement = cellElement
        handle.__columnName = columnName
        handle.style.left = `${left}px`
        handle.style.height = `${gridHeight}px`
        handle.style.display = '' // Ensure visible
      }

      // Function to sync handles with currently visible columns
      const syncHandles = () => {
        if (activeResizeRef.current) return // Don't sync during resize

        const headerCells = headerRow.querySelectorAll('.dsg-cell')
        if (headerCells.length <= 1) return

        // Track which columns are currently visible
        const visibleColumns = new Set<string>()

        // Update or create handles for visible columns
        headerCells.forEach((cell: Element, index: number) => {
          if (index === 0) return // Skip gutter column

          const cellElement = cell as HTMLElement

          // Get the column name from the cell's text content
          // This is more reliable than using DOM index with virtualization
          const cellText = cellElement.textContent?.trim() || ''

          // Find the actual column index in colValues by matching the title
          const actualColumnIndex = colValues.findIndex(
            col => col.title === cellText,
          )

          if (actualColumnIndex !== -1) {
            const columnName = colValues[actualColumnIndex]?.title as string
            visibleColumns.add(columnName)
            createOrUpdateHandle(cellElement, actualColumnIndex)
          }
        })

        // Hide handles for columns that are no longer visible (virtualized out)
        handlesMapRef.current.forEach((handle, columnName) => {
          if (!visibleColumns.has(columnName)) {
            handle.style.display = 'none'
          }
        })
      }

      // Initial sync
      syncHandles()

      // Update handles on scroll
      const handleScroll = () => {
        syncHandles()
      }

      // Use MutationObserver to detect when columns are added/removed due to virtualization
      const observer = new MutationObserver(() => {
        // Debounce mutations to avoid excessive syncs
        requestAnimationFrame(() => {
          syncHandles()
        })
      })

      observer.observe(headerRow, {
        childList: true, // Watch for added/removed columns
        subtree: true,
      })

      gridContainer.addEventListener('scroll', handleScroll)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mouseleave', handleMouseLeave)

      cleanupFunctionsRef.current.push(() => {
        observer.disconnect()
        gridContainer.removeEventListener('scroll', handleScroll)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('mouseleave', handleMouseLeave)
      })
    }, 300)

    return () => {
      // Mark component as unmounted to prevent timer callback from executing
      isMounted = false
      clearTimeout(timer)
      // Clean up on unmount - ensure cursor class is removed
      document.body.classList.remove('col-resizing')
      cleanupFunctionsRef.current.forEach(item => {
        if (typeof item === 'function') {
          item()
        } else {
          // It's a handle element, remove it
          item.remove()
        }
      })
      cleanupFunctionsRef.current = []
      // Reset active resize ref
      if (activeResizeRef.current) {
        activeResizeRef.current.handle?.classList.remove('is-resizing')
        activeResizeRef.current = null
      }
    }
  }, [colValues, wrapperRef])
}
