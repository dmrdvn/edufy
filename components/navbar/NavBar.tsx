"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Message from "../common/Message";
import Notification from "../common/Notification";
import Setting from "../common/Setting";
import logo from "/public/images/logo.svg";

import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from "next/navigation";
import { WalletOptions } from '../../contracts/wallet-options';
import { isUserRegistered, registerUser } from '../../contracts/contract-actions';
import { getWalletConnectClient } from '../../contracts/client';

const NavBar = ({ clss = "container" }: { clss: string }) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [active, setActive] = useState<string>("");
  const [activeSearctForm, setActiveSearctForm] = useState(false);

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleConnect = async () => {
    try {
      if (isConnected && address) {
        const isRegistered = await isUserRegistered(address);
        console.log('User is registered:', isRegistered);

        if (!isRegistered) {
          const walletClientWC = await getWalletConnectClient();
          const hash = await registerUser(); 
          console.log('Registration transaction hash:', hash);
          alert('Registration successful!');
          
          
          router.replace("/profile/edit");
        }
      } else {
        console.log('Wallet not connected');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  const activeHandler = (opt: string) => {
    if (opt === active) {
      setActive("");
    } else {
      setActive(opt);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

 
  useEffect(() => {
    if (isConnected && address) {
      handleConnect();
    }
  }, [address, isConnected]);

  return (
    <header
      className={`header-section header-menu ${
        windowHeight > 50 && "animated fadeInDown header-fixed"
      }`}
    >
      <nav className="navbar navbar-expand-lg p-0">
        <div className={clss}>
          <nav className="navbar w-100 navbar-expand-lg justify-content-betweenm">
            <Link href="/" className="navbar-brand">
              <Image src={logo} className="logo" alt="logo" width={100} />
            </Link>
            <button
              className="button search-active d-block d-md-none"
              onClick={() => setActiveSearctForm(!activeSearctForm)}
            >
              <i className="d-center material-symbols-outlined fs-xxl mat-icon">
                search
              </i>
            </button>
            <div className={`search-form ${activeSearctForm && "active"}`}>
              <form action="#" className="input-area d-flex align-items-center">
                <i className="material-symbols-outlined mat-icon">search</i>
                <input
                  type="text"
                  placeholder="Search Challanges"
                  autoComplete="on"
                />
              </form>
            </div>
            <ul className="navbar-nav feed flex-row gap-xl-20 gap-lg-10 gap-sm-7 gap-3 py-4 py-lg-0 m-lg-auto ms-auto ms-aut align-self-center">
              
            </ul>
            <div className="right-area position-relative d-flex gap-3 gap-xxl-6 align-items-center">
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12 }}>
                <WalletOptions />
              </div>
              <div className={`single-item d-none d-lg-block profile-area position-relative ${active === "settings" ? "active" : ""}`}>
                <Setting activeHandler={activeHandler} />
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
