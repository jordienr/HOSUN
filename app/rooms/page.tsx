"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createAPI } from "@/lib/api-client";
import { useCreateRoom, useRooms } from "@/lib/queries";

export default function Page() {
  const { data: rooms, isLoading } = useRooms();
  const createRoom = useCreateRoom();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 text-left w-full">
      <div className="flex justify-between p-2">
        <h1 className="text-2xl font-bold">Rooms</h1>

        <button
          onClick={() => {
            const api = createAPI();
            api.rooms.join.$post({
              json: {
                name: "test",
                password: "test",
              },
            });
          }}
        >
          click me
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Room</DialogTitle>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const roomName = formData.get("roomName");
                  const password = formData.get("password");
                  createRoom.mutate({
                    name: roomName as string,
                    password: password as string,
                  });
                }}
              >
                <Input name="roomName" placeholder="Room Name" />
                <Input name="password" placeholder="Password" />
                <Button type="submit">Create</Button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-2 p-6">
        {rooms?.data?.map((room) => (
          <div className="p-4 border rounded-lg" key={room.id}>
            {room.name}
          </div>
        ))}
      </div>
    </div>
  );
}
