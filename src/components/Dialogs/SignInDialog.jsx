import React, {useEffect, useState} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuth0 } from "@auth0/auth0-react";
import { post } from "../../HttpService/http_service";
import { useUserLoginData } from "../../hooks/useUserLoginData";

function SignInDialog({ open, handlePlayListClose, title, description, zindex }) {
  // Signed in user data container
  const { setUserid, setIsSignedIn } = useUserLoginData();
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } = useAuth0();
  const [signInClicked, setSignInClicked] = useState(false)
  async function signIn() {
    setSignInClicked(true)
    loginWithRedirect();
  }
  useEffect(() => {
    if (user && signInClicked) {
      const { nickname, email } = user;
      const data = {
        nickname: nickname,
        email: email
      };
      async function saveUserAccount() {
        const res = await post("/adduser", data);
        console.log(res);
        setUserid(res.userId);
        setIsSignedIn(true);
      }
      saveUserAccount();
    
      console.log(user)
    }
  }, [user]);

  return (
    <Dialog.Root open={open} onOpenChange={handlePlayListClose}>
      <Dialog.Portal className="">
        <Dialog.Overlay className={`${open === false ? "hidden" : "hidden"} fixed inset-0`} />
        <Dialog.Content className={`data-[state=open]:animate-contentShow fixed z-10 ${zindex} top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-gray-900 text-slate-50 focus:outline-none`}>
          <Dialog.Title className="text-[17px] font-bold px-6 py-4 text-xl">
            {title}
          </Dialog.Title>

          <Dialog.Description className="px-6 py-0">{description}</Dialog.Description>
          <div className="flex flex-row gap-2 px-6 py-4 justify-end">
            <Dialog.Close className="py-2 px-4 bg-gray-900 text-slate-200 hover:text-slate-50 rounded-md transition-all outline-none">
              Not now
            </Dialog.Close>
            <button onClick={signIn} className="py-2 px-4 bg-slate-200 hover:bg-white transition-all text-slate-950 rounded-md">
              Sign in
            </button>
          </div>

          {/* <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default SignInDialog;
