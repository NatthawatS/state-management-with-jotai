import { atom, useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";

// import atomWithLocation
import { atomWithLocation } from "jotai-location";

// create atom with location
const locationAtom = atomWithLocation();

export const priceAtom = atom(10);

// ex http://localhost:3000/?example=1234&exampleRequired=1234
const HomePage = () => {
  const [count, setCount] = useAtom(priceAtom);
  // create state Atom
  const [loc, setLoc] = useAtom(locationAtom);

  // get query params
  const example = loc.searchParams?.get("example") || "";
  const exampleRequired = loc.searchParams?.get("exampleRequired") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      example: example || "",
      exampleRequired: exampleRequired || "",
    },
  });

  const onSubmit = (data: { example: string; exampleRequired: string }) => {
    setLoc((prev) => ({
      ...prev,
      searchParams: new URLSearchParams({
        example: getValues("example"),
        exampleRequired: getValues("exampleRequired"),
        sandTo: "test",
      }),
    }));

    alert(JSON.stringify(data));
  };
  // 1 reload website with new query params
  // const onSubmit = (data: { example: string; exampleRequired: string }) => {
  //   if (typeof window !== "undefined") {
  //     window.location.assign(
  //       `?example=${data.example}&exampleRequired=${data.exampleRequired}`
  //     );
  //   }
  // };

  // 1 useEffect to get query params
  // useEffect(() => {
  //   let searchParams = "";
  //   if (typeof window !== "undefined") {
  //     searchParams = window.location.search; // e.g., "?query=123"
  //     const params = new URLSearchParams(searchParams);
  //     const search = parseInt(params.get("example") || "0");
  //     console.log("search ===>", search);
  //     // set value to eventing
  //   }
  // }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-row justify-center items-center gap-5 bg-gray-200 border border-gray-300 rounded w-[400px] p-16">
        <button
          className="bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </button>
        count: {count}
        <button
          className="bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => setCount((c) => c - 1)}
        >
          -
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Example</label>
        <input {...register("example")} defaultValue="test" />
        <label>ExampleRequired</label>
        <input
          {...register("exampleRequired", { required: true, maxLength: 10 })}
        />
        {errors.exampleRequired && <p>This field is required</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default HomePage;
