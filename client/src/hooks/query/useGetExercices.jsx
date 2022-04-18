import { useQuery } from 'react-query'
import { getExercices } from '../../services/exercice.service'

export default function useGetExercices() {
  const query = useQuery('exercices', getExercices)
  return query
}
