"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactAction from "../ui/ContactAction";
import avatar_14 from "/public/images/avatar-14.png";
import avatar_2 from "/public/images/avatar-2.png";
import avatar_3 from "/public/images/avatar-3.png";
import avatar_4 from "/public/images/avatar-4.png";
import profile_cover_img from "/public/images/profile-cover-img.png";
import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { getUserInfo } from '../../contracts/contract-actions';

const ProfileEditBanner = () => {
  const path = usePathname();
  const splitPath = path.split("/");
  const lastPath = splitPath[splitPath.length - 1];
  const { address } = useAccount();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (address) {
        try {
          const info = await getUserInfo(address);
          setUserInfo(info);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [address]);

  return (
    <div className="banner-area pages-create mb-5">
      <div className="single-box p-5">
        <div className="avatar-area">
          <Image
            className="avatar-img w-100"
            src={profile_cover_img}
            alt="image"
          />
        </div>
        <div className="top-area py-4 d-center flex-wrap gap-3 justify-content-between align-items-start">
          <div className="d-flex gap-3 align-items-center">
            <div className="avatar-item p">
              <Image
                className="avatar-img max-un"
                src={userInfo?.photo ? userInfo.photo : avatar_14}
                alt="avatar"
              />
            </div>
            <div className="text-area text-start">
              <h4 className="m-0 mb-2">{userInfo?.username || "Lerio Mao"}</h4>
              <div className="friends-list d-flex flex-wrap gap-2 align-items-center text-center">
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <Image src={avatar_3} alt="image" />
                  </li>
                  <li>
                    <Image src={avatar_2} alt="image" />
                  </li>
                  <li>
                    <Image src={avatar_4} alt="image" />
                  </li>
                </ul>
                <span className="mdtxt d-center">
                  {userInfo?.followersCount || "10k"} Followers
                </span>
                <span className="mdtxt d-center following">
                  {userInfo?.followingCount || "200"} Following
                </span>
              </div>
            </div>
          </div>
          <div className="btn-item d-center gap-3">
            <Link href="#" className="cmn-btn d-center gap-1">
              <i className="material-symbols-outlined mat-icon fs-2">
                edit_note
              </i>
              Edit Profile
            </Link>

            {/* Contact Action */}
            <ContactAction
              actionList={[
                ["Block", "lock"],
                ["Report", "flag"],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditBanner;
