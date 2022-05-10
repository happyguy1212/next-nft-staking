interface CardProps {
  tokenId: string,
  action: string,
  onhandle: (action:string, tokenId:string) => void;
}


const StakeCard = ({ tokenId, action, onhandle }: CardProps) => {

  const handleClick = (action: string, tokenId: string) => {
    console.log(action);
    console.log(tokenId);
    onhandle(action, tokenId);
  }
  
  return (
    <div id="staking-info-item-claimed" className="flex flex-row items-center justify-between w-[300px] h-[60px] pl-5 pr-0 rounded-[45px] bg-white shadow-[0_5px_15px_#0000004d]">
      <h5 className="text-center">TokenId:{tokenId}</h5>
      <div className='flex w-[90px] h-[60px] text-center rounded-[45px] h-full shadow-[0_5px_15px_#0000004d] bg-white hover:border border-gray-900'>
        <button className='flex-1 font-avenirnext-medium font-medium text-xl rounded-[45px] border text-center text-[#eb99ca] w-full h-full' onClick={() => handleClick(action, tokenId)}>
          {action}
        </button>
      </div>
    </div>
  )
}

export default StakeCard;