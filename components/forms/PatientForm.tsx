"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { useState } from "react"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

export enum FormFieldType{
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}

const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            const userData ={ name, email, phone };

            const user = await createUser(userData);

            if (user) {
                router.push(`/patients/${user.$id}/register`);
            } else {
                console.log("User creation failed");
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
            <h1 className="header">Hi There👋</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
            </section>
            <CustomFormField 
                fieldType = {FormFieldType.INPUT}
                control = {form.control}
                name="username"
                label="full name"
                placeholder="John Doe"
                iconsSrc="/assets/icons/user.svg"
                iconAlt="user"
            />

            <CustomFormField 
                fieldType = {FormFieldType.INPUT}
                control = {form.control}
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                iconsSrc="/assets/icons/email.svg"
                iconAlt="email"
            />
            <CustomFormField 
                fieldType = {FormFieldType.PHONE_INPUT}
                control = {form.control}
                name="phone"
                label="Phone number"
                placeholder="(+91) 9224535124"
            />
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm

async function createUser(userData: { name: string; email: string; phone: string }): Promise<{ $id: string } | null> {
    // Simulating an API call or some asynchronous operation
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userData.name && userData.email && userData.phone) {
                resolve({ $id: "12345" }); // Example user ID
            } else {
                resolve(null);
            }
        }, 1000);
    });
}

