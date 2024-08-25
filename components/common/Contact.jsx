"use client";

import contentData from "@/data/contentData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SingleContact from "./SingleContact";
import avatar_6 from "/public/images/avatar-6.png";

const Contact = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {/* children props */}
      {children}

      <div className="d-flex flex-column gap-6">
      <div className="profile-area d-center position-relative align-items-center justify-content-between">
            <div className="avatar-item d-flex gap-3 align-items-center">
              <div className="avatar-item">
                <Image
                  className="avatar-img max-un"
                  src={avatar_6}
                  alt="avatar"
                />
              </div>
              <div className="info-area">
                <h6 className="m-0">
                  <Link href="#" className="mdtxt">
                    Elon Taylor
                  </Link>
                 {/*  <Link href="/public-profile/post" className="mdtxt">
                    Elon Taylor
                  </Link> */}
                </h6>
              </div>
          </div>
          <span className="mdtxt abs-area d-center position-absolute end-0">
            5
          </span>
          
        </div>
        <div className="profile-area d-center position-relative align-items-center justify-content-between">
            <div className="avatar-item d-flex gap-3 align-items-center">
              <div className="avatar-item">
                <Image
                  className="avatar-img max-un"
                  src={avatar_6}
                  alt="avatar"
                />
              </div>
              <div className="info-area">
                <h6 className="m-0">
                  <Link href="#" className="mdtxt">
                    John Zack
                  </Link>
                </h6>
              </div>
          </div>
          <span className="mdtxt abs-area d-center position-absolute end-0">
            3
          </span>
          
        </div>
        <div className="profile-area d-center position-relative align-items-center justify-content-between">
            <div className="avatar-item d-flex gap-3 align-items-center">
              <div className="avatar-item">
                <Image
                  className="avatar-img max-un"
                  src={avatar_6}
                  alt="avatar"
                />
              </div>
              <div className="info-area">
                <h6 className="m-0">
                  <Link href="#" className="mdtxt">
                    Mike Brown
                  </Link>
                </h6>
              </div>
          </div>
          <span className="mdtxt abs-area d-center position-absolute end-0">
            1
          </span>
          
        </div>

       
      </div>
    </>
  );
};

export default Contact;
