"use client";
import {
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import reel from "./img/reels.png";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from "./../import";
import DialogDefault from "../dialog";
import { useState } from "react";
import Reels from "../reels";
import Reels2 from "../reels2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeReel } from "../../redux/reelsReducer";
import { toasty } from "../toast";
export default function Short({ reel, edit }) {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOpen = (e) => setOpen(!open);
  const deleteReel = () => {
    dispatch(removeReel({ id: reel?._id }))
      .unwrap()
      .then((res) => {
        toasty(`تم حذف الريل`, {
          toastId: "deleteReel",
          type: "success",
          autoClose: 5000,
        });
        setIsOpen(!isOpen);
      })
      .catch((err) => {
        toasty(`فشل الحذف`, {
          toastId: "deleteReel",
          type: "success",
          autoClose: 5000,
        });
        console.error(err);
      });
  };
  return (
    <>
      <DialogDefault
        content={"are you sure ,if you want have updated this reel"}
        titile={"update Reel"}
        isOpen={isOpen}
        onConfirm={deleteReel}
        onClose={(value) => setIsOpen(value)}
      />
      <div
        className="my-3 text-right left-2"
        onMouseEnter={(e) => {
          e.preventDefault();
          setPlay(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setPlay(false);
        }}
      >
        <div className="relative m-0  max-w-none rounded-lg h-72 max-h-none w-52 md:h-80 md:w-60 flex items-center justify-start text-right">
          {!play && reel?.thumbanil && (
            <Image
              priority
              crossOrigin="anonymous"
              fill
              src={reel?.thumbanil}
              alt="reel"
            />
          )}
          {(play || !reel?.thumbanil) && (
            <video
              crossOrigin="anonymous"
              autoPlay
              src={reel?.video}
              className="h-full w-full"
              controls={false}
              muted
              loop
            />
          )}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col">
            <p className="text-32 text-white">{reel?.name}</p>
          </div>
          <div className="absolute bottom-1 left-1  lg:left-2 z-10 flex flex-col text-right">
            <p className="text-sm text-red-500 flex flex-row-reverse items-center justify-end ">
              {reel.likes}{" "}
              <HeartIcon width={25} height={25} className="text-sm" />
            </p>
            <p
              onClick={(e) => {
                window.open(`http://localhost:3000/reels/${reel?._id}`);
              }}
              className="text-sm text-scandaryColor flex flex-row-reverse items-center justify-end "
            >
              {reel.comments}{" "}
              <Link href="#">
                {" "}
                <ChatBubbleBottomCenterIcon
                  width={25}
                  height={25}
                  className=""
                />
              </Link>
            </p>
            <p className="text-sm text-trueblue flex flex-row-reverse items-center justify-end">
              {reel?.views} <EyeIcon className="" width={25} height={25} />
            </p>
          </div>
        </div>
        {edit && (
          <div className="absolute top-5 right-4 z-10 flex flex-col gap-0 text-right">
            <IconButton
              onClick={() => setIsOpen(!open)}
              className="bg-transparent shadow-none hover:shadow-red-500 "
            >
              <p className="text-sm text-red-500 flex flex-row-reverse items-center justify-end ">
                <TrashIcon width={20} height={20} className="text-sm" />
              </p>
            </IconButton>
            <IconButton
              className="bg-transparent shadow-none hover:shadow-lightSolid"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
            >
              <p className="text-sm text-lightSolid flex flex-row-reverse items-center justify-end ">
                <PencilIcon width={20} height={20} className="" />
              </p>
            </IconButton>
            <Reels2
              isOpen={open}
              onChaneOpen={(value) => setOpen(value)}
              reel={reel}
            />
          </div>
        )}
      </div>
    </>
  );
}
