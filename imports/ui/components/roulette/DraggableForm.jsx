import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiTrash, BiGridVertical, BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import Roulette from "./Roulette";
import RouletteWatcher from "../../../api/classes/client/RouletteWatcher";
import { Toast } from "../extra/Toast";

const DraggableForm = ({ setting }) => {
    const [inputList, setInputList] = useState(setting.rouletteSettings);
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        if (name == 'status') {
            list[index][name] = value === '1' ? true : false;
        } else {
            list[index][name] = value;
        }

        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { text: "", id: uuidv4(), status: false }]);
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(inputList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setInputList(items);
    }

    return (
        <div className='home-main-content'>
            <div className='div-block-27'>
                {/*  */}
                <Roulette data={inputList} />
            </div>
            <div className='div-block-27'>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items">
                        {(provided) => (
                            <ul
                                className="items"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ listStyle: "none" }}
                            >
                                {inputList.map((x, index) => {
                                    return (
                                        <Draggable key={x.id} draggableId={x.id} index={index}>
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="list-item"
                                                >
                                                    <div className="item">
                                                        <BiGridVertical />
                                                        <input
                                                            name="text"
                                                            placeholder="Enter text here"
                                                            value={x.text}
                                                            onChange={(e) => handleInputChange(e, index)}
                                                            className="input"
                                                        />
                                                        <select
                                                            name='status'
                                                            type='number'
                                                            value={x.status ? 1 : 0}
                                                            onChange={(e) => handleInputChange(e, index)}
                                                        >
                                                            <option value={0} >false</option>
                                                            <option value={1}>true</option>

                                                        </select>
                                                        <div className="btn-box">
                                                            {inputList.length !== 1 && (
                                                                <button
                                                                    className="button"
                                                                    onClick={() => handleRemoveClick(index)}
                                                                >
                                                                    <BiTrash />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* {error[index] && (
                                                        <div style={{ color: 'red' }}>{error[index]}</div>
                                                    )} */}
                                                </li>
                                            )
                                            }
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <button
                    onClick={handleAddClick}
                    style={{ marginLeft: "2.1rem" }}
                    className="button"
                >
                    <BiPlus />
                </button>
                <a
                    className="btn_primary w-button"
                    onClick={() => RouletteWatcher.updateRouletteData(setting._id._str, inputList)}
                    style={{ marginLeft: "2.1rem" }}
                >
                    Save
                </a>
            </div>

        </div >
    );
};

export default DraggableForm;
