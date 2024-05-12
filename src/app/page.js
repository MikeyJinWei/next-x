import Input from "@/components/Input";

const page = () => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="sticky top-0 z-50 py-2 px-3 border-b border-neutral-200 bg-white">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>

      <Input />
    </div>
  );
};

export default page;
