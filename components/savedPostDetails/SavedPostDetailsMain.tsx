"use client";


import { useState } from "react";
import RightSide from "../home/RightSide";
import HomeLeft from "../menu/HomeLeft";


const SavedPostDetailsMain = () => {
  const [activeProfile, setActiveProfile] = useState<boolean>(false);


  return (
    <main className="main-content">
      <div className="container sidebar-toggler">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
            {/* Home Left */}
            <HomeLeft clss="d-lg-none" />
          </div>
          <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
            <div className="post-item d-flex flex-column gap-5 gap-md-7">
              <div className="post-single-box p-3 p-sm-5">
               
         

              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-6 mt-5 mt-xl-0">
            <div
              className={`cus-overflow cus-scrollbar sidebar-head ${
                activeProfile ? "active" : ""
              }`}
            >
              {/* Home Right */}
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SavedPostDetailsMain;
