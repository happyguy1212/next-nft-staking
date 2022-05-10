import Link from 'next/link'
import React, { useState, useEffect, useRef } from "react";
import ConnectButton from '../ConnectButton'
const close_icon = '/svg/close_icon.svg';
const hamburgerIcon = '/svg/hamburger.svg';
const goopIcon = "/svg/Goop.svg";
const allowListIcon = "/svg/allowlist.svg";
const websiteIcon = "/svg/website.svg";


function useOutsideAlerter(ref: any, setOpenNav: any) {
  useEffect(() => {

    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenNav(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Navbar = ({ logo }: any) => {

  const [openNav, setOpenNav] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpenNav);

  return (
    <div className="bg-bgprimary">
      {/* Mobile Nav */}

      <a onClick={() => setOpenNav(true)} className="absolute left-[40px] top-[20px] w-[30px] h-auto hover:text-navhover visible xl:invisible">
        <img src={hamburgerIcon} className='w-[30px] h-auto' alt="hamburgerIcon" />
      </a>

      {
        openNav &&
        <div ref={wrapperRef} className="fixed z-10 top-0 left-0 bottom-0 right-0 h-full bg-[#000000bf] w-full">
          <div className="flex flex-col z-[11] fixed top-0 bottom-0 left-0 w-[250px] bg-white h-full pt-36 pl-6">
            <div onClick={() => setOpenNav(false)} className="absolute left-[40px] top-[20px]">
              <img className="w-[30px] h-auto cursor-pointer" src={close_icon} alt="closeIcon" />
            </div>
            <div className="pl-[5%]">
              <img src={logo} className='w-[50px] h-auto' />
            </div>
            <Link href="#staking">

              <a onClick={() => setOpenNav(false)} className="flex pl-2.5 pt-6 text-fsl font-bold transition-all hover:text-navhover">
                STAKING HUB
                <img src={goopIcon} className="ml-1" />
              </a>
            </Link>
            <Link href="#allow-list">

              <a onClick={() => setOpenNav(false)} className="flex pl-2.5 pt-6 text-fsl font-bold transition-all hover:text-navhover">
                ALLOWLIST
                <img src={allowListIcon} className="ml-1" />
              </a>
            </Link>
            <Link href="/">

              <a onClick={() => setOpenNav(false)} className="flex pl-2.5 pt-6 text-fsl font-bold transition-all hover:text-navhover">
                WEBSITE
                <img src={websiteIcon} className="ml-1" />
              </a>
            </Link>
          </div>
        </div>
      }
      <div className="relative flex border-b-2 border-[#e7e8ec] sticky items-center p-0 pt-5 xl:p-5 invisible xl:visible">
        {/* Desktop Nav */}

        <div className="flex space-x-16 items-center hidden xl:flex">
          <Link href="/" >
            <a className="flex items-center pl-12">
              <img className="h-4/5 w-4/5" src={logo} alt="logo" />
              <div className="flex flex-col justify-center items-center pl-2.5">
                <div id="staking-nav-brand-title" className="text-xxxxl font-bold">Illogics</div>
                <div id="staking-nav-brand-subtitle" className="text-fsl font-bold">Ecosystem</div>
              </div>
            </a>
          </Link>
          <Link href="#staking">

            <a className="flex text-xl font-body transition-all font-bold hover:text-navhover">
              STAKING HUB
              <img src={goopIcon} className="w-[25px] pl-1" />
            </a>
          </Link>
          <Link href="#allow-list">
            <a className="flex text-xl font-body transition-all font-bold hover:text-navhover">
              ALLOWLIST
              <img src={allowListIcon} className="w-[25px] pl-1" />
            </a>
          </Link>
          <Link href="/">
            <a className="flex text-xl font-body transition-all font-bold hover:text-navhover">
              WEBSITE
              <img src={websiteIcon} className="w-[25px] pl-1" />
            </a>
          </Link>
        </div>

        {!openNav &&
          <div className="mr-4 mb-4 w-[160px] h-[50px] ml-auto visible">
            <ConnectButton actionText="CONNECT" />
          </div>
        }
      </div>
    </div>

  );
};

export default Navbar;

