"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { useChefModal } from "@/hooks/store/useChefModal";

interface ImageWithDescriptionUploadProps {
  disabled?: boolean;
  onChange: (values: { url: string; description?: string }[]) => void;
  onRemove: (url: string) => void;
  values: { url: string; description?: string }[];
}

export const ImageWithDescriptionUpload: React.FC<
  ImageWithDescriptionUploadProps
> = ({ disabled, onChange, onRemove, values }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange([...values, { url: result.info.secure_url, description: "" }]);
  };

  if (!isMounted) {
    return null;
  }
  const handleDescriptionChange = (url: string, description: string) => {
    // Update the description of the image with the given URL
    const updatedValues = values.map((item) =>
      item.url === url ? { ...item, description } : item
    );
    onChange(updatedValues);
  };

  return (
    <div className=" overflow-visible p-4 ">
      <div className="mb-4 h-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {values.map((value, index) =>
          value.url ? (
            <div
              key={value.url}
              className="space-y-4 items-center justify-center flex flex-col"
            >
              <div
                key={value.url}
                className="relative rounded-md overflow-hidden"
              >
                <div className="z-10 absolute top-2 right-2">
                  <Button
                    type="button"
                    onClick={() => onRemove(value.url)}
                    variant="destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Image
                  sizes="100"
                  height={50}
                  width={50}
                  className="object-cover h-auto w-auto aspect-square"
                  alt="Image"
                  src={value.url} // This is now guaranteed to be a non-empty string
                />
              </div>
              <div key={index}>
                <Label htmlFor={`description-${index}`}>Your Description</Label>
                <Textarea
                  value={value.description || ""}
                  placeholder="Type your description here."
                  className="h-auto w-full"
                  id={`description-${index}`}
                  onChange={(e) =>
                    handleDescriptionChange(value.url, e.target.value)
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Your description to this will be showed in the front
                </p>
              </div>
            </div>
          ) : null
        )}
      </div>

      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME_BILLBOARD}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlusIcon className=" h-4 w-4 mr-2"></ImagePlusIcon>
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
