import { useDispatch } from 'react-redux'
import type { AppDispatch } from 'Store'

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>()
