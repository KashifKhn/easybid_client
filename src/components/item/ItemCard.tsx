import { ItemResponse } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ItemCardProps {
  item: ItemResponse;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4">
          <Image
            src={item.images[0]?.url || "/placeholder.png"}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <p className="text-sm mb-2">{item.description}</p>
        <p className="font-semibold">Starting Bid: ${item.startingBid}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/items/${item.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
