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
                المستخدمين الاوفياء
              </Typography>
              <Typography color="gray" className="mt-1 font-Hacen-Tunisia">
                عرض معلومات حول هؤلاء المستخدمين
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="outlined"
                color="blue-gray"
                size="sm"
                className="font-Hacen-Tunisia"
              >
                عرض الكل
              </Button>
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
        <CardBody className="overflow-auto px-0 text-right">
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
                            {order?.email}
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
          <Typography
            variant="small"
            color="blue-gray"
            className="font-Hacen-Tunisia"
          >
            {page}/{Math.ceil(count / max)}
          </Typography>
          <div className="flex gap-2">
            <Button
              disabled={page == 1}
              onClick={() => onChangePage(Number(page) * max - max * 2)}
              variant="outlined"
              color="blue-gray"
              size="sm"
            >
              Previous
            </Button>
            <Button
              disabled={Number(page) / Math.ceil(count / max) >= 1}
              onClick={() => onChangePage(Number(page) * max)}
              variant="outlined"
              color="blue-gray"
              size="sm"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Dialog
        open={open}
        handler={handleOpen}
        dismiss={{ enabled: false }}
        className="font-Hacen-Tunisia"
      >
        <DialogHeader className="font-Hacen-Tunisia">الطلبية</DialogHeader>
        <DialogBody divider className="overflow-y-auto h-[30rem]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {currentOrder?.productsIds?.map((e, i) => (
              <CardOr order={e} />
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="flx flex-row gap-2">
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
              {/* <div className="group bg-green-600 rounded-lg mb-1">
                <Option
                  index={2}
                  className="bg-green-600  text-center  group-hover:bg-lightSolid transition-all"
                >
                  <span className="text-white group-hover:text-black">
                    قبول الطلبية
                  </span>
                </Option>
              </div>
              <div className="group hover:opacity-100 transition-all opacity-60 rounded-lg mb-1">
                <Option
                  index={3}
                  className="bg-blue-600  text-center  group-hover:bg-lightSolid transition-all"
                >
                  <span className="text-white group-hover:text-black">
                    اتمام الطلبية
                  </span>
                </Option>
              </div>
              <div className="group opacity-60 hover:opacity-100 transition-all rounded-lg mb-1">
                <Option
                  index={4}
                  className="bg-red-600  text-center  group-hover:bg-lightSolid transition-all"
                >
                  <span className="text-white group-hover:text-black">
                    الغاء الطلبية
                  </span>
                </Option>
              </div> */}
            </Select>
          </div>
        </DialogFooter>
      </Dialog>
      <DialogDefault
        titile={"Delete order"}
        content={"Have you gonna order remove!"}
        isOpen={open0}
        onConfirm={deleteOrder}
        onClose={() => setOpen0((prev) => !prev)}
      />
    </>
  );
}
