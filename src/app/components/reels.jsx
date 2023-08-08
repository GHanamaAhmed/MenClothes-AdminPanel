"use client";
import Link from "next/link";
import { Collapse } from "./import";
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
import React, { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Shorty from "./short2";
import { Axios } from "../../../lib/axios";
import { toasty } from "./toast";
import { useDispatch } from "react-redux";
import { uploadReel } from "../redux/reelsReducer";
import Short from "./swipers/short";

export default function Reels() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [productUrl, setProductUrl] = useState("");
  const dispatch = useDispatch();
  const toggleOpen = () => setOpen((cur) => !cur);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleFile = (e) => {
    setFile(e.currentTarget?.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.currentTarget?.files[0]);
    fileReader.addEventListener("loadend", (e) => {
      setFileUrl(fileReader.result);
    });
  };
  const addReel = () => {
    const formData = new FormData();
    formData.append("name", title);
    productUrl.split("/").length > 1 &&
      formData.append(
        "productId",
        productUrl.split("/")[productUrl.length - 1]
      );
    console.log(file);
    formData.append("video", file);
    Axios.post("/reels", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total;
        toasty(`تم رفع ${(progress * 100).toFixed(0)} من 100`, {
          toastId: "uploadReel",
          progress,
        });
      },
    })
      .then((res) => {
        toasty(`تم رفع الريل`, {
          toastId: "uploadReel",
          type: "success",
          autoClose: 5000,
        });
        dispatch(uploadReel(res.data));
        restInputes();
      })
      .catch((err) => {
        toasty(`${err?.response?.data || "فشل حذف الريل"}`, {
          toastId: "uploadReel",
          type: "error",
          autoClose: 5000,
        });
        console.error(err);
      });
  };
  const restInputes = () => {
    setFile(null);
    setFileUrl(null);
    setProductUrl("");
    setTitle("");
  };
  return (
    <>
      <div className="flex flex-row items-center  justify-center  md:w-full">
        <Card className=" w-fit max-w-2/3 bg-white shadow-lg rounded-lg p-4">
          <CardHeader className="mb-4 grid h-28 place-items-center bg-card1">
            <Typography variant="h3" color="white">
              upload reel
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-row items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <Input
                type="text"
                label="Reel name"
                value={title}
                size="md"
                color="teal"
                onChange={handleTitle}
              />
              {/* <Input
                type="text"
                label="description"
                size="md"
                color="teal"
                onChange={handleSubtitle}
              /> */}
              <label
                htmlFor="Myfile"
                className="bg-scandaryColor rounded-lg p-2 text-white hover:shadow-scandaryColor cursor-pointer shadow-md transition-all ease-in-out delay-150"
              >
                video
              </label>
              <input
                type="file"
                onChange={handleFile}
                name="Myfile"
                id="Myfile"
                className="hidden"
              />
              {!fileUrl && <Shorty title={title} />}
              {fileUrl && <Short reel={{ name: title, video: fileUrl }} />}
              <div className="flex flex-col items-center justify-center gap-2">
                <Button onClick={toggleOpen} className="rounded-xl bg-card1">
                  link product
                </Button>
                <div>
                  <Card
                    className={`flex transition-all flex-row items-center justify-center  md:w-fit ${
                      open ? "" : "hidden"
                    }`}
                  >
                    <CardBody className="w-fit flex flex-row items-center justify-center ">
                      <Input
                        type="text"
                        label="link"
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.currentTarget.value)}
                        color="teal"
                        className="max-w-[200px]"
                      />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              onClick={addReel}
              className="bg-scandaryColor shadow-scandaryColor hover:shadow-scandaryColor"
              fullWidth
            >
              <div className="flex justify-center">
                <ArrowUpTrayIcon className="h-8 w-8 text-white"></ArrowUpTrayIcon>
              </div>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
