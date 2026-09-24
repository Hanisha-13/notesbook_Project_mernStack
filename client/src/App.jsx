import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [editIndex,setEditIndex]=useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      contact.name.trim() === "" ||
      contact.email.trim() === "" ||
      contact.phone.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }

    if(editIndex !== null){
      const updateData = data.map((item,index)=>index === editIndex?contact:item);
      setData(updateData);
      setEditIndex(null);
    }
  else{
    setData([...data, contact]);
  }
    setContact({
      name: "",
      email: "",
      phone: "",
    });

    setError("");
  };

  const editItem = (index) => {
    setContact(data[index]);
    setEditIndex(index);
  };

  const deleteItem = (index) => {
    setData(data.filter((item, i) => i !== index));
  };

  return (
    <div>
      <h1>Welcome to ContactBook</h1>

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Name"
          value={contact.name}
          onChange={(e) =>
            setContact({ ...contact, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={contact.email}
          onChange={(e) =>
            setContact({ ...contact, email: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) =>
            setContact({ ...contact, phone: e.target.value })
          }
        />

        {error && <p>{error}</p>}

        <button type="submit">{editIndex !== null?"Update Contact":"Add Contact"}</button>
      </form>

      {data.map((contact, index) => (
        <p key={index}>
          {contact.name}, {contact.email}, {contact.phone}

          <button onClick={() => editItem(index)}>Edit</button>

          <button onClick={() => deleteItem(index)}>DELETE</button>
        </p>
      ))}
    </div>
  );
}

export default App;

