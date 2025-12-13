"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";
import { teachersData } from "@/lib/data";

const schema = z.object({
    name: z
        .string()
        .min(3, { message: "Subject name must be at least 3 characters long!" })
        .max(20, { message: "Subject name must be at most 20 characters long!" }),
    teachers: z
        .array(z.string())
        .min(1, { message: "Please select at least one teacher." }) // Optional: Add array validation rules
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
    type,
    data
}: {
    type: "create" | "update";
    data?: any;
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(data => {
        console.log(data);
    })

    return (
        <form className='flex flex-col gap-9' onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Create a new subject</h1>
            <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />
                <div className="flex flex-col gap-2 w-full md:w-2/4">
                    <label className="text-xs text-gray-400">Teachers</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full h-32" // Added h-32 to make it tall enough for multi-select
                        multiple
                        {...register("teachers")}
                        defaultValue={data?.teacherIds} // NOTE: Default value must be an array of IDs
                        id="teacher-select"
                    >
                        {/* Dynamic Teacher Data Options */}
                        {teachersData.map((teacher) => (
                            <option
                                key={teacher.id}
                                value={teacher.id}
                            >
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                    {errors.teachers?.message &&
                        <p className="text-xs text-red-400">{errors.teachers.message.toString()}</p>
                    }
                </div>

            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default SubjectForm