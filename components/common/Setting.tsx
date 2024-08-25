"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import avatar_1 from "/public/images/avatar-1.svg";
import { useAccount } from 'wagmi';
import { useDisconnect } from 'wagmi';
import { getUserInfo } from '../../contracts/contract-actions';

const Setting = ({ activeHandler }: { activeHandler: (a: string) => void }) => {
  const [enabled, setEnabled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [avatarSrc, setAvatarSrc] = useState<any>(avatar_1);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleTheme = () => {
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };

  useEffect(() => {
    setEnabled(true);
    
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

    fetchUserInfo();
  }, [address]);

  const formatUsername = (username: string) => {
    if (username.length >= 5) {
      return `${username.substring(0 - 15)}`;
    }
    return username;
  };

  if (!enabled || !isConnected) return null;

  return (
    <>
      <div className="profile-pic d-flex align-items-center">
        <span
          className="avatar cmn-head active-status"
          onClick={() => activeHandler("settings")}
        >
          <Image
                className="avatar-img max-un"
                src={avatarUrl || avatar_1}
                width={60}
                height={60}
                alt="avatar"
              />


        </span>
      </div>
      
      <div className="main-area p-5 profile-content">
        <div className="head-area">
          <div className="d-flex gap-3 align-items-center">
            <div className="avatar-item">
              <Image
                className="avatar-img max-un"
                src={avatarUrl || avatar_1}
                width={40}
                height={40}
                alt="avatar"
              />
              
            </div>
            <div className="text-area">
              <h6 className="m-0 mb-1">
              {userInfo ? formatUsername(userInfo.username) : 'Loading...'}
              </h6>
              <p className="mdtxt">
              Balance: {userInfo && userInfo.balance ? userInfo.balance.toString() : '0'}
              </p>
            </div>
          </div>
        </div>
        <div className="view-profile my-2">
          <Link href="/profile/edit" className="mdtxt w-100 text-center py-2">
            View profile
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/profile/edit" className="mdtxt">
              <i className="material-symbols-outlined mat-icon"> settings </i>
              Settings & Privacy
            </Link>
          </li>
          <li>
            <Link href="/#" className="mdtxt" onClick={() => disconnect()}>
              <i className="material-symbols-outlined mat-icon">
                power_settings_new
              </i>
              Disconnect
            </Link>
          </li>
        </ul>
        <div className="switch-wrapper mt-4 d-flex gap-1 align-items-center">
          <i
            className={`mat-icon material-symbols-outlined sun icon ${
              theme === "light" && "active"
            }`}
          >
            light_mode
          </i>
          <label className="switch">
            <input type="checkbox" className="checkbox" onClick={handleTheme} />
            <span
              className={`slider ${theme === "dark" ? " slider-active" : ""}`}
            ></span>
          </label>
          <i
            className={`mat-icon material-symbols-outlined moon icon ${
              theme === "dark" && "active"
            }`}
          >
            dark_mode
          </i>
          <span className="mdtxt ms-2">Dark mode</span>
        </div>
      </div>
    </>
  );
};

export default Setting;
