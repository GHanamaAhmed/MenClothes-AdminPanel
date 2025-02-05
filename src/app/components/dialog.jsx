"use client";
import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function DialogDefault({
  content,
  titile,
  onConfirm,
  onClose,
  isOpen,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
    onClose(!open);
  };
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{titile}</DialogHeader>
      <DialogBody divider>{content}</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>الغاء</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            onConfirm();
          }}
        >
          <span>تاكيد</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
