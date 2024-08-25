"use client";

import { useEffect, useState } from "react";
import { leftMenu } from "@/data/sidbarData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import avatar_1 from "/public/images/avatar-1.svg";

import { useAccount } from 'wagmi';
import { WalletOptions } from "@/contracts/wallet-options";
import { getUserInfo } from '../../contracts/contract-actions';
import { getEnsAvatar } from '@wagmi/core';
import { normalize } from 'viem/ens';
import { config } from "../../contracts/WagmiConfig";
import { createTable } from "../../contracts/contract-actions";

const HomeLeft = ({ clss }: { clss?: string }) => {
  const [activeProfile, setActiveProfile] = useState<boolean>(false);
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [avatarSrc, setAvatarSrc] = useState<any>(avatar_1);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (address) {
        try {
          const info = await getUserInfo(address);
          setUserInfo(info);

          // IPFS'ten avatar'ı çek
          if (info?.photo) {
            const response = await fetch(`https://gateway.pinata.cloud/ipfs/${info.photo}`);
            if (!response.ok) {
              throw new Error('Failed to fetch avatar from IPFS');
            }
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setAvatarUrl(imageUrl);
          }
          
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    const fetchUserAvatar = async () => {
      if (address) {
        try {
          const ensAvatar = await getEnsAvatar(config, {
            name: normalize(address),
          });

          if (ensAvatar) {
            setAvatarSrc(ensAvatar);
          } else {
            setAvatarSrc(avatar_1);
          }
        } catch (error) {
          console.error('Error fetching user avatar:', error);
          setAvatarSrc(avatar_1);
        }
      }
    };

    fetchUserInfo();
    fetchUserAvatar();
  }, [address]);

  const formatUsername = (username: string) => {
    if (username.length >= 5) {
      return `${username.substring(0, 15)}`;
    }
    return username;
  };

  return (
    <>
      <div className={`d-inline-block ${clss}`}>
        <button
          className="button profile-active mb-4 mb-lg-0 d-flex align-items-center gap-2"
          onClick={() => setActiveProfile(!activeProfile)}
        >
          <i className="material-symbols-outlined mat-icon"> tune </i>
          <span>My profile</span>
        </button>
      </div>

      <div
        className={`profile-sidebar cus-scrollbar p-5 ${activeProfile && "active"}`}
      >
        <div className="d-block d-lg-none position-absolute end-0 top-0">
          <button
            className="button profile-close mt-3 me-2"
            onClick={() => setActiveProfile(false)}
          >
            <i className="material-symbols-outlined mat-icon fs-xl"> close </i>
          </button>
        </div>

        {isConnected ? (
          <div className="profile-pic d-flex gap-2 align-items-center">
            <div className="avatar position-relative">
            
              <Image
                className="avatar-img max-un"
                src={avatarUrl || avatarSrc}
                width={60}
                height={60}
                alt="avatar"
              />

            </div>
            <div className="text-area">
              <h6 className="m-0 mb-1">
                <Link href="profile/post">
                  {userInfo ? formatUsername(userInfo.username) : 'Loading...'}
                </Link>
              </h6>
              <p className="mdtxt">
              Balance: {userInfo && userInfo.balance ? userInfo.balance.toString() : '0'}
              </p>
            </div>
          </div>
        ) : (
          <WalletOptions />
        )}
        
        <ul className="profile-link mt-7 mb-7 pb-7">
          {leftMenu.map(([icon, item, url], i) => (
            <li key={i}>
              <Link
                href={url}
                className={`d-flex gap-4 ${pathname === url ? "active" : ""}`}
              >
                <i className="material-symbols-outlined mat-icon"> {icon} </i>
                <span>{item}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="">
          <button
            className="button profile-active mb-4 mb-lg-0 d-flex align-items-center gap-2"
            /* onClick={() => createTable(
              'Solidity de versiyon hangi satir ile ifade edilir?',
              '9c11f68a0a5b14442a2dbae3c996c928e0ce48e0de424736aec62fa67f0fd499',
              100,
              1727044205
            )} */
          >
            <i className="material-symbols-outlined mat-icon"> workspaces </i>
            <span>Create New Challange</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeLeft;
