"use client"
import React, {useState} from 'react';
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import {cn} from "@/lib/utils"
import {format} from "date-fns"
import {CalendarIcon} from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Switch} from "@/components/ui/switch"
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";
import {Activity} from "@prisma/client";


const formSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    category: z.string().min(2),
    city: z.string().min(2),
    place: z.string().min(2),
    dob: z.date(),
    activityTime: z.string(),
    organizers: z.string().min(2),
    imageUrl: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    address: z.string().min(2),
    isPopuler: z.boolean(),
    isFree: z.boolean(),
    price: z.coerce.number(),
})

interface Props {
    initialData: Activity | null
}

type ActivityValues = z.infer<typeof formSchema>


const ActivityForm: React.FC<Props> = ({initialData}) => {
    const router = useRouter()
    const params = useParams()

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)


    const title = initialData ? "Edit Activity" : "Create Activity";
    const description = initialData ? "Edit a activity" : "Add a new activity";
    const toastMessage = initialData ? "Activity updated" : "Activity created.";
    const action = initialData ? "Save changes" : "Create activity";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            category: "",
            city: "",
            place: "",
            dob: undefined,
            activityTime: "",
            organizers: "",
            imageUrl: "",
            latitude: "",
            longitude: "",
            address: "",
            isPopuler: false,
            isFree: false,
            price: 0,
        },
    })


    const onSubmit = async (data: ActivityValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/activity/${params.activityId}`, data)
            } else {
                await axios.post(`/api/activity`, data)
            }
            router.refresh();
            router.push(`/${params.activityId}`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Activity Error")
        } finally {
            setLoading(false)
        }
    }

    const isFreeWatch = form.watch("isFree")

    const categories = ["festval", "piknik", "şenlik"]
    const cities = ["ankara", "istanbul", "izmir"]
    const places = ["bahçe", "park", "orman"]

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-4 gap-5">

                        {/*TITLE*/}
                        <div className="col-span-2">

                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/*DESCRIPTION*/}
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/*CATEGORY*/}
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}  placeholder="Select a Category"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map(item => (
                                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*CITY*/}
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Select a City"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities.map(item => (
                                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*PLACE*/}
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="place"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Place</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Select a Place"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {places.map(item => (
                                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*DATE*/}
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Activity Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/*ACTIVITY TIME*/}
                        <div className="col-span-2">

                            <FormField
                                control={form.control}
                                name="activityTime"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Time" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>


                        {/*IMAGE*/}
                        <div className="col-span-2">
                            <FormField control={form.control}
                                       name="imageUrl"
                                       render={({field}) => (
                                           <FormItem>
                                               <FormLabel>Background Image</FormLabel>
                                               <FormControl>
                                                   <ImageUpload
                                                       value={field.value ? [field.value] : []}
                                                       disabled={loading}
                                                       onChange={(url) => field.onChange(url)}
                                                       onRemove={() => field.onChange("")}
                                                   />
                                               </FormControl>
                                               <FormMessage/>
                                           </FormItem>
                                       )}
                            />
                        </div>
                        {/*ADDRESS*/}
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/*ORGANIZERS*/}
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="organizers"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Organizers</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Organizers" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*LATITUDE*/}
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="latitude"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Latitude</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Latitude" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*LONGITUDE*/}
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="longitude"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Longitude</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Longitude" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*IS POPULER*/}
                        <div className="col-span-1 mt-2">
                            <FormField
                                control={form.control}
                                name="isPopuler"
                                render={({field}) => (
                                    <FormItem
                                        className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <FormLabel className="text-base">
                                            Populer
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*IS FREE*/}
                        <div className="col-span-1 mt-2">
                            <FormField
                                control={form.control}
                                name="isFree"
                                render={({field}) => (
                                    <FormItem
                                        className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <FormLabel className="text-base">Free</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*PRICE*/}
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Price" type="number" disabled={isFreeWatch} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="col-span-2 grid grid-cols-2 gap-5 items-end">
                            <Button className="col-span-1" disabled={loading} type="submit">{action}</Button>
                            <Button className="col-span-1" variant="outline" onClick={() => {router.back()}} type="button">Cancel</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ActivityForm;
