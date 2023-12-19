import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { GiMusicSpell } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { post } from "../HttpService/http_service";
import { useUserLoginData } from "../hooks/useUserLoginData";
import { FiMenu } from "react-icons/fi";
import MobileSideNav from "./MobileSideNav";
//10px8px2px6px6px16px{
function Navbar() {
  const [mobileSidebarisOpen, setMobileSidebarIsOpen] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false)
  // Signed in user data container
  const { setUserid, setIsSignedIn } = useUserLoginData();
  const location = useLocation();
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } = useAuth0();

  async function signIn() {
    setSignInClicked(true)
    loginWithRedirect();
  }
  
  useEffect(() => {
    if (user) {
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
    }

  }, [user]);
  //console.log(isLoading, user);
  function openMobileSidebar() {
    setMobileSidebarIsOpen(true);
  }
  function closeMobileSidebar() {
    setMobileSidebarIsOpen(false);
  }
  return (
    <>
      <div
        className={`${
          mobileSidebarisOpen ? "absolute top-0 h-full w-full z-20" : ""
        }`}
      >
        <MobileSideNav open={mobileSidebarisOpen} close={closeMobileSidebar} />
      </div>
      <section className="bg-gray-950 sticky top-0 z-10 pt-2">
      <nav
        id="nav-bar"
        className="rounded-md bg-gray-900 mx-3 px-2 py-2 grid grid-cols-4 items-center"
      >
        <button
          className="sm:hidden cursor-pointer"
          id="mobile-side-bar-button"
          onClick={openMobileSidebar}
        >
          <FiMenu className="h-10 w-10 text-slate-50 hover:text-cyan-500 duration-300" />
        </button>
        <div
          className={`${
            location.pathname === "/search" ? "block" : "hidden"
          } transition-all duration-300 col-span-2`}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-6 h-6 text-slate-100" />
            </div>

            <input
              type="search"
              name=""
              id="search"
              className=" w-full p-2 pl-10 text-md border-2 border-slate-800 bg-slate-800 placeholder:text-slate-400 text-slate-100 rounded-md focus:outline-none focus:border-gray-800"
              placeholder="search"
            />
          </div>
        </div>

        <div className={`col-start-4 col-span-1 flex justify-end gap-2`}>
          {!user && !isLoading ? (
            <button
              onClick={signIn}
              className="py-2 px-4 bg-cyan-600 text-slate-100 rounded-md transition-all hover:bg-cyan-500"
            >
              Sign in
            </button>
          ) : (
            ""
          )}
          {/* {user ? (
            <button
              onClick={() => logout()}
              className="py-2 px-4 bg-cyan-600 text-slate-100 rounded-md transition-all hover:bg-cyan-500"
            >
              Sign out
            </button>
          ) : (
            ""
          )} */}
          {user ? (
            <div>
              {/* <img src={user.picture} alt="profile" className="rounded-full h-10 w-10" /> */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <img
                    src={user.picture}
                    alt="profile"
                    className="rounded-full h-10 w-10"
                  />
                  
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="z-10 min-w-[220px]  bg-gray-900 text-slate-50 rounded-md p-[5px]  data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                    collisionPadding={5}
                  >
                    <DropdownMenu.Item onClick={() => logout()} className="outline-none px-3 py-1 rounded-md hover:bg-gray-800 cursor-default">
                      Sign out
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="outline-none px-3 py-1 rounded-md hover:bg-gray-800 cursor-default">
                      Setting
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="fill-gray-900" />
                  </DropdownMenu.Content>
                  
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      </section>
    </>
  );
}

export default Navbar;
