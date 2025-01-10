"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useItems } from "@/hooks/useItems";
import { CreateAuction, UpdateAuction, AuctionResponse } from "@/types";
import {
  auctionStatusOptions,
  auctionTypeOptions,
  incrementTypeOptions,
} from "@/constans/constants";
import { useAuth } from "@/hooks/useAuth";

const auctionSchema = z
  .object({
    itemId: z.string().min(1, "Please select an item."),
    startTime: z.string().refine(
      (date) => {
        const now = new Date();
        const startDate = new Date(date);
        return startDate > now;
      },
      { message: "Start time must be in the future." },
    ),
    endTime: z.string().refine(
      (date) => {
        const now = new Date();
        const endDate = new Date(date);
        return endDate > now;
      },
      { message: "End time must be in the future." },
    ),
    type: z.enum(["FIXED", "FREE"]),
    status: z.enum(["PENDING", "ACTIVE", "COMPLETED", "CANCELED"]),
    incrementType: z.enum(["AMOUNT", "PERCENTAGE", "NONE"]),
    incrementAmount: z
      .number()
      .min(0, "Increment amount must be a positive number."),
    incrementPercentage: z
      .number()
      .min(0, "Increment percentage must be a positive number.")
      .max(100, "Increment percentage must be less than or equal to 100."),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startTime);
      const endDate = new Date(data.endTime);
      return endDate > startDate;
    },
    {
      message: "End time must be after start time.",
      path: ["endTime"],
    },
  );

type AuctionFormData = z.infer<typeof auctionSchema>;

interface AuctionFormProps {
  initialData?: AuctionResponse;
  onSubmit: (data: CreateAuction | UpdateAuction) => void;
  isLoading: boolean;
}

export function AuctionForm({
  initialData,
  onSubmit,
  isLoading,
}: AuctionFormProps) {
  const { getItems } = useItems();
  const { user } = useAuth();
  const { data: items } = getItems({
    auctioned: "false",
    userId: user?.user.id,
  });

  const isEditing = !!initialData;

  const form = useForm<AuctionFormData>({
    resolver: zodResolver(auctionSchema),
    defaultValues: initialData || {
      itemId: "",
      startTime: "",
      endTime: "",
      type: "FREE",
      status: "PENDING",
      incrementType: "AMOUNT",
      incrementAmount: 0,
      incrementPercentage: 0,
    },
  });

  const handleSubmit = (data: AuctionFormData) => {
    const transformedData: CreateAuction | UpdateAuction = {
      ...data,
    };
    if (isEditing) {
      (transformedData as UpdateAuction) = initialData;
    }
    onSubmit(transformedData);
  };

  const watchIncrementType = form.watch("incrementType");
  const watchAuctionType = form.watch("type");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {items?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the item for this auction.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </FormControl>
              <FormDescription>
                Set the start time for the auction (must be in the future).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </FormControl>
              <FormDescription>
                Set the end time for the auction (must be after the start time).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select auction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {auctionTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose the type of auction.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {initialData && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {auctionStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Set the current status of the auction.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {watchAuctionType === "FIXED" && (
          <>
            <FormField
              control={form.control}
              name="incrementType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Increment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select increment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incrementTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how the bid increments will work.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchIncrementType === "AMOUNT" && (
              <FormField
                control={form.control}
                name="incrementAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Increment Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        min={-1}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set the increment amount for bids.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {watchIncrementType === "PERCENTAGE" && (
              <FormField
                control={form.control}
                name="incrementPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Increment Percentage</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={-1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set the increment percentage for bids.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}
        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Submitting..."
              : initialData
                ? "Update Auction"
                : "Create Auction"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
