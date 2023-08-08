"use client";
import Link from "next/link";
import { Collapse, Dialog, DialogBody, DialogFooter } from "./import";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Typography,
} from "./import";
import React, { useEffect, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Shorty from "./short2";
import Image from "next/image";
import Short from "./swipers/short";
import { useDispatch } from "react-redux";
import { updateReel } from "../redux/reelsReducer";
import { toasty } from "./toast";

export default function Reels2({ reel, isOpen, onChaneOpen }) {
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const toggleOpen2 = () => setOpen2((cur) => !cur);
  const handleOpen = (e) => {
    setOpen(!open);
    onChaneOpen(!open);
  };
  const dispatch = useDispatch();
  const handleTitle = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    setName(reel?.name);
    reel?._productId &&
      setLink("http://localhos:3000/reels/" + reel?._productId);
  }, [reel]);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const putReel = () => {
    link.split("/").length > 1 &&
      dispatch(
        updateReel({
          name,
          id: reel?._id,
          productId: link.split("/")[link?.split()?.length - 1],
        })
      )
        .unwrap()
        .then((res) => {
          toasty("تم تحديث الريل", {
            toastId: "updateReel",
            type: "success",
            autoClose: 5000,
          });
          handleOpen();
        })
        .catch((err) => {
          toasty("فشل تحديث الريل", {
            toastId: "updateReel",
            type: "error",
            autoClose: 5000,
          });
          console.error(err);
        });
    !link &&
      dispatch(
        updateReel({
          name,
          id: reel?._id,
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          toasty("تم تحديث الريل", {
            toastId: "updateReel",
            type: "success",
            autoClose: 5000,
          });
        })
        .catch((err) => {
          toasty("فشل تحديث الريل", {
            toastId: "updateReel",
            type: "error",
            autoClose: 5000,
          });
          console.error(err);
        });
  };
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogBody
        divider
        className="overflow-y-auto h-[30rem] flex flex-row justify-center items-center"
      >
        <div className="flex flex-row items-center  justify-center p-2 md:w-fit">
          <Card className="h-5/6 w-fit max-w-2/3 bg-white shadow-lg rounded-lg p-2">
            <CardBody className="h-5/6 flex flex-row items-center justify-center gap-2">
              <div className="flex flex-col items-center justify-center gap-2">
                <Input
                  type="text"
                  label="Reel name"
                  size="md"
                  color="teal"
                  value={name}
                  onChange={handleTitle}
                />
                <Short reel={reel}/>
                <div className="flex flex-col items-center justify-center gap-2">
                  <Button onClick={toggleOpen2} className="rounded-xl bg-card1">
                    link product
                  </Button>
                  <div>
                    <Card
                      className={`flex transition-all flex-row items-center justify-center  md:w-fit ${
                        open2 ? "" : "hidden"
                      }`}
                    >
                      <CardBody className="w-fit flex flex-row items-center justify-center ">
                        <Input
                          type="text"
                          label="link"
                          color="teal"
                          value={link}
                          onChange={(e) => setLink(e.currentTarget.value)}
                          className="max-w-[200px]"
                        />
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>اغلاق</span>
        </Button>
        <Button variant="gradient" color="green" onClick={putReel}>
          <span>تحديث</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
