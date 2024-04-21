import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutaion"
import { useUserContext } from "@/context/AuthContext"




const SignupForm = () => {
  const { checkAuthUser} = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { mutateAsync: createUserAccount, isPending: isCreatingUser} = useCreateUserAccount();

  const { mutateAsync: signInAccount} = useSignInAccount();


  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
  })



  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Ensure required properties are provided
    if (!values.name || !values.email || !values.password) {
      return toast({
        title: "Please provide name, email, and password"
      });
    }

    // create user
    const newUser = await createUserAccount({
      name: values.name,
      username:values.username,
      email: values.email,
      password: values.password,
    });

    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again"
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Sign in failed. Please try again"
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast({ title: 'Sign up failed. Please try again' });
    }
  }


  return (
    <div>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col " >
          <img 
            src="/assets/images/logo8.png" 
            alt="logo" 
          />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-gray-200">Create a new account</h2>

          <p className="text-light-3 small-medium md:base-regular mt-2">To Use Pictify, Please enter your details</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="bg-gray-200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
              {isCreatingUser ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : "Sign Up"}
            </Button>

            <p className="text-small-regular text-gray-200 text-center mt-2">
              Already have an Account?
              <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
            </p>
          </form>

        </div>
      </Form>
    </div>
  )
}

export default SignupForm
