import './App.css';
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {DevTool} from "@hookform/devtools"
import {zodResolver} from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().nonempty("Username is required").min(3,"Username must be atleast 3 characters long").max(15, "username can't be more than 15 characters"),
  email: z.string().nonempty("Email is required").email("invalid email")
})

type formValues = z.infer<typeof formSchema>;

function App() {
  const form = useForm<formValues>({resolver: zodResolver(formSchema)});
  const {register, control, handleSubmit, formState: { errors }} = form;

  const onSubmit = function (data: formValues){
    console.log("form submitted",data);
    try{
      console.log(formSchema.parse(data))
    }catch (error){
      if(error instanceof z.ZodError){
        console.log(error)
        const zodError = error.errors
        console.log(zodError)
        zodError.forEach(
          (error) => {
            console.log(error.message)
          }
        )
      }
      else console.log(error)
    }
  }
   console.log('rendered')
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")}/>
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")}/>
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

          <button type='submit'>Submit</button>
        </form>
        <DevTool control={control}/>
      </main>
    </div>
  );
}

export default App;
