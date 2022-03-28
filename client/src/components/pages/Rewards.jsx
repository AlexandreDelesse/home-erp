import React from 'react'
import {
  createReward,
  deleteReward,
  getRewards,
  updateReward,
} from '../../services/reward.service'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import RewardCard from '../cards/RewardCard'
import CreateRewardForm from '../forms/CreateRewardForm'

export default function Rewards() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery('rewards', getRewards)

  // Mutations
  const mutationCreate = useMutation(createReward, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('rewards')
    },
  })

  const mutationDelete = useMutation(deleteReward, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('rewards')
    },
  })

  const mutationUpdate = useMutation(updateReward, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('rewards')
    },
  })

  if (query.isLoading) return <div>Loading...</div>
  if (query.isError) return <div>Error !</div>

  return (
    <div>
      {query.data.map((reward) => (
        <RewardCard
          onDelete={mutationDelete.mutate}
          onEdit={mutationUpdate.mutate}
          key={reward.rewardId}
          reward={reward}
        />
      ))}

      <CreateRewardForm onSubmit={mutationCreate.mutate} />
    </div>
  )
}
