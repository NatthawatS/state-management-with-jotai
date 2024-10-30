import { atom, useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { atomWithLocation } from "jotai-location";
import { useRouter } from "next/navigation";

// create atom with location
const locationAtom = atomWithLocation();
locationAtom.debugLabel = "locationAtom";

export const priceAtom = atom(10);
priceAtom.debugLabel = "priceAtom";

// ex http://localhost:3000/?example=1234&exampleRequired=1234
const HomePage = () => {
  const [count, setCount] = useAtom(priceAtom);
  // create state Atom
  const [loc, setLoc] = useAtom(locationAtom);
  const router = useRouter();

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

    router.push("/atomWithStorage");
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-row justify-center items-center gap-5 bg-gray-200 border border-gray-300 rounded w-[400px] p-16">
        <button
          className="bg-blue-500 text-white rounded hover:bg-blue-700 px-4 py-2"
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </button>
        count: {count}
        <button
          className="bg-red-500 text-white rounded hover:bg-red-700 px-4 py-2"
          onClick={() => setCount((c) => c - 1)}
        >
          -
        </button>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label>Example</label>
        <input
          className="p-2 border border-gray-300 rounded"
          {...register("example")}
          defaultValue="test"
        />
        <label>ExampleRequired</label>
        <input
          className="p-2 border border-gray-300 rounded"
          {...register("exampleRequired", { required: true, maxLength: 10 })}
        />
        {errors.exampleRequired && (
          <p className="text-red-500">This field is required</p>
        )}
        <input
          className="bg-blue-500 text-white rounded hover:bg-blue-700 px-4 py-2 cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
};

export default HomePage;
