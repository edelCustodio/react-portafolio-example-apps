import React from "react";
import { Checkbox, FormControlLabel, Button } from "@material-ui/core";

const TaskList = (props: any) => {

    const { list, setList } = props;

    const onChangeStatus = (e: any) => {
        const { name, checked } = e.target;
        const updateList = list.map((item: any) => ({
          ...item,
          done: item.id === name ? checked : item.done
        }));

        setList(updateList);
    };

    const chk = list.map((item: any) => (
        <li>
            <FormControlLabel
                key={item.id}
                label={item.description}
                // @ts-expect-error
                control={<Checkbox name={item.id} onChange={onChangeStatus}> {item} </Checkbox>}
            />
        </li>
        // <Checkbox key={item.id} data={item} onChange={onChangeStatus}/>
    ));

    const onClickRemoveItem = () => {
        const updateList = list.filter((item: any) => !item.done);
        setList(updateList);
    };

	return (
        <div>
            {list.length ?  (<ul >{chk}</ul>) : "No tasks"}
            {list.length ? (
                <p>
                <Button onClick={onClickRemoveItem}>
                    Delete all done
                </Button>
                </p>
            ) : null}
        </div>
    );
};

export default TaskList;
