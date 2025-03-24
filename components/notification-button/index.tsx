"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import Markdown from "react-markdown";

// Sample notifications for testing the UI
const sampleNotifications = [
  {
    id: "1",
    user_notification_id: "un1",
    title: "Welcome to the Platform!",
    message:
      "Thank you for joining our platform. We're excited to have you here. Explore all the features and let us know if you have any questions.",
    type: "announcement",
    is_global: true,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    is_read: false,
    sender_id: "admin-1",
  },
  {
    id: "2",
    user_notification_id: "un2",
    title: "New Features Released",
    message:
      "We've just released several new features including advanced analytics, improved chat interface, and better performance. Check them out now!",
    type: "announcement",
    is_global: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    is_read: false,
    sender_id: "admin-1",
  },
  {
    id: "3",
    user_notification_id: "un3",
    title: "Scheduled Maintenance",
    message:
      "We'll be performing scheduled maintenance this Saturday from 2AM-4AM UTC. The service might experience brief interruptions during this time.",
    type: "system",
    is_global: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    is_read: true,
    sender_id: "admin-2",
  },
  {
    id: "4",
    user_notification_id: "un4",
    title: "Your Subscription",
    message:
      "Your subscription will renew in 7 days. Please ensure your payment method is up to date to avoid any interruption in service.",
    type: "system",
    is_global: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    is_read: false,
    sender_id: "system",
  },
  {
    id: "5",
    user_notification_id: "un5",
    title: "Special Offer",
    message:
      "For a limited time, upgrade to our premium plan and get 20% off your first three months. Use code SPECIAL20 at checkout.",
    type: "announcement",
    is_global: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    is_read: true,
    sender_id: "admin-1",
  },
  {
    id: "6",
    user_notification_id: "un6",
    title: "Community Webinar",
    message:
      "Join us for a live webinar on 'Maximizing Productivity with Our Tools' this Friday at 1PM EST. Register now to secure your spot!",
    type: "announcement",
    is_global: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    is_read: true,
    sender_id: "admin-3",
  },
  {
    id: "7",
    user_notification_id: "un7",
    title: "Security Update",
    message:
      "We've enhanced our security protocols. Please consider enabling two-factor authentication in your account settings for additional protection.",
    type: "system",
    is_global: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    is_read: true,
    sender_id: "admin-2",
  },
];

type Notification = {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export function NotificationButton({ userId }: { userId: string }) {
  const {
    data: notificationsData,
    isPending: isNotificationsPending,
    error: notificationsError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("notifications").select("*");
      if (error) throw error;
      return data;
    },
  });

  console.log({ notificationsData, notificationsError });

  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAsRead = (notificationId: string) => {
    // setNotifications((prev) =>
    //   prev.map((n) =>
    //     n.user_notification_id === notificationId ? { ...n, is_read: true } : n
    //   )
    // );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "relative",
              })}
            >
              <Bell className="w-full" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 right-0.5 bg-primary text-primary-foreground text-[10px] rounded-full min-w-5 h-5 flex items-center justify-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">Notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {/* {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )} */}
        </div>

        <ScrollArea className="h-[300px] bg-transparent">
          {notificationsError ? (
            <div className="p-4 text-center text-red-500">
              Error loading notifications
            </div>
          ) : isNotificationsPending ? (
            <div className="p-4 text-center text-muted-foreground">
              Loading...
            </div>
          ) : notificationsData.length > 0 ? (
            notificationsData
              //   .filter((n) => !n.is_read)
              .map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </ScrollArea>

        {/* <Tabs defaultValue="unread" className="pt-1">
          <div className="px-2">
            <TabsList className="w-full grid grid-cols-2 rounded-full">
              <TabsTrigger value="unread" className="relative rounded-full">
                Unread
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-7 bg-primary text-primary-foreground text-[10px] rounded-full min-w-5 h-5 flex items-center justify-center">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="all" className="rounded-full">
                All
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="unread">
            <ScrollArea className="h-[300px]">
              {notifications.filter((n) => !n.is_read).length > 0 ? (
                notifications
                  .filter((n) => !n.is_read)
                  .map((notification) => (
                    <NotificationItem
                      key={notification.user_notification_id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                    />
                  ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No unread notifications
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="all">
            <ScrollArea className="h-[300px]">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.user_notification_id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs> */}
      </PopoverContent>
    </Popover>
  );
}

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}) {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowNotification(true)}
        className={cn(
          "p-4 hover:bg-muted/50 cursor-pointer"
          // !notification.is_read && "bg-muted/20"
        )}
        //   onClick={() =>
        //     !notification.is_read && onMarkAsRead(notification.user_notification_id)
        //   }
      >
        <div className="flex justify-between items-start mb-1 gap-1">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <span className="text-xs text-muted-foreground w-fit">
            {format(new Date(notification.created_at), "MMM d, h:mm a")}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {notification.message
            .slice(0, 100)
            .replace(
              /\*\*|__|\*|_|`|#|>|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\)|-{3,}|\|.*\|/g,
              ""
            )}
          {notification.message.length > 100 && "..."}
        </p>
        {/* {!notification.is_read && (
        <div className="mt-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(notification.user_notification_id);
            }}
          >
            Mark as read
          </Button>
        </div>
      )} */}
      </div>
      <ShowNotification
        message={notification.message}
        open={showNotification}
        onOpenChange={setShowNotification}
      />
    </>
  );
}

interface ShowNotificationProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  message: string;
}

export function ShowNotification({ message, ...props }: ShowNotificationProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Send Email</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[700px] max-h-[95dvh] overflow-auto flex flex-col [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-sidebar [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-transparent dark:[&::-webkit-scrollbar-thumb]:bg-sidebar [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
          <MessageBody message={message} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...props}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Send Email</Button>
      </DrawerTrigger> */}
      <DrawerContent className="max-h-[95%] flex flex-col p-0">
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-sidebar [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-transparent dark:[&::-webkit-scrollbar-thumb]:bg-sidebar [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
          <MessageBody message={message} />
          {/* <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function MessageBody({ message }: { message: string }) {
  return (
    <div className="prose dark:prose-invert prose-sm max-w-none">
      <Markdown>{message}</Markdown>
    </div>
  );
}
