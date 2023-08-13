"use client";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ReceiptPercentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DialogDefault from "./dialog";
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
  IconButton,
  Tooltip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
} from "./import";
import { useEffect, useState } from "react";
import Link from "next/link";
import AddProduct from "./addProduct";
import Edit2 from "./edite2";
import { deleteProducts, fetchProducts } from "../redux/productsReducer";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../lib/date";
import { toasty } from "./toast";
import { FiRefreshCcw } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
export default function ProductTable({
  TABS,
  TABLE_HEAD,
  TABLE_ROWS,
  Header,
  subheader,
  max,
  page,
  count,
  onChangeName,
  onChangeTab,
  onChangePage,
  onReverse,
  onRefrech,
}) {
  const [open, setOpen] = useState(false);
  const [open0, setOpen0] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [promotion, setPromotion] = useState("");
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpen3 = () => setOpen3(!open3);
  const deleteProduct = () => {
    dispatch(deleteProducts({ id: product?._id }))
      .unwrap()
      .then((res) => {
        toasty("تم حذف المنتج", {
          type: "success",
          toastId: "deleteProduct",
          autoClose: 5000,
        });
        setOpen0((prev) => !prev);
      })
      .catch((err) => {
        console.error(err);
        toasty("فشل حذف المنتج", {
          type: "error",
          toastId: "deleteProduct",
          autoClose: 5000,
        });
      });
  };
  useEffect(() => {
    setPromotion(product?.promotion || "");
  }, [product]);
  return (
    <>
      <Card className="h-full md:w-fit lg:w-full shadow-lg text-right">
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
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                <Tab onClick={() => onChangeTab("")} value={""}>
                  الكل
                </Tab>
                {TABS?.map((value) => (
                  <Tab
                    key={value}
                    onClick={() => onChangeTab(value)}
                    value={value}
                  >
                    &nbsp;&nbsp;{value}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-60 flex flex-row justify-evenly items-center">
              <MagnifyingGlassIcon className="h-5 w-5  " />
              <Input
                className="gap-1"
                onChange={(e) => onChangeName(e.currentTarget.value)}
                label="بحث"
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0 min-h-[753px]">
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
              {TABLE_ROWS.map((e, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td
                      className={classes}
                      onClick={() => {
                        handleOpen();
                        setProduct(e);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          key={e?.thumbanil+index}
                          src={e?.thumbanil}
                          crossOrigin="anonymous"
                          alt={e?.name}
                          loading="lazy"
                          size="xl"
                          variant="rounded"
                        />
                        <div className="hidden flex-col  md:flex">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-Hacen-Tunisia hidden  md:flex"
                          >
                            {e?.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-Hacen-Tunisia  opacity-70"
                          >
                            {e?.price}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-Hacen-Tunisia "
                        >
                          {e?.quntity}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-Hacen-Tunisia  opacity-70"
                        >
                          {e?.type}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        {e?.reelId ? (
                          <Link href={`/${e?.reelId}`}>ريل</Link>
                        ) : (
                          <p>لايوجد</p>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-Hacen-Tunisia "
                      >
                        {formatDate(e?.createAt)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <IconButton
                        color="cyan"
                        className="bg-transparent"
                        onClick={(e) => {
                          setProduct(e);
                          handleOpen3(e);
                        }}
                      >
                        <ReceiptPercentIcon className="h-5 w-5 text-azure" />
                      </IconButton>
                    </td>
                    <td className={classes}>
                      <IconButton
                        onClick={() => {
                          setProduct(e);
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
              {" "}
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
              {"<"}
            </Button>
            <Button
              variant="outlined"
              disabled={Number(page) / Math.ceil(count / max) >= 1}
              onClick={() => onChangePage(page * max)}
              color="blue-gray"
              size="sm"
            >
              {">"}
            </Button>
          </div>
          <Button
            onClick={() => setOpen2(true)}
            variant="gradient"
            color="cyan"
            size="sm"
          >
            <PlusIcon className="h-5 w-5"></PlusIcon>
          </Button>
        </CardFooter>
      </Card>
      <AddProduct
        isOpen={open2}
        onShowProduct={() => setOpen3(true)}
        onClose={(value) => setOpen2(value)}
      />
      <Edit2
        isOpen={open}
        onClose={(value) => setOpen(value)}
        product={product}
      />
      <Dialog open={open3} handler={handleOpen3} size="md">
        <DialogHeader className="font-Hacen-Tunisia">المنتج</DialogHeader>
        <DialogBody divider className="flex flex-col gap-2">
          <label htmlFor="promotion"> السعر الاصلي:</label>
          <Input
            value={promotion}
            onChange={(e) => {
              setPromotion(e.currentTarget.value);
            }}
            name="promotion"
            label="سعر التخفيض"
          />
        </DialogBody>
        <DialogFooter className="flex items-center justify-end gap-4">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen3}
            className="mr-1"
          >
            <span>اغلاق</span>
          </Button>
          <Button
            variant="gradient"
            color="cyan"
            onClick={(e) => {
              handleOpen3(e);
            }}
          >
            <span>حفظ</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <DialogDefault
        titile={"Delete product"}
        content={"Have you gonna product remove!"}
        isOpen={open0}
        onConfirm={deleteProduct}
        onClose={() => setOpen0((prev) => !prev)}
      />
    </>
  );
}
