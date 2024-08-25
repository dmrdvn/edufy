import ProfileBanner from "./ProfileBanner";

const PublicProfileMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Profile Banner */}
            <ProfileBanner
              tabData={[
                ["Post", "post", "/public-profile/post"],
                
              ]}
            />
          </div>
        </div>
        <div className="row sidebar-toggler">
          {/* Content */}
          {children}
        </div>
      </div>
    </main>
  );
};

export default PublicProfileMain;
