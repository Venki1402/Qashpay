import { Button } from "@repo/ui/button";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="text-3xl text-center text-red-500 font-mono">Home</div>
      <Button appName="User App" >
        Click me
      </Button>
    </>
  );
};

export default Home;
