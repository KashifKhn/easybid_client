import { ItemResponse, AuctionResponse } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { ImageCarousel } from "../ImageCarousel";

interface ItemDetailProps {
  item: ItemResponse;
  auctions: AuctionResponse[];
}

export const ItemDetail: React.FC<ItemDetailProps> = ({ item, auctions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ImageCarousel images={item.images} alt={item.name} />
      <div>
        <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
        <p className="text-lg mb-4">{item.description}</p>
        <div className="space-y-2 mb-4">
          <p>
            <strong>Starting Bid:</strong> ${item.startingBid}
          </p>
          <p>
            <strong>Buy Now Price:</strong> ${item.buyNowPrice}
          </p>
          <p>
            <strong>Category:</strong> {item.category.name}
          </p>
          <p>
            <strong>Seller:</strong> {item.user.name}
          </p>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Auctions</h2>
        {auctions.length > 0 ? (
          <ul className="space-y-4">
            {auctions.map((auction) => (
              <li key={auction.id} className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <Badge>{auction.status}</Badge>
                    <p className="mt-2">
                      Starts: {new Date(auction.startTime).toLocaleString()}
                    </p>
                    <p>Ends: {new Date(auction.endTime).toLocaleString()}</p>
                  </div>
                  <Button asChild>
                    <Link href={`/auctions/${auction.id}`}>View Auction</Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>The Item is Not Auction Yet</p>
        )}
      </div>
    </div>
  );
};
