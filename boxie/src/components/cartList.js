// import React from 'react';
// import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
// import { Avatar, List, Space } from 'antd';
//
//
//
//
// const data = Array.from({
//   length: 23,
// }).map((_, i) => ({
//   href: 'https://ant.design',
//   title: `ant design part ${i}`,
//   avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//   description:
//     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//   content:
//     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));
// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );
// const App = () => (
//   <List
//     itemLayout="vertical"
//     size="large"
//     pagination={{
//       onChange: (page) => {
//         console.log(page);
//       },
//       pageSize: 3,
//     }}
//     dataSource={data}
//     footer={
//       <div>
//         <b>ant design</b> footer part
//       </div>
//     }
//     renderItem={(item) => (
//       <List.Item
//         key={item.title}
//         actions={[
//           <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
//           <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
//           <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
//         ]}
//         extra={
//           <img
//             width={272}
//             alt="logo"
//             src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//           />
//         }
//       >
//         <List.Item.Meta
//           avatar={<Avatar src={item.avatar} />}
//           title={<a href={item.href}>{item.title}</a>}
//           description={item.description}
//         />
//         {item.content}
//       </List.Item>
//     )}
//   />
// );
// export default App;



import { useState, useEffect } from 'react';
import axios from "axios";


function InputArea() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    // Load todo list from the server on component mount
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/getTodos")
            .then(response => {
                console.log(response.data);
                setTodos(response.data); // Update todos state with fetched data
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleTODO = () => {
        axios.post("http://127.0.0.1:5000/push", { text: task })
            .then(response => {
                const newTodo = { Name: task };
                console.log(response.data);
                setTodos([...todos, newTodo]);
                setTask("");

            })
            .catch((err) => {
                console.log(err);
            });
    };
     const handleDelete = (taskToDelete) => {
        axios.delete("http://127.0.0.1:5000/delete", { data: { text: taskToDelete.Name } })
            .then(response => {
                console.log(response.data, ' deleted Successfully');
                // Remove the deleted task from the todos state
                const updatedTodos = todos.filter(todo => todo !== taskToDelete);
                setTodos(updatedTodos);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type todo here"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={handleChange}
                    value={task}
                />

                <button
                    className="btn btn-success"
                    type="button"
                    id="button-addon2"
                    onClick={handleTODO}
                    style={{ "marginLeft": "10px" }}
                >
                    <span className="material-symbols-outlined">
                        add_task
                    </span>
                </button>
            </div>

            <ul className="list-group">
                {todos.map((todo, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center ">
                        {todo.Name}
                        <div className="icons">
                            <span className="material-symbols-outlined" style={{ "marginRight": "20px", "color": "blue" }} >
                                {/*<EditOutlined />*/}
                                edit
                            </span>
                            <span className="material-symbols-outlined" style={{ "color": "red" }} onClick={()=>{handleDelete(todo)}}>
                                {/*<DeleteOutlined />*/}
                                delete
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InputArea;

