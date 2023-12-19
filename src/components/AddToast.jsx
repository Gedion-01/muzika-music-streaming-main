import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { AiOutlineClose } from 'react-icons/ai';
const AddToast = ({open, setOpen, name}) => {

  return (
    <div className='z-30'>
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="z-20 flex flex-row justify-between w-full bg-cyan-500 text-slate-50 rounded-md  p-[10px]  data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="text-sm font-normal">
          {name}
        </Toast.Title>
        <Toast.Description className=''>
          
        </Toast.Description>
        <Toast.Action className="[grid-area:_action]" asChild altText="Goto schedule to undo">
          <button className="">
            <AiOutlineClose className='w-5 h-5 font-normal hover:text-slate-50' />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-11 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
    </div>
  );
};

export default AddToast;
