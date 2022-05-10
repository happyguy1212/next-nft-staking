import web3 from './index';
import { AbiItem } from 'web3-utils'
import { FFERC721_ADDRESS, FFERC721_ABI } from '../../abis/Nft';

const NftContract = new web3.eth.Contract(FFERC721_ABI as AbiItem[], FFERC721_ADDRESS);

export default NftContract;