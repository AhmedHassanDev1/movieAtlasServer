import { GetMe } from "@/features/user/api/user"
import { useQuery } from "@tanstack/react-query"



function useAuth() {
  return useQuery({
    queryFn: GetMe,
    queryKey: ["get me"]
  })
}

export default useAuth
