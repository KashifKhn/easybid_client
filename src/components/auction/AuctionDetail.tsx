import { AuctionResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ImageCarousel } from "./ImageCarousel";
import { RemainingTime } from "./RemainingTime";

interface AuctionDetailProps {
  auction: AuctionResponse;
}

export const AuctionDetail: React.FC<AuctionDetailProps> = ({ auction }) => {
  const {
    item,
    startTime,
    endTime,
    status,
    type,
    incrementType,
    incrementAmount,
    incrementPercentage,
  } = auction;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{item.name}</h1>

        <RemainingTime endTime={endTime} />
      </div>
      <ImageCarousel images={item.images} alt={item.name} />
      <div className="flex items-center space-x-2">
        <Badge>{status}</Badge>
        <Badge variant="outline">{type}</Badge>
      </div>
      <p className="text-lg">{item.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Starting Bid</h3>
          <p>${item.startingBid}</p>
        </div>
        <div>
          <h3 className="font-semibold">Buy Now Price</h3>
          <p>${item.buyNowPrice}</p>
        </div>
        <div>
          <h3 className="font-semibold">Start Time</h3>
          <p>{new Date(startTime).toLocaleString()}</p>
        </div>
        <div>
          <h3 className="font-semibold">End Time</h3>
          <p>{new Date(endTime).toLocaleString()}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Bid Increment</h3>
        <p>
          {incrementType === "AMOUNT"
            ? `$${incrementAmount.toFixed(2)} per bid`
            : incrementType === "PERCENTAGE"
              ? `${incrementPercentage}% of current bid`
              : "No increment"}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">Seller</h3>
        <p>{item.user.name}</p>
      </div>
    </div>
  );
};
