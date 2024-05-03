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
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/app/play/action";

const formSchema = z.object({
  docs: z.string().min(3),
});

const DocuForm = (): React.JSX.Element => {
  const { submitDocs } = useActions<typeof AI>();
  const [_, setUi] = useUIState<typeof AI>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      docs: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await submitDocs(values.docs);
    if (!response) {
      console.error("No response from submitDocs");
      return;
    }
    setUi([response]);
    form.setValue("docs", "");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="docs"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Paste React Documentation</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={8}
                      placeholder="useActionState is a Hook that allows you to update state based on the result of a form action.

const [state, formAction] = useActionState(fn, initialState, permalink?); ...
"
                    />
                  </FormControl>
                  <FormDescription>
                    Paste here the source documentation to build the kata from.
                    For example the content from a page from the{" "}
                    <a target="_blank" href="https://react.dev/reference/react">
                      React Docs
                    </a>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-end w-full">
            <Button type="submit">Submit docs</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DocuForm;
