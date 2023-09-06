import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User, Wallet } from "lucide-react";
import { SignOut } from "./SignOut";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";

export const ProfileMenu = () => {
  const session = useSession();

  if (!session) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>ES</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <div className="text-xs text-muted-foreground w-full px-2 mb-2">
          {session.data?.user.email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="w-4 mr-2" />
          Your Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Wallet className="w-4 mr-2" />
          Manage Subscription
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
