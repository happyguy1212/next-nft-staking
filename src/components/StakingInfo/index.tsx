import { useState, useCallback, useEffect } from 'react'
import ClaimButton from "../ClaimButton";
import web3 from '../Web3';
import FactoryTokenContract from "../Web3/FactoryTokenContract"
import StakingContract from '../Web3/StakingContract';
import NftContract from '../Web3/NftContract';
import { MAPESTAKE_ADDRESS } from '../../abis/Staking';
import StakeModal from '../StakeModal';
import { useAddress } from '../AddressProvider';
import { CHAIN_ID } from '../../config';
import {formatToCurrency} from "../../utils"

const stakeImg = '/images/Quad1.png';
const yieldIMg = '/images/Stitch.png';
const totalImg = '/images/Octo.png';

const StakingInfo = () => {
  const { address } = useAddress();
  const [isClaim, setIsClaim] = useState(false);
  const [totalToken, setTotalToken] = useState<String | undefined>(undefined);
  const [stakeEarned, setStakeEarned] = useState<String | undefined>(undefined);
  const [staked, setStaked] = useState<String | undefined>(undefined);
  const [yieldAmount, setYieldAmount] = useState<String | undefined>(undefined);
  const [tokenIds, setTokenIds] = useState<Array<{ }> | undefined>(undefined);

  const handleOnClaim = useCallback(() => {
    console.log("handleOnClaim")
    getTokenIdsofWallet(address);
    setIsClaim(true) ;
  }, [])

  const getTokenIdsofWallet = async (account: String | undefined) => {
    if (!account) {
      return;
    }
    try {
      const tokenIds = await NftContract.methods.walletOfOwner(account).call();
      setTokenIds(tokenIds);
      console.log(tokenIds);
    } catch (e: any) {
      console.log(e)
    }
  }
  const getCurrentStakeEarned = async (tokenId: String | undefined) => {
    const curStakeEarned = await StakingContract.methods.getCurrentStakeEarned(Number(tokenId)).call();
    setStakeEarned(curStakeEarned);
  }

  const getFactoryTokenBalance = async (account: String | undefined) => {
    if (!account || window.ethereum.chainId !== CHAIN_ID) {
      setTotalToken(undefined)
    }
    try {
      const value = await FactoryTokenContract.methods.balanceOf(account).call();
      const bal = web3.utils.fromWei(value, "ether");
      setTotalToken(bal);

    } catch (e: any) {
      console.log(e);
    }
  }

  const getStaked = async (account: String | undefined) => {
    const staked = await NftContract.methods.walletOfOwner(account).call();
    console.log(staked);
    const len = staked.length;
    setStaked(len);
  }

  function closeModal() {
    setIsClaim(false);
  }

  useEffect(() => {
    if (address && window.ethereum.chainId === CHAIN_ID) {
      getFactoryTokenBalance(address);
      // getCurrentStakeEarned(address);// replace address into tokenId
      getStaked(MAPESTAKE_ADDRESS);
    }
  }, [address])

  return (
    <div id="staking-info" className='flex justify-center w-[95%] md:max-w-[600px] lg:max-w-[1200px] mx-auto mt-0 xl:mt-16'>
      <div className='flex sm:flex-col flex-wrap md:flex-row items-center justify-between lg:space-x-6 w-full rounded-[35px] shadow-[0_5px_15px_#0000004d] py-3 px-[4%]'>
        <div id="staking-info-item-staked" className="flex space-x-6 items-center text-center my-1 rounded-[35px] bg-[#ffe782] shadow-[0_5px_15px_#0000004d]">
          <img src={stakeImg} className='w-[75px] h-auto' alt="stake" />
          <div className="flex flex-col h-full justify-center font-bold text-fsl pr-6 py-1" >
            <div className="">{staked ?staked :0}</div>
            <div className="">STAKED</div>
          </div>
        </div>
        <div id="staking-info-item-yield" className="flex items-center space-x-6 my-1 rounded-[35px] bg-[#c5ff82] shadow-[0_5px_15px_#0000004d]">
          <img src={yieldIMg} className='w-[75px] h-auto' alt="stake" />
          <div className="flex flex-col h-full justify-center text-center font-bold text-fsl pr-6 py-1">
            <div className="">{yieldAmount ? yieldAmount :0}</div>
            <div className="">YIELD</div>
          </div>
        </div>
        <div id="staking-info-item-total" className="flex items-center space-x-6 my-1 rounded-[35px] bg-[#9ae0fe] shadow-[0_5px_15px_#0000004d]">
          <img src={totalImg} className='w-[75px] h-auto' alt="stake" />
          <div className="flex flex-col h-full justify-center  pr-6 py-1 font-bold text-fsl">
            <div className="text-center">{totalToken ? totalToken : 0}</div>
            <div className="text-center">TOTAL</div>
          </div>
        </div>
        <div id="staking-info-item-claimed" className="flex my-1 md:mt-2 lg:mt-0 ml-auto mr-auto items-center space-x-6 pr-0 rounded-[45px] bg-[#eb99ca] shadow-[0_5px_15px_#0000004d]">
          <div className="flex flex-col h-full justify-center text-center font-bold text-fsl px-6 py-1">
            <div className="">{stakeEarned ? stakeEarned : 0}</div>
            <div className="">UNREALIZED</div>
          </div>
          <ClaimButton actionText="CLAIM" onClaim={handleOnClaim} />
        </div>
      </div>
      <StakeModal tokenIds={tokenIds} isClaim={isClaim} isStake={false} isUnStake={false} closeModal={closeModal} />
    </div>
  )
}

export default StakingInfo;