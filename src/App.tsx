import {Link} from "react-router-dom";
import {ROUTES} from "@/enums/routes.enum.ts";
import {Button} from "@/components/ui/Button/Button.tsx";

function App() {
  return <div className='h-svh'>
    <div className='flex flex-col items-center my-auto'>
      <h1 className='font-bold text-2xl'>
        Welcome to unique and powerful chat app
      </h1>

      <Link to={ROUTES.SIGN_IN}>
        <Button>
          Get&apos;s started
        </Button>
      </Link>

    </div>
  </div>
}

export default App
