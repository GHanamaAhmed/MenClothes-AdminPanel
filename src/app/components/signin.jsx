"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import React from "react";
import { GrFacebookOption } from "react-icons/gr";
export default function Signin() {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 bg-primaryColor">
          <CardHeader className="mb-4 grid h-28 place-items-center bg-scandaryColor">
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <ul className="-ml-2 mt-1 flex items-center flex-col gap-2">
              <Button
                onClick={(e) =>
                  window.open(
                    "http://localhost:4000/auth/google?role=admin",
                    "_self"
                  )
                }
                size="lg"
                variant="outlined"
                color="blue-gray"
                className="flex items-center gap-3"
              >
                <img
                  src="https://www.material-tailwind.com/icons/google.svg"
                  alt="metamask"
                  className="h-6 w-6"
                />
                Continue with Google
              </Button>

              <Button
                onClick={(e) =>
                  window.open(
                    "http://localhost:4000/auth/facebook?role=admin",
                    "_self"
                  )
                }
                size="lg"
                variant="filled"
                color="blue"
                className="flex items-center gap-3"
              >
                <GrFacebookOption size={25} />
                Continue with facebook
              </Button>
            </ul>
          </CardBody>
          <CardFooter className="pt-0"></CardFooter>
        </Card>
      </div>
    </>
  );
}
