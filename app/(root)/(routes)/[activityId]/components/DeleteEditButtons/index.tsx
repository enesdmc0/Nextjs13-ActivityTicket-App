"use client"
import React, {useState} from 'react';
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {Edit, Trash} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {AlertModal} from "@/modals/AlertModal";

const DeleteEditButtons = () => {
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/activity/${params.activityId}`)
            router.refresh()
            toast.success("Activity Deleted")
            router.push("/")
        } catch (error) {
            toast.error("Activity deleted error")
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
                loading={loading}
            />
            <div className="flex items-center justify-end gap-10">
                <Link href={`/activity/${params.activityId}`} className={buttonVariants({variant: "secondary"})}>
                    <Edit className="h-5 w-5"/>
                </Link>
                <Button disabled={loading} onClick={() => setOpen(true)}>
                    <Trash className="h-5 w-5"/>
                </Button>
            </div>
        </>
    );
};

export default DeleteEditButtons;
