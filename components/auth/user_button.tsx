"use client";
import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/authenticate/use_current_user";
import LogoutButton from "@/components/auth/logout_button";
import { UserSettingsForm } from "@/app/(protected)/sassy_authy/settings/_components/setting_form";
export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Avatar className=" hover:opacity-60">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <FaUser></FaUser>
          </AvatarFallback>
        </Avatar>
      </DrawerTrigger>

      <DrawerContent>
        <div className=" items-start justify-center flex flex-col mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>User Setting</DrawerTitle>
            <DrawerDescription>
              This is your account setting model.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 flex flex-col w-full gap-2">
            <UserSettingsForm></UserSettingsForm>
            <LogoutButton>
              <div className="flex items-center ">
                <ExitIcon className=" h-4 w-4 mr-2"></ExitIcon>{" "}
                <span>Logout</span>
              </div>
            </LogoutButton>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
