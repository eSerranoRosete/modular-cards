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

  const avatarFallback = getAvatarFallback(session.data?.user.name || "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <div className="px-2 mt-1">
          <div className="text-xs text-muted-foreground font-semibold w-full">
            {session.data?.user.name}
          </div>
          <div className="text-xs text-muted-foreground w-full mb-2">
            {session.data?.user.email}
          </div>
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

export const getAvatarFallback = (name: string) => {
  const [first, last] = name.split(" ");

  if (first && last) {
    return `${first[0]}${last[0]}`;
  }

  return first[0];
};

export const getFirstName = (name: string) => {
  const [first] = name.split(" ");

  return first;
};
