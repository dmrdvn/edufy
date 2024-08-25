import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PostAction from "./PostAction";
import { getUserInfo } from "../../contracts/contract-actions";
import photo1 from "../../public/images/avatar-1.svg";

enum TableStatus {
  CONTINUES = "continiues",
  FINISHED = "finished",
}


interface PostProps {
  tableContent: string;
  hostUser: string;
  initReward: number;
  rewardPool: number;
  tableParticipants: number;
  tableDate: string;
  tableEndDate: string;
  tableStatus: TableStatus; 
  winner: string;
}

const Post = ({ post }: { post: PostProps }) => {
  const { tableContent, hostUser, tableDate, tableEndDate, tableStatus } = post;

  const [hostInfo, setHostInfo] = useState<any>(null);

  useEffect(() => {
    const fetchHostInfo = async () => {
      if (hostUser) {
        try {
          const userInfo = await getUserInfo(`0x${hostUser}`);
          setHostInfo(userInfo);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchHostInfo();
  }, [hostUser]);

  const formatDate = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getHostImage = () => {
    if (hostInfo && hostInfo.photoUrl) {
      return hostInfo.photoUrl;
    }
    return photo1;
  };

  const getStatusClass = () => {
    switch (tableStatus) {
      case TableStatus.FINISHED:
        return "finished"; 
      case TableStatus.CONTINUES:
        return "continues"; 
      default:
        return "continues"; 
    }
  };

  return (
    <div className={`top-area pb-5 ${getStatusClass()}`}>
      <div className="profile-area d-center justify-content-between">
        <div className="avatar-item d-flex gap-3 align-items-center">
          <div className="avatar position-relative">
            <Image
              className="avatar-img max-un"
              src={getHostImage()}
              alt="photo"
              width={50}
              height={50}
            />
          </div>
          <div className="info-area">
            <h6 className="m-0">
              <Link href={`/public-profile/${hostUser}`}>
                {`${hostUser?.substring(0, 7)}...${hostUser?.substring(hostUser.length - 7)}`}
              </Link>
            </h6>
            <span className="smtxt status">
              Started: {formatDate(tableDate.toString())} | Deadline: {formatDate(tableEndDate.toString())}
            </span>
          </div>
        </div>
        <div className="btn-group cus-dropdown">
          {/* Post Action */}
          <PostAction />
        </div>
      </div>
      <div className="py-4">
        <p className="description">{tableContent || ""}</p>
      </div>
    </div>
  );
};

export default Post;
