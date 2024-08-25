import eventData from "@/data/eventData";
import EventCard from "../cards/EventCard";
import Contact from "../common/Contact";

const ProfileEventsMain = () => {
  return (
    <>
      <div className="col-xxl-9 col-xl-8">
        <div className="row cus-mar friend-request">
          {eventData.map((itm) => (
            <div key={itm.id} className="col-xxl-4 col-sm-6 col-8">
              {/* Event Card */}
              <EventCard data={itm} />
            </div>
          ))}
        </div>
      </div>

      <div className="col-xxl-3 col-xl-4 col-lg-8 mt-5 mt-xl-0">
        <div className="cus-scrollbar">
          <div className="sidebar-wrapper d-flex al-item justify-content-end justify-content-xl-center flex-column flex-md-row flex-xl-column flex gap-6">
            <div className="sidebar-area p-5">
              {/* Contact */}
              <Contact>
                <div className="mb-4">
                  <h6 className="d-inline-flex">Contact</h6>
                </div>
              </Contact>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEventsMain;
