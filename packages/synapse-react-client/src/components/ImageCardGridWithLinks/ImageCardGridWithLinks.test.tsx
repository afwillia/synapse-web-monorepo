import ImageCardGridWithLinks, {
  ImageCardGridWithLinksProps,
} from './ImageCardGridWithLinks'
import useGetQueryResultBundle from '../../synapse-queries/entity/useGetQueryResultBundle'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { screen, render, waitFor } from '@testing-library/react'
import { createWrapper } from '../../testutils/TestingLibraryUtils'
import React from 'react'
import {
  BatchFileResult,
  ColumnTypeEnum,
  QueryResultBundle,
} from '@sage-bionetworks/synapse-types'
import { getUseQuerySuccessMock } from '../../testutils/ReactQueryMockUtils'
import { SynapseClient } from '../../index'

jest.mock('../../synapse-queries/entity/useGetQueryResultBundle')
const mockUseGetQueryResultBundle = jest.mocked(useGetQueryResultBundle)

describe('ImageCardGridWithLinks Tests', () => {
  const mockProps: ImageCardGridWithLinksProps = {
    sql: 'SELECT * FROM syn64112885',
    title: 'Test title',
    summaryText: 'This is a summary.',
  }

  const mockQueryResult: QueryResultBundle = {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryResultBundle',
    queryResult: {
      concreteType: 'org.sagebionetworks.repo.model.table.QueryResult',
      queryResults: {
        concreteType: 'org.sagebionetworks.repo.model.table.RowSet',
        tableId: 'syn64112885',
        etag: 'DEFAULT',
        headers: [
          {
            name: 'Image',
            columnType: ColumnTypeEnum.FILEHANDLEID,
            id: '81723',
          },
          {
            name: 'LinkText',
            columnType: ColumnTypeEnum.STRING,
            id: '81724',
          },
          {
            name: 'Link',
            columnType: ColumnTypeEnum.LINK,
            id: '81725',
          },
        ],
        rows: [
          {
            rowId: 1,
            values: [
              '149976034',
              'Comparative Biology',
              'https://en.wikipedia.org/wiki/Comparative_biology#:~:text=Comparative%20biology%20uses%20natural%20variation,role%20of%20organisms%20in%20ecosystems.',
            ],
          },
          {
            rowId: 2,
            values: [
              '149976044',
              'Reference Genomes',
              'https://en.wikipedia.org/wiki/Reference_genome',
            ],
          },
        ],
      },
    },
    selectColumns: [
      {
        name: 'Image',
        columnType: ColumnTypeEnum.FILEHANDLEID,
        id: '81723',
      },
      {
        name: 'LinkText',
        columnType: ColumnTypeEnum.STRING,
        id: '81724',
      },
      {
        name: 'Link',
        columnType: ColumnTypeEnum.LINK,
        id: '81725',
      },
    ],
  }

  const mockFileResult = [
    {
      fileHandleId: '149976034',
      preSignedURL: 'https://mockurl.com/orangecat.jpeg',
    },
    {
      fileHandleId: '149976044',
      preSignedURL: 'https://mockurl.com/tabbycat.jpeg',
    },
  ]

  const mockBatchFileResult: BatchFileResult = {
    requestedFiles: mockFileResult,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(SynapseClient, 'getFiles').mockResolvedValue(mockBatchFileResult)
    mockUseGetQueryResultBundle.mockReturnValue(
      getUseQuerySuccessMock(mockQueryResult),
    )
  })

  const renderWithRouter = (props: ImageCardGridWithLinksProps) => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: <ImageCardGridWithLinks {...props} />,
      },
    ])
    return render(<RouterProvider router={router} />, {
      wrapper: createWrapper(),
    })
  }

  it('fetches and displays cards', async () => {
    renderWithRouter(mockProps)

    await waitFor(() =>
      expect(mockUseGetQueryResultBundle).toHaveBeenCalledTimes(1),
    )

    expect(screen.getByText('Test title')).toBeInTheDocument()
    expect(screen.getByText('This is a summary.')).toBeInTheDocument()
    expect(screen.getByText('Comparative Biology')).toBeInTheDocument()
    expect(screen.getByText('Reference Genomes')).toBeInTheDocument()

    await waitFor(() => {
      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(2)
    })
  })
})
