import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Input,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { Axios } from "../../../lib/axios";
export default function InfoDialog({ children }) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [phone, setphone] = React.useState("");
  const handleOpen = () => setOpen(!open);
  useEffect(() => {
    Axios.get("/info")
      .then((res) => {
        setEmail(res.data?.email);
        setFacebook(res.data?.facebook);
        setInstagram(res.data?.instagram);
        setphone(res.data?.phone);
      })
      .catch((err) => console.error(err));
  }, [open]);
  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>معلومات التواصل</DialogHeader>
        <DialogBody divider className="flex flex-col items-center">
          <Card color="transparent" shadow={false}>
            <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  size="lg"
                  label="الايميل"
                />
                <Input
                  value={facebook}
                  onChange={(e) => setFacebook(e.currentTarget.value)}
                  size="lg"
                  label="رابط الفيسبوك"
                />
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.currentTarget.value)}
                  size="lg"
                  label="رابط الانستغرام"
                />
                <Input
                  value={phone}
                  type="number"
                  onChange={(e) => setphone(e.currentTarget.value)}
                  size="lg"
                  label="رقم الهاتف"
                />
              </div>
            </div>
          </Card>
        </DialogBody>
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
              Axios.post("/info", { email, facebook, instagram, phone }).catch(
                (err) => {
                  console.error(err);
                }
              );
              handleOpen();
            }}
          >
            <span>تاكيد</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
