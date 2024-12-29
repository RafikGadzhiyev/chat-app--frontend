import useAuthStore from "@/store/auth.store.ts";

export default function MainPage() {
  const user = useAuthStore((store) => store.user)

  return <div>
    <h1 className='font-bold text-2xl'>Welcome back, {user?.name}!</h1>

  </div>
}
