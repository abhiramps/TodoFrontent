import React, { useState,useEffect} from 'react'
import './todo.css'
import { Form, Button, Table } from 'react-bootstrap'
import axios from 'axios'

function Todo() {
    const [Items, setItems] = useState([])

    const [InputItem, setInputItem] = useState("")
    const [DateItem, setDateItem] = useState("")
    const [Status, setStatus] = useState("")
    const [IsEditing, setIsEditing] = useState(false)

    const [EditItemId, setEditItemId] = useState("")

    const [I, setI] = useState()

    const startEdit=(item)=>{
        setIsEditing(true)
        setEditItemId(item._id)
        setInputItem(item.Description)
        setDateItem(item.Date)
        setStatus(item.Status)
        
    }
    const fetchData=()=>{
        axios.get("http://localhost:4000")
        .then((res)=>{
            console.log(res.data)
            // Items.push(res.data)
            setItems(res.data)

        })
    }
    useEffect(() => {
      fetchData()
     
    }, [])

    var onInputChange = (ev) => {
        setInputItem(ev.target.value);
    }
    var onDateChange=(ev)=>{
        setDateItem(ev.target.value)
    }
    var onStatusChange=(ev)=>{
        setStatus(ev.target.value)
    }


    let onHandleClick = (ev) => {
        ev.preventDefault()
        if (InputItem === "") {
            alert("please type items")
        }
        else {
            axios.post("http://localhost:4000",{
                "Description":InputItem,
                "Date":DateItem,
                "Status":Status
            })
            .then((res)=>{
                console.log(res.data)
                fetchData()
            },(err)=>{
                console.log(err.response)
            })

            // Items.push(InputItem)
            // setItems([...Items])

            // setItems()
            // onClear()
        }
    }

  


    // const onReset = () => {
    //     setItems([])
    //     onClear()
    // }

    const onClear = () => {
        setInputItem('')
        setDateItem('')
        setStatus('')
    }

    // const onDelete = (index) => {
    //     Items.splice(index, 1) //to remove an item from an array
    //     setItems([...Items])
    //     // console.log(Items)
    // }

      const onUpdate = () => {
        if (InputItem !== "") {
          
            axios.patch(`http://localhost:4000/${EditItemId}`,{
			payload: {
            "Description":InputItem,
            "Date":DateItem,
            "Status":Status
			}
                
            })
            .then((res)=>{
                console.log(res.data)
                setIsEditing(false)
                setEditItemId("")
                setInputItem("")
                setDateItem("")
                setStatus("")
                fetchData()
                alert("item updated sucessfully")
            },(err)=>{
                console.log(err.response)
            })
        }
        else {
            alert("please select an item to update")
            
            // Items[I] = InputItem
            // setItems([...Items])
         
            onClear()
        }
    }
    return (
        <div>
            <div className="wrap">
                <h1>todo list</h1>
                <div className="input-form">
                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={InputItem} onChange={onInputChange} placeholder="Enter description" />
                        <Form.Control type="text" value={DateItem} onChange={onDateChange} placeholder="Enter date" />
                        <Form.Control type="text" value={Status} onChange={onStatusChange} placeholder="status" />
                    </Form.Group>
                    <div className="button">
                        {
                            IsEditing?( <Button variant="outline-primary" onClick={onUpdate}>UPDATE</Button>):(<Button variant="outline-primary" onClick={onHandleClick}>ADD ITEM</Button>)
                        }
                        
                       
                        <Button variant="outline-secondary" onClick={onClear}>CLEAR</Button>
                        {/* <Button variant="outline-danger" onClick={onReset}>CLEAR ALL</Button> */}
                    </div>
                </div>
                <Table striped bordered hover size="sm" className="listitems">
                    <thead>
                        <tr>
                            <th>slno</th>
                            <th>Description</th>
                            <th>Data and time</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Items.map((itm, index) => {
                                // console.log(itm)
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{itm.Description}</td>
                                        <td>{itm.Date}</td>
                                        <td>{itm.Status}</td>
                                        <td><Button variant="outline-secondary" onClick={() => startEdit(itm)}>edit</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Todo
