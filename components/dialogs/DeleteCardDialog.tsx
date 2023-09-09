import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/server/card/deleteCard";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

type DeleteCardDialogProps = {
  cardID: string;
};

export function DeleteCardDialog({ cardID }: DeleteCardDialogProps) {
  const { toast } = useToast();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteCard({ cardID });

      toast({
        title: "Card deleted",
        description: "Your card has been deleted successfully.",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An error occurred while deleting your card.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Trash className="w-4" />
          Delete Card
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your card
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete Card
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
