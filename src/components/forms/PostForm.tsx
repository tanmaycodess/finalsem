import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { PostValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutaion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../shared/Loader";
import { convertImageToJPG } from "@/lib/utils";


type PostFormProps = {
    post?: Models.Document;
    action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    });

    // Query
    const { mutateAsync: createPost, isPending: isLoadingCreate } =
        useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
        useUpdatePost();

    // Handler
     const handleSubmit = async (value: z.infer<typeof PostValidation>) => {

         const convertedFiles = await Promise.all(
             value.file.map(async (file: File) => {
                 return await convertImageToJPG(file);
             })
         );

    // ACTION = UPDATE
         if (post && action === "Update") {
             const updatedPost = await updatePost({
                 ...value,
                 postId: post.$id,
                 imageId: post.imageId,
                 imageUrl: post.imageUrl,
                 file: convertedFiles || [], // Provide a default empty array if convertedFiles is undefined
                 caption: value.caption,
             });
             if (!updatedPost) {
                 alert({
                     title: `${action} post failed. Please try again.`,
                 });
             }
             return navigate(`/posts/${post.$id}`);
         }



    // ACTION = CREATE
         const newPost = await createPost({
             userId: user.id,
             caption: value.caption || '',
             file: convertedFiles,
             location: value.location,
             tags: value.tags,
         });


    if (!newPost) {
      alert({
        title: `${action} post failed. Please try again.`,
      });
    }
    navigate("/");
  };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-9 w-full  max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200">Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar text-white"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200">
                                Add Tags (separated by comma " , ")
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Art, Expression, Learn"
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                        onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                        disabled={isLoadingCreate || isLoadingUpdate}>
                        {(isLoadingCreate || isLoadingUpdate) && <Loader />}
                        upload
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;
