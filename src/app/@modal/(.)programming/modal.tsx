'use client';

import { useRouter } from 'next/navigation';

import "@/app/globals.css";
import Button from '@/app/components/button';


// document.documentElement.style.overflow = "hidden" // prevent bg scrolling

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function close() {
    router.back();
    router.refresh();
  }

  return (
    <div>
      {/* empty div for closing the modal */}
      <div onClick={close} className="fixed w-full h-full z-10 m-0">
      </div>
      {/* modal */}
      <div className="fixed inset-0 flex m-0 md:m-8 transition-all z-100 bg-(--background)/80 border-solid border-(--primary) border">

          <div className="absolute top-4 right-4 transform z-101">
            <Button onClick={close} text="x" />
          </div>

        <div className="flex-auto overflow-y-auto relative p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:none [&::-webkit-scrollbar-thumb]:bg-(--primary)">
          {children}
        </div>
      </div>
    </div>
  );
}
