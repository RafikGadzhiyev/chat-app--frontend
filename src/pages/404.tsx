import { useNavigate } from "react-router-dom"
import {Button} from "@/components/ui/Button/Button.tsx";

function NotFound() {
  const navigate = useNavigate()

  return <div className='flex items-center justify-center min-h-[100vh]'>
    <div className='flex flex-col'>
      <h1 className='font-bold text-center'>404</h1>
      <p>Page is not found</p>

      <Button
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </div>
  </div>
}

export default NotFound
