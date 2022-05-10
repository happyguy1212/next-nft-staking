import React, { useEffect, useState } from "react";
import StakingContract from "../Web3/StakingContract";
import web3 from "../Web3";
import { AbiItem } from 'web3-utils'
// import { DIVIDEN_ABI } from "../../abis";
import { CHAIN_ID } from "../../config";
import { formatWalletAddress, readAddress } from "../../utils"

interface ButtonProps {
  actionText: string,
  onClaim: () => void,
}

const ClaimButton = ({ actionText, onClaim }: ButtonProps) => {

  const claim = async () => {
    try {
      onClaim();
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <div className='flex h-[70px] w-[100px] ml-auto mr-0 text-center rounded-[45px] shadow-[0_5px_15px_#0000004d] bg-white hover:border border-gray-900'>
      <button className='flex-1 font-avenirnext-medium font-bold text-fsl lg:text-xl rounded-[45px] border text-center text-[#eb99ca] w-full h-full' onClick={claim}>
        {actionText}
      </button>
    </div>
  );
};

export default ClaimButton;
