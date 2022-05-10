import web3 from './index';
import { AbiItem } from 'web3-utils'
import { MAPESTAKE_ADDRESS, MAPESTAKE_ABI } from '../../abis/Staking';

const StakingContract = new web3.eth.Contract(MAPESTAKE_ABI as AbiItem[], MAPESTAKE_ADDRESS);

export default StakingContract;