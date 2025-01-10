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
import { Textarea } from "@/components/ui/textarea";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  NUMBER_FILES,
} from "@/constans/constants";
import { useCategories } from "@/hooks/useCategories";
import { createItemSchema, editItemSchema } from "@/lib/validations/item";
import { ItemFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ImageUpload } from "./ImageUpload";
import { useAuth } from "@/hooks/useAuth";

interface ItemFormProps {
  initialData?: Partial<ItemFormData>;
  onSubmit: (data: ItemFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ItemForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ItemFormProps) {
  const { getCategories } = useCategories();
  const { data: categories } = getCategories({ isActive: "true" });
  const { user } = useAuth();

  const form = useForm<ItemFormData>({
    resolver: zodResolver(initialData ? editItemSchema : createItemSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      startingBid: 0,
      buyNowPrice: 0,
      categoryId: "",
      userId: user?.user.id,
      files: [],
    },
  });

  const handleSubmit = (data: ItemFormData) => {
    try {
      onSubmit(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          form.setError(err.path as any, {
            type: "manual",
            message: err.message,
          });
        });
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Item name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of your item.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Item description" {...field} />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingBid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Bid</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={-1}
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Set the starting bid for your item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buyNowPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buy Now Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={-1}
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Set the buy now price for your item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best fits your item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUpload
                  onChange={(files: File[]) => field.onChange(files)}
                  value={field.value}
                  maxFiles={NUMBER_FILES}
                  maxSize={MAX_FILE_SIZE}
                  accept={ACCEPTED_IMAGE_TYPES}
                />
              </FormControl>
              <FormDescription>
                Upload up to 10 images of your item. Each image should be less
                than 10MB.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Submitting..."
              : initialData
                ? "Update Item"
                : "Create Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
