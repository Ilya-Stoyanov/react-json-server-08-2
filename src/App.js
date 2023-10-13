import React, { useState, useEffect} from "react";
import apiRequest from "./apiRequest"
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

function App() {
  const API_URL = "http://localhost:3500/item"

  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState("");
  const [serchItem, setSerchItem] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const respons = await fetch(API_URL)
        if(!respons.ok) throw Error("Did not received list items data")
        const listItems = await respons.json()
        console.log(listItems);
        setItems(listItems)
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message);
      } finally{
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => fetchItems())()
    }, 2000);
  }, [])

  const handleCheck = async (id) =>{
    const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems)

    const myItem = listItems.filter(item => item.id === id)
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ checked: myItem[0].checked})
    }
    
    const reqUrl = `${API_URL}/${id}` // he need to understand which if we checked
    const result = await apiRequest(reqUrl, updateOptions)
    if(result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)

    const deleteOptions = {
      method: "DELETE"
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if(result) setFetchError(result)
  }

  const addItem = async item => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems)

    const postOptions = {
      method: "POST",  
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions)
    if(result) setFetchError(result)
  }

  const HeandlSubmit = e => {
    e.preventDefault();
    if(!newItems) return;
    addItem(newItems);
    console.log(newItems);
    setNewItems("");
  }

  return (
    <div className="App">
      <Header />
      <SearchItem
        serchItem={serchItem}
        setSerchItem={setSerchItem}
      />
      <AddItem
        newItems={newItems}
        setNewItems={setNewItems}
        HeandlSubmit={HeandlSubmit}
      />
      <main>
        {isLoading && <p style={{textAlign: "center", fontSize: "30px"}}>Loadin...</p>}
        {fetchError && <p className="error">{`Error: ${fetchError}`}</p> }
        {!fetchError && !isLoading && <Content 
          items={items.filter( item => (item.item).toLowerCase().includes(serchItem.toLowerCase()))}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
