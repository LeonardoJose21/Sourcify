"use client";
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { appliedFilters } from '@/components/filters';
import { Verified } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Loader } from "@/components/loader";
import { Input } from "@/components/ui/input";
import { GPTMessage } from "@/types";
import { useProModal } from "@/hooks/use-pro-model";

const ConversationPage = () => {
  const proModal = useProModal();
  let prompt = '';
  const router = useRouter();
  const [messages, setMessages] = useState<GPTMessage[]>([]);


  const form = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: ""
      }
    }
  );

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      // lastSearch.push(values.prompt)
      let sources = '';
      let query = values.prompt;
      let init_year = appliedFilters['since'];
      let end_year = appliedFilters['until'];
      let hl = appliedFilters['lang'];
      if (appliedFilters['website'] != '') {
        query += ' site:' + appliedFilters['website'];
      }
      const response_google = await axios.post('/api/google_academic', { query: query, init_year: init_year.toString(), end_year: end_year.toString(), hl: hl });
      const references = response_google.data['organic_results'];
      if (references) {
        const snippetsObject = references.reduce((acc, item) => {
          const { link, snippet, title, publication_info } = item;
          if (link && snippet && title && publication_info && publication_info.summary) {

            return { ...acc, [title]: { snippet, link, summary: publication_info.summary } };
          }
          return acc;
        }, {});
        sources = JSON.stringify(snippetsObject);
      }
      else {
        alert('An error occurred. Try againg.');
      }
      const html_structure = "<h2 class='text-lg font-medium'>Title of the content (a good title that describe the content)</h2> <div class='text-base'> <p>This is an example of the content you could place here (year)<a class='text-blue-700' href='#id_source_1'>[1]</a>. there'are 8 billion people on earth (year)<a class='text-blue-700' href='#id_source_2'>[2]</a></p> <p>This is a secon example of a paragraph that may be cited (year)<a class='text-blue-700' href='#id_source_3' >[3]</a></p> <p>Finally, here's a third example (year)<a class='text-blue-700' href='#id_source_4' >[4]</a></p> ... </div> <div> <h3 class='text-base font-semibold'>References</h3> <ol class='list-decimal text-s'> <li><a class='text-blue-700' href='https://source_1.com' id='id_source_1' target='_blank'>Source 1 title</a> </li> <li><a class='text-blue-700' href='https://source_2.com' id='id_source_2' target='_blank'>Source 2 title</a> </li> ...  </ol> </div>";
      prompt = "You're job is to assist and help professional researchers who may need some help with some questions or may need to write parts of their research works. The thing that makes you different with regards to other tools is that all the text and content you generate is going to be based on real data and sources." +
        "So, I'm going to give you three things: 1) A promt (from the user), 2) a group of online sources and 3) a set of parameters." +
        " You will generate html-format content based on those three things. First you will take the sources, and then you will check if there's any source that is somehow related to the promt. If there are sources that somehow are related or support the prompt, then pick those sources. Finally generate an html-format answer for that prompt with your content and the sources you picked. " +
        " Remember, you ** cant't ** generate content that is not based on those sources. If there is no sources for the prompt, just say that are not research works about that topic. Your output ** MUST ** have the next html format: " + html_structure + ". \n" + "So, here are the three elements you need. Do your job: \n" +
        "Prompt: " + values.prompt + ". \n" +
        "Sources: " + sources + ". \n" +
        "Parameters: {'language': " + appliedFilters['lang'] + " }";
      const userMessage: GPTMessage = {
        role: "user",
        content: prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post('/api/conversation', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();

    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {

      router.refresh();
    }
  };
  

  return (
    <div>
      <Heading
        title="information supported by real references"
        description="Enter any topic and get information about it, backed by real references and data."
        icon={Verified}
        iconColor="text-cyan-500"
        bgColor="bg-emerald-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="
                        rounded-leg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-withing:shadow-sm
                        grid
                        grid-cols-12
                        gap-12">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Climate Change Mitigation Strategies"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} onClick={() => {
                messages.length = 0;
              }}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}  


          {messages.map((message) => (
            message.role !== "user" ?
              (<div className="p-8 w-full gap-x-8 rounded-lg mt-2 bg-muted" dangerouslySetInnerHTML={{ __html: message.content }} />) : null
          ))}
        </div>
      </div>
    </div>
  );
}
export default ConversationPage;
