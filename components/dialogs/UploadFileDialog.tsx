import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useIsOpen } from "@/hooks/useIsOpen";
import { UploadCloud } from "lucide-react";
import { ReactNode } from "react";

type UploadFileDialogProps = {
  trigger: ReactNode;
  onSuccess?: (src: string) => void;
};

export const UploadFileDialog = ({
  trigger,
  onSuccess,
}: UploadFileDialogProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useIsOpen();

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger onClick={onOpen} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="p-10">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-muted-foreground">
                SVG, PNG or JPG (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]; // Get the first selected file
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const imageString = event.target?.result; // This is the data URL representing the image

                    if (imageString) {
                      onSuccess && onSuccess(imageString as any); // Pass the data URL to onSuccess
                      onClose();
                    }
                  };
                  reader.readAsDataURL(file); // Read the file as a data URL
                }
              }}
            />
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
};
