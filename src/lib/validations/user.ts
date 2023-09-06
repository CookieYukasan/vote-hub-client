import {
  getMaxLenMessage,
  getMinLenMessage,
  getRequiredMessage,
} from "@/config/messages/validations";
import * as z from "zod";

export const userNameSchema = z.object({
  userName: z
    .string()
    .min(3, getMinLenMessage(3))
    .max(30, getMaxLenMessage(30)),
});

export const userSettingsFormSchema = z.object({
  userName: z
    .string()
    .min(3, getMinLenMessage(3))
    .max(30, getMaxLenMessage(30)),
  companyName: z
    .string()
    .min(10, getMinLenMessage(10))
    .max(30, getMaxLenMessage(30)),
  dob: z.date({
    required_error: getRequiredMessage("Date of birth"),
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
});
