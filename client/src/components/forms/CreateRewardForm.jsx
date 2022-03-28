import React, { useState } from 'react'
import PropTypes from 'prop-types'

function CreateRewardForm(props) {
  const { onSubmit } = props

  const [reward, setReward] = useState({
    rewardName: '',
    rewardCondition: '',
    rewardPoints: 0,
  })

  const handleOnFormChange = (e) => {
    const { name, value } = e.target
    setReward((old) => {
      return { ...old, [name]: value }
    })
  }

  const handleOnSubmit = () => {
    onSubmit(reward)
  }

  return (
    <>
      <input
        type="text"
        name="rewardName"
        value={reward.rewardName}
        onChange={handleOnFormChange}
      />
      <input
        type="text"
        name="rewardCondition"
        value={reward.rewardCondition}
        onChange={handleOnFormChange}
      />
      <input
        type="text"
        name="rewardPoints"
        value={reward.rewardPoints}
        onChange={handleOnFormChange}
      />
      <button onClick={handleOnSubmit}>Ajouter</button>
    </>
  )
}

CreateRewardForm.propTypes = { onSubmit: PropTypes.func }
CreateRewardForm.defaultProps = { onSubmit: () => {} }

export default CreateRewardForm
