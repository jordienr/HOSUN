import { useSupabase } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRooms = () => {
  const supa = useSupabase();
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => await supa.from("rooms").select("*"),
  });
};

type Room = {
  name: string;
  password: string;
};

export const useCreateRoom = () => {
  const supa = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (room: Room) => {
      const user = await supa.auth.getUser();
      if (user.error) {
        throw user.error;
      } else
        return supa.from("rooms").insert({
          name: room.name,
          password: room.password,
          owner_id: user.data.user.id,
        });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
