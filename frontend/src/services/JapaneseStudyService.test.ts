import { describe, it, expect, vi, beforeEach } from 'vitest'
import JapaneseStudyService from './JapaneseStudyService'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('JapaneseStudyService', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should fetch all studies', async () => {
    const mockStudies = [{ id: '1', content: 'Test content', category: '文句' }]
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockStudies)
    })

    const studies = await JapaneseStudyService.getAllStudies()
    
    expect(studies).toEqual(mockStudies)
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/japanese/all')
  })

  it('should handle fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(JapaneseStudyService.getAllStudies()).rejects.toThrow('Network error')
  })
})