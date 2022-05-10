import {createContext, useState, useContext, type ReactNode} from 'react';

interface IAddressContext {
  address: string;
  updateAddress: (_address: string) => void;
}

const AddressContext = createContext<IAddressContext>(null!);

const AddressProvider = ({children} : {children: ReactNode}) => {
  const [address, setAddress] = useState('');

  const updateAddress = (_address: string) => {
    setAddress(_address);
  }

  return <AddressContext.Provider value={{address, updateAddress}} >{children}</AddressContext.Provider>;
}

export default AddressProvider;

export const useAddress = () => {
  return useContext(AddressContext);
}