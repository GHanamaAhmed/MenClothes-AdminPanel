"use client";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
  Select,
  Option,
} from "./import";
import { useEffect, useState } from "react";
import { getRelativeTime } from "../../../lib/date";
import DialogDefault from "./dialog";
import { useDispatch } from "react-redux";
import { removeCoupon } from "../redux/couponsReducer";
import { toasty } from "./toast";
import { FiRefreshCcw } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";

export default function CiPromoTable({
  TABS,
  TABS2,
  TABLE_HEAD,
  TABLE_ROWS,
  Header,
  subheader,
  count,
  max,
  page,
  onChangePage,
  onChangeName,
  onChangeTab,
  onChangeTab2,
  onReverse,
  onRefrech,
}) {
  const [open0, setOpen0] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const dispatch = useDispatch();
  const deleteCoupon = () => {
    dispatch(removeCoupon({ id: coupon?._id }))
      .unwrap()
      .then((res) => setOpen0((prev) => !prev))
      .catch((err) => {
        toasty(err?.response?.data || "فشل حذف التخفيض", {
          type: "error",
          toastId: "addCoupon",
          autoClose: 5000,
        });
        console.error(err);
      });
  };
  useEffect(() => {
    console.log(page);
  });
  return (
    <>
      <Card className="h-full  md:w-fit lg:w-full shadow-xl text-right">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-Hacen-Tunisia"
              >
                {Header}{" "}
              </Typography>
              <Typography color="gray" className="mt-1 font-Hacen-Tunisia">
                {subheader}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full flex flex-col gap-2">
              <div>
                <Tabs value={""} className="w-full">
                  <TabsHeader>
                    {TABS.map(({ label, value }) => (
                      <Tab
                        onClick={() => onChangeTab(value)}
                        key={value}
                        value={value}
                      >
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
              </div>
              <div className="w-fit">
                <Select value={""}>
                  {TABS2.map(({ label, value }) => (
                    <Option
                      onClick={() => onChangeTab2(value)}
                      key={value}
                      value={value}
                    >
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="w-full md:w-60 flex flex-row justify-evenly items-center">
              <MagnifyingGlassIcon className="h-5 w-5  " />
              <Input
                onChange={(e) => onChangeName(e.currentTarget?.value)}
                className="gap-1"
                label="بحث"
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto min-h-[497px] px-0">
          <table className="mt-4 w-full min-w-max table-auto text-right font-Hacen-Tunisia">
            <thead>
              <tr className="font-Hacen-Tunisia">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
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
              {TABLE_ROWS.map((coupon, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="hidden flex-col  md:flex">
                          <Typography
                            variant="small"
                            color=""
                            className="font-normal"
                          >
                            {coupon?.code}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {coupon?.porcent
                              ? `${coupon?.porcent} %`
                              : `${coupon?.price} Dz`}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {coupon?.count}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {coupon?.max - coupon?.count}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={
                            coupon?.count >= coupon?.max ||
                            coupon?.expireAt <= new Date()
                              ? "غير صالح"
                              : "صالح"
                          }
                          color={
                            coupon?.count >= coupon?.max ||
                            coupon?.expireAt <= new Date()
                              ? "grey"
                              : "blue"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {getRelativeTime(new Date(coupon?.createAt))}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {coupon?.expireAt
                          ? getRelativeTime(new Date(coupon?.expireAt))
                          : "لايوجد"}
                      </Typography>
                    </td>
                    <button>
                      <td
                        className={`${classes} flex justify-center items-center`}
                        onClick={() => {
                          setCoupon(coupon);
                          setOpen0((prev) => !prev);
                        }}
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </td>
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-center gap-4 md:justify-between border-t border-blue-gray-50 p-4">
          <div className="flex gap-5 items-center">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-Hacen-Tunisia "
            >
              {page}/{Math.ceil(count / max)}
            </Typography>
            <button onClick={() => onReverse()}>
              <LuArrowUpDown />
            </button>
            <button onClick={() => onRefrech()}>
              <FiRefreshCcw />
            </button>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outlined"
              disabled={page == 1}
              onClick={() => onChangePage(Number(page) * max - max * 2)}
              color="blue-gray"
              size="sm"
            >
              قبل
            </Button>
            <Button
              variant="outlined"
              disabled={Number(page) / Math.ceil(count / max) >= 1}
              onClick={() => onChangePage(page * max)}
              color="blue-gray"
              size="sm"
            >
              التالي
            </Button>
          </div>
        </CardFooter>
      </Card>
      <DialogDefault
        titile={"Delete coupon"}
        content={"Have you gonna coupon remove!"}
        isOpen={open0}
        onConfirm={deleteCoupon}
        onClose={() => setOpen0((prev) => !prev)}
      />
    </>
  );
}
