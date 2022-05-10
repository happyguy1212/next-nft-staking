import web3 from './index';
import { AbiItem } from 'web3-utils'
import { FactoryTOKEN_ADDRESS, FactoryTOKEN_ABI } from '../../abis/ERC20';

const FactoryTokenContract = new web3.eth.Contract(FactoryTOKEN_ABI as AbiItem[], FactoryTOKEN_ADDRESS);

export default FactoryTokenContract;