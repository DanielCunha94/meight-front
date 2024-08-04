import { Button, Input, Typography } from "@material-tailwind/react";
import { ChangeEvent } from "react";

interface InputSectionProps {
  searchParams: { plate: string; date: string };
  handleChangePlate: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const InputSection = ({
  searchParams,
  handleChangePlate,
  handleChangeDate,
  handleSearch,
}: InputSectionProps) => (
  <div className="ml-10 mt-6 flex gap-4 flex-col md:flex-row">
    <div>
      <Typography variant="h6" color="blue-gray" className="mb-3">
        Plate
      </Typography>
      <Input
        onChange={handleChangePlate}
        size="lg"
        placeholder="plate"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
    <div>
      <Typography variant="h6" color="blue-gray" className="mb-3">
        Date
      </Typography>
      <Input
        onChange={handleChangeDate}
        type="date"
        size="lg"
        placeholder="Max weight capacity"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </div>
    <Button
      disabled={!searchParams.plate || !searchParams.date}
      className=" mt-9"
      onClick={handleSearch}
      variant="gradient"
    >
      search
    </Button>
  </div>
);

export default InputSection;
