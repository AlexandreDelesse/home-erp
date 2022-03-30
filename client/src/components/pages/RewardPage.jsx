import React from "react";
import {
  createReward,
  deleteReward,
  getRewards,
} from "../../services/reward.service";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CreateRewardForm from "../forms/CreateRewardForm";
import FormWrapper from "../cards/FormWrapper";
import RewardList from "../cards/RewardList";
import { Spinner } from "reactstrap";
import "./rewardPage.css";

function RewardPage() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const rewardQuery = useQuery("rewards", getRewards);

  // Mutations
  const mutationCreate = useMutation(createReward, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("rewards");
    },
  });

  const mutationDelete = useMutation(deleteReward, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("rewards");
    },
  });
  if (rewardQuery.isLoading) {
    return <Spinner />;
  }
  if (rewardQuery.isError) {
    return <div>{rewardQuery.error.message} </div>;
  }

  return (
    <Reward
      leftPanel={
        <FormWrapper>
          <CreateRewardForm onSubmit={mutationCreate.mutate} />
        </FormWrapper>
      }
      rightPanel={
        <RewardList
          rewards={rewardQuery.data}
          onDelete={mutationDelete.mutate}
        />
      }
    />
  );
}

RewardPage.propTypes = {};

export default RewardPage;

function Reward({ leftPanel, rightPanel }) {
  return (
    <div className="rewardPageWrapper">
      <div className="rewardPageLeftPanel">{leftPanel}</div>

      <div className="rewardPageLeftPanel">{rightPanel}</div>
    </div>
  );
}
