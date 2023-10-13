# React

React для начинающих

## React json-server

## Installation

```bash
npm install
```

```bash
npm i json-server
```

## Start project

```bash
npm start
```

## Start json server
```bash
npx json-server -p 3500 -w data/db.json
```

## add file apiRequest.jsx
```bash
const apiRequest = async(url = "", optionObj = null, errMsg  = null) => {
    try {
        const response = await fetch(url, optionObj)
        if(!response.ok) throw Error ("Pls reload the app")
        
    } catch (error) {
        errMsg = error.errMsg
    } finally{
        return errMsg
    }
}

export default apiRequest;
```

## upgrade function handleCheck 
```bash
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

```

## upgrade function addItem 
```bash
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

```

## upgrade handleDelete  
```bash
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

```


## Больше уроков

[Уроки по React](https://www.youtube.com/playlist?list=PLHyIl59J60-V7-9nam_uikG3XAydd0dYT)
