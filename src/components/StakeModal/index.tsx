import { useState, useCallback, useEffect } from 'react'
import StakeCard from "../StakeCard"
import ReactModal from 'react-modal';
import StakingContract from '../Web3/StakingContract';
import { CHAIN_ID } from '../../config';

const close_icon = '/svg/close_icon.svg';

interface ModalProps {
  tokenIds: Array<{}> | undefined,
  isStake: boolean,
  isUnStake: boolean,
  isClaim: boolean,
  closeModal: () => void,
}

const customStyles = {
  overlay: {
    // position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    transform: 'translate(-50%, -50%)',
  },
};

// ReactModal.setAppElement('#yourAppElement');

const StakeModal = ({ tokenIds, isStake, isUnStake, isClaim, closeModal }: ModalProps) => {

  let action: string;

  const actionText = () => {
    if (isStake) {
      action = "stake";
      return 0;
    }
    if (isUnStake) {
      action = "unStake";
      return 1;
    }
    if (isClaim) {
      action = "claim";
      return 2;
    }
  }
  const handleStakeCard = useCallback((action:string, tokenId:string) => {
    console.log("handleStakeCard");
    if(window.ethereum.chainId !== CHAIN_ID) {
      closeModal();
      return;
    }
    const actionVal = actionText();
    if(actionVal == 0){
      console.log("stakeNFt");
      stakeNFT(tokenId)

    }
    if(actionVal == 1) {
      console.log("unstakeNFt");
      unStakeNFT(tokenId);
    }

    if(actionVal == 2) {
      console.log("harvest");
      harvest(tokenId);
    }
    closeModal();
  }, [])

  const stakeNFT = async (stakeTokenId: string) => {
    const staked = await StakingContract.methods.stakeNFT(Number(stakeTokenId)).call();
    console.log("staked", staked);
  }

  const unStakeNFT = async (unStakeTokenId: string) => {
    const unStaked = await StakingContract.methods.unStakeNFT(Number(unStakeTokenId)).call();
    console.log("unStaked", unStaked);
  }

  const harvest = async (harvestTokenId: string) => {
    const claimed = await StakingContract.methods.harvest(Number(harvestTokenId)).call();
    console.log("harvest", claimed);
  }

  const handleAfterOpenFunc = () => {
    console.log("handleAfterOpen");
  }


  actionText();

  return (
    <ReactModal
      isOpen={isStake ? isStake : isUnStake ? isUnStake : isClaim ? isClaim : false}
      onAfterOpen={handleAfterOpenFunc}
      // onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className='flex flex-row items-center justify-between my-2.5'>
        <div className="font-bold text-xxl">NFT!</div>
        <button onClick={closeModal}>
          <img className="w-[30px] h-auto cursor-pointer" src={close_icon} alt="closeIcon" />
        </button>
      </div>
      <div className='flex flex-col space-y-4 justify-center'>
        {
          tokenIds?.map((k: any, index: number) => {
            return (
              <div className="" key={index}>
                <StakeCard onhandle={handleStakeCard} tokenId={k.token_id} action={action} />
              </div>
            )
          })

        }
        {
          !tokenIds && isStake && 
          <div className='flex font-bold text-xl'>NO NFTS TO STAKE!</div>
        }
         {
          !tokenIds && isUnStake && 
          <div className='inline-flex font-bold text-xl'>NO NFTS TO UNSTAKE!</div>
        }
        {
          !tokenIds && isClaim &&
          <div className='flex font-bold text-xl'>NO TOKENS TO CLAIM!</div>
        }
      </div>
    </ReactModal>
  )
}

export default StakeModal;