import { useLoaderData } from "react-router-dom"

function Update() {
  const loadedUser = useLoaderData();

  const handleUpdate = (e)=>
  {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(name,email)
  }
  return (
    <div>
      <h1>Update info of {loadedUser.name}</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" id="" defaultValue={loadedUser?.name}/>
        <br />
        <input type="email" name="email" id="" defaultValue={loadedUser?.email}/>
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  )
}

export default Update