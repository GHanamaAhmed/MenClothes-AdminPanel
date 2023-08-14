"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "./import";
import { useState } from "react";
import CardOr from "./card";
import { formatDate, getRelativeTime } from "../../../lib/date";
import { Axios } from "../../../lib/axios";
import { useDispatch } from "react-redux";
import { removeOrder, updateStatus } from "../redux/orderReducer";
import { TrashIcon } from "@heroicons/react/24/solid";
import DialogDefault from "./dialog";
import { toasty } from "./toast";
import { FiRefreshCcw } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
const sitStates = (state) => {
  switch (state) {
    case "accepted":
      return "مقبولة";
    case "pending":
      return "انتظار";
    case "rejected":
      return "رفض";
    case "cancelled":
      return "الغاء";
    case "completed":
      return "تم الاستلام";
    case "return":
      return "روتور";
  }
};
const sitStatesClass = (state) => {
  switch (state) {
    case "accepted":
      return "light-green";
    case "pending":
      return "";
    case "rejected":
      return "lime";
    case "cancelled":
      return "amber";
    case "completed":
      return "green";
    case "return":
      return "red";
  }
};
export default function CiTable2({
  TABS,
  TABLE_HEAD,
  TABLE_ROWS,
  count,
  max,
  page,
  onChangePage,
  onChangeName,
  onChangeTab,
  onRefrech,
  onReverse,
}) {
  const [open, setOpen] = useState(false);
  const [open0, setOpen0] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const handleOpen = () => setOpen(!open);
  const dispatch = useDispatch();
  const putStatus = (e) => {
    Axios.put("/orders", { id: currentOrder?._id, states: e })
      .then((res) => {
        console.log(res);
        dispatch(updateStatus(res.data));
      })
      .catch((err) => console.error(err));
  };
  const deleteOrder = () => {
    dispatch(removeOrder({ id: currentOrder?._id }))
      .unwrap()
      .then((res) => {
        toasty("تم حذف المنتج", {
          type: "success",
          toastId: "deleteOrder",
          autoClose: 5000,
        });
        setOpen0((prev) => !prev);
      })
      .catch((err) => {
        console.error(err);
        toasty("فشل حذف المنتج", {
          type: "error",
          toastId: "deleteOrder",
          autoClose: 5000,
        });
      });
  };
  return (
    <>
      <Card className="h-full  md:w-fit lg:w-full shadow-lg text-right ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-Hacen-Tunisia"
              >
                المستخدمين 
              </Typography>
              <Typography color="gray" className="mt-1 font-Hacen-Tunisia">
                عرض معلومات حول هؤلاء المستخدمين
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab
                    onClick={() => {
                      if (value == "all") {
                        onChangeTab("");
                      } else {
                        onChangeTab(value);
                      }
                    }}
                    key={value}
                    value={value}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-60 ">
              <Input
                onChange={(e) => onChangeName(e.currentTarget.value)}
                label="بحث"
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0 text-right min-h-[561px]">
          <table className="mt-4 w-full min-w-max table-auto  text-right">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-Hacen-Tunisia leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((order, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={
                            order?.photo ||
                            "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                          }
                          alt={order?.name}
                          size="sm"
                          className="z-10"
                        />
                        <div className="hidden flex-col  md:flex">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-Hacen-Tunisia"
                          >
                            {order?.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-Hacen-Tunisia opacity-70"
                          >
                            {order?.phone}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>{order?.return}</td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-Hacen-Tunisia"
                        >
                          {order?.productsIds?.length}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-Hacen-Tunisia opacity-70"
                        >
                          {order?.price}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Button
                          onClick={() => {
                            setCurrentOrder(order);
                            handleOpen();
                          }}
                          color={sitStatesClass(order?.states)}
                          variant="gradient"
                          className="font-Hacen-Tunisia"
                        >
                          {sitStates(order?.states)}{" "}
                        </Button>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-Hacen-Tunisia"
                      >
                        {getRelativeTime(new Date(order?.createAt))}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <IconButton
                        onClick={() => {
                          setCurrentOrder(order);
                          setOpen0((prev) => !prev);
                        }}
                        color="red"
                        className="bg-transparent"
                      >
                        <TrashIcon className="h-5 w-5 text-red-400" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div className="flex gap-5 items-center">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-Hacen-Tunisia"
            >
              {page}/{Math.ceil(count / max)}
            </Typography>
            <button onClick={() => onReverse()}>
              <LuArrowUpDown />
            </button>
            <button onClick={() => onRefrech()}>
              {" "}
              <FiRefreshCcw />
            </button>
          </div>
          <div className="flex gap-2">
            <Button
              disabled={page == 1}
              onClick={() => onChangePage(Number(page) * max - max * 2)}
              variant="outlined"
              color="blue-gray"
              size="sm"
            >
              قبل
            </Button>
            <Button
              disabled={Number(page) / Math.ceil(count / max) >= 1}
              onClick={() => onChangePage(Number(page) * max)}
              variant="outlined"
              color="blue-gray"
              size="sm"
            >
              التالي
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Dialog
        open={open}
        handler={handleOpen}
        dismiss={{ enabled: false }}
        className="font-Hacen-Tunisia"
        size="xl"
      >
        <DialogHeader className="font-Hacen-Tunisia">
          <div className="grid grid-cols-2 w-full">
            <div>
              <p>الطلبية</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-base text-gray-700">
                  الاسم : {currentOrder?.name}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-700">
                  رقم الهاتف : {currentOrder?.phone}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-700">
                  الولاية و البلدية : {currentOrder?.city}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-700">
                  العنوان : {currentOrder?.adress}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogBody divider className="overflow-y-auto h-[28rem]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {currentOrder?.productsIds?.map((e, i) => (
              <CardOr order={e} />
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="flex flex-row justify-between">
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-xl text-black">السعر :</p>
              <p className="text-xl text-green-700">
                {" "}
                {currentOrder?.price} دج
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-black">تم تخفيض :</p>
              <p className="text-sm text-green-700">
                {" "}
                {currentOrder?.disCount?.price || 0} دج
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              variant="text"
              color="red"
              className="mr-1"
              onClick={handleOpen}
            >
              <span>اغلاق</span>
            </Button>
            <div className="flex ">
              <Select
                onChange={putStatus}
                value={currentOrder?.states}
                tabIndex="1"
              >
                {TABS.filter((e) => e.value != "all").map((el, i) => {
                  return (
                    <Option
                      value={el?.value}
                      key={i}
                      className=" text-center transition-all"
                    >
                      <span className="">{el?.label}</span>
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
      <DialogDefault
        titile={"حذف طلبية"}
        content={"لايمكنك استرجاع المعلومات عند حذفها!"}
        isOpen={open0}
        onConfirm={deleteOrder}
        onClose={() => setOpen0((prev) => !prev)}
      />
    </>
  );
}
