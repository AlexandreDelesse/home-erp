import React, { useState } from "react";
import {
  createReward,
  deleteReward,
  getCategories,
  getRewards,
  updateReward,
} from "../../services/reward.service";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CreateRewardForm from "../forms/CreateRewardForm";
import FormWrapper from "../cards/FormWrapper";
import RewardList from "../cards/RewardList";
import { Spinner } from "reactstrap";
import "./rewardPage.css";

function RewardPage() {
  const [categorySelected, setCategorySelected] = useState("tout");
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const rewardQuery = useQuery("rewards", getRewards);
  const categorieQuery = useQuery("categories", getCategories);

  // Mutations
  const mutationCreate = useMutation(createReward, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("rewards");
      queryClient.invalidateQueries("categories");
    },
  });

  const rewardUpdate = useMutation(updateReward, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("rewards");
      queryClient.invalidateQueries("categories");
    },
  });

  const mutationDelete = useMutation(deleteReward, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("rewards");
      queryClient.invalidateQueries("categories");
    },
  });

  const handleOnCategoryChange = (category) => {
    setCategorySelected(category);
  };

  if (rewardQuery.isLoading || categorieQuery.isLoading) {
    return <Spinner />;
  }
  if (rewardQuery.isError || categorieQuery.isError) {
    return <div>{rewardQuery.error.message} </div>;
  }

  return (
    <Reward
      leftPanel={
        <>
          <FormWrapper>
            <CreateRewardForm onSubmit={mutationCreate.mutate} />
          </FormWrapper>
          <CategorySelector
            categories={categorieQuery.data}
            onSelectCategory={handleOnCategoryChange}
            categorySelected={categorySelected}
          />
        </>
      }
      rightPanel={
        <>
          {categorieQuery.data
            .filter((category) =>
              categorySelected !== "tout" ? category === categorySelected : true
            )
            .map((category) => (
              <RewardSubCategory category={category}>
                <RewardList
                  rewards={rewardQuery.data.filter(
                    (reward) => reward.category === category
                  )}
                  onDelete={mutationDelete.mutate}
                  onClaim={rewardUpdate.mutate}
                />
              </RewardSubCategory>
            ))}
        </>
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

const RewardSubCategory = ({ children, category }) => {
  return (
    <div className="rewardCategoryWrapper">
      <div className="rewardCategoryTitle">{category}</div>
      <div>{children}</div>
    </div>
  );
};

const CategorySelector = ({
  categories,
  onSelectCategory,
  categorySelected,
}) => {
  return (
    <div>
      <div
        className={`categoryText ${
          "tout" === categorySelected ? "categoryActive" : ""
        }`}
        onClick={() => onSelectCategory("tout")}
      >
        tout
      </div>

      {categories.map((category) => (
        <div
          className={`categoryText ${
            category === categorySelected ? "categoryActive" : ""
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};
