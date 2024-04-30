"use client";

import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { AI } from "@/app/action";
import { useActions, useUIState } from "ai/rsc";

const formSchema = z.object({
  docs: z.string().min(3),
});

const ChatPanel = (): React.JSX.Element => {
  const { submitDocs } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docs: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await submitDocs(values.docs);
    if (!response) {
      console.error("No response from submitDocs")
      return;
    }
    setMessages([...messages, response]);
    form.setValue("docs", "")
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Chat panel</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="docs"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Documentation</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Paste here the source documentation for the kata.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatPanel;
