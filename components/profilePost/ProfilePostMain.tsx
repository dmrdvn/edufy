"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Contact from "../common/Contact";
import MakePost from "../common/MakePost";
import NewsFeeds from "../common/NewsFeeds";
import Photos from "../marketplacePost/Photos";
import { getUserInfo } from '../../contracts/contract-actions'; // Kullanıcı bilgilerini almak için getUserInfo fonksiyonunu içe aktar
import { useAccount } from 'wagmi';

const ProfilePostMain = () => {
 
  return (
    <>
      
      <div className="col-xxl-6 col-xl-6 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
       

        {/* Feeds */}
        <NewsFeeds clss="p-3 p-sm-5" />
      </div>
      
    </>
  );
};

export default ProfilePostMain;
