import { useQuery } from 'react-query'
import { getExerciceById } from '../../services/exercice.service'

export default function useGetExerciceById(id) {
  const query = useQuery(['exercices', id], () => getExerciceById(id))
  return query
}
