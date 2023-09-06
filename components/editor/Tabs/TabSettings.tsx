import { DeleteCardDialog } from "@/components/dialogs/DeleteCardDialog";

type TabSettingsProps = {
  cardID?: string;
};

export const TabSettings = ({ cardID }: TabSettingsProps) => {
  return (
    <div>
      <div>
        <h5 className="text-xl font-semibold">Settings</h5>
        <p className="text-sm mb-5 text-muted-foreground">
          Change the settings for your card
        </p>
      </div>
      {cardID && <DeleteCardDialog cardID={cardID} />}
    </div>
  );
};
