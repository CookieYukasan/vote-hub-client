// import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar";

import { User } from "@/@types";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "userName">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.userName ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.userName}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
