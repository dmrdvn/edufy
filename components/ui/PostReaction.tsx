import { useEffect, useState } from "react";
import Image from "next/image";
import developer from "/public/images/dev.webp";

interface Participant {
  name: string;
}

interface PostReactionProps {
  reaction?: string;
  post: {
    tableParticipants: Participant[];
    initReward: number;
    rewardPool: number;
    winner?: string;
    tableEndDate: string; // Post'un bitiş tarihi
  };
}

const PostReaction = ({ reaction = "", post }: PostReactionProps) => {
  const { tableParticipants, initReward, rewardPool, winner, tableEndDate } = post;
  const [winnerAddress, setWinnerAddress] = useState<string>("");
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    const fetchWinner = async () => {
      try {
        const winnerInfo = winner || "";
        setWinnerAddress(winnerInfo);
      } catch (error) {
        console.error("Error fetching winner:", error);
      }
    };

    fetchWinner();

    // Post'un tarihinin geçip geçmediğini kontrol et
    const currentDate = new Date().getTime();
    const endDate = new Date(parseInt(tableEndDate) * 1000).getTime(); // Eğer timestamp saniye cinsindense

    if (currentDate > endDate) {
      setIsExpired(true);
    }
  }, [winner, tableEndDate]);

  const displayWinner = winnerAddress
    ? `${winnerAddress.substring(0, 2)}...${winnerAddress.substring(winnerAddress.length - 4)}`
    : "Pending";

  return (
    <>
      <div
        className={`total-react-share ${reaction} pb-4 d-center gap-2 flex-wrap justify-content-between`}
      >
        <div className="friends-list d-flex gap-3 align-items-center text-center">
          <p className="small-text m-0">Participations:</p>
          
          <ul className="d-flex align-items-center justify-content-center gap-2 small-icons">
            {tableParticipants.map((participant, index) => (
              <li key={index}>
                <Image src={developer} alt={participant.name} width={50} height={50} />
              </li>
            ))}
          </ul>
          
        </div>
        <p className="small-text m-0 winner-info">
            Winner: {displayWinner}
          </p>
        
        <div className="friends-list d-flex gap-3 align-items-center text-center">
          <p className="small-text m-0">Min Cost: {initReward.toString()}</p>
          <p className="small-text m-0">Reward Pool: {rewardPool.toString()}</p>
        </div>
      </div>
      <div className="like-comment-share py-5 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
      <button className="d-center gap-1 gap-sm-2 mdtxt">
          <i className="material-symbols-outlined mat-icon"> favorite </i>
          Like
        </button>

        <button
          className="d-center gap-1 gap-sm-2 mdtxt"
          disabled={isExpired} 
          style={{ cursor: isExpired ? "not-allowed" : "pointer" }} 
        >
          Join the Challenge
        </button>
        <button className="d-center gap-1 gap-sm-2 mdtxt">
          <i className="material-symbols-outlined mat-icon"> share </i>
          Share
        </button>
      </div>
      <style jsx>{`
        .winner-info {
          background-color: rgba(0, 128, 0, 0.1); /* Hafif yeşil arka plan */
          padding: 5px 10px;
          border-radius: 5px;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
        }
      `}</style>
    </>
  );
};

export default PostReaction;
